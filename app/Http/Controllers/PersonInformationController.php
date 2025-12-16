<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonInformationUpdateRequest;
use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PersonInformationController extends Controller
{
    /**
     * Display the person's medical information.
     */
    public function show(Person $person): Response
    {
        $this->authorize('view', $person);

        $person->load('information');

        return Inertia::render('people/information/show', [
            'person' => $person,
        ]);
    }

    /**
     * Show the form for editing person information.
     */
    public function edit(Person $person): Response
    {
        $this->authorize('update', $person);

        $person->load('information');

        return Inertia::render('people/information/edit', [
            'person' => $person,
        ]);
    }

    /**
     * Update the person's information.
     */
    public function update(PersonInformationUpdateRequest $request, Person $person): RedirectResponse
    {
        $person->information()->updateOrCreate(
            ['person_id' => $person->id],
            $request->validated()
        );

        return redirect()->route('people.information.show', $person);
    }
}
