<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonStoreRequest;
use App\Http\Requests\PersonUpdateRequest;
use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $people = Person::query()
            ->accessibleBy(auth()->user())
            ->with(['primaryGuardian', 'users' => function ($query) {
                $query->whereNotNull('person_user.user_id');
            }])
            ->latest()
            ->get();

        return Inertia::render('people/index', [
            'people' => $people,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('people/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PersonStoreRequest $request): RedirectResponse
    {
        $person = DB::transaction(function () use ($request) {
            $person = Person::create([
                'user_id' => $request->user()->id,
                'name' => $request->validated('name'),
                'date_of_birth' => $request->validated('date_of_birth'),
            ]);

            $person->users()->attach($request->user()->id, [
                'role' => 'guardian',
                'accepted_at' => now(),
            ]);

            return $person;
        });

        return redirect()->route('people.show', $person);
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person): Response
    {
        $this->authorize('view', $person);

        $person->load([
            'primaryGuardian',
            'users' => function ($query) {
                $query->whereNotNull('person_user.user_id');
            },
            'information',
            'emergencyContacts',
            'notes.author',
        ]);

        $user = auth()->user();

        return Inertia::render('people/show', [
            'person' => $person,
            'canUpdate' => $user->can('update', $person),
            'canManageAccess' => $user->can('manageAccess', $person),
            'canViewAudit' => $user->can('viewAuditLogs', $person),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person): Response
    {
        $this->authorize('update', $person);

        return Inertia::render('people/edit', [
            'person' => $person,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PersonUpdateRequest $request, Person $person): RedirectResponse
    {
        $person->update($request->validated());

        return redirect()->route('people.show', $person);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person): RedirectResponse
    {
        $this->authorize('delete', $person);

        $person->delete();

        return redirect()->route('people.index');
    }
}
