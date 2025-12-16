<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonAccessInviteRequest;
use App\Models\Person;
use App\Models\User;
use App\Notifications\PersonAccessGranted;
use App\Notifications\PersonInvitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PersonAccessController extends Controller
{
    /**
     * Display a listing of users with access.
     */
    public function index(Person $person): Response
    {
        $this->authorize('manageAccess', $person);

        $person->load([
            'users' => function ($query) {
                $query->whereNotNull('person_user.user_id');
            },
            'primaryGuardian',
        ]);

        return Inertia::render('people/access/index', [
            'person' => $person,
        ]);
    }

    /**
     * Show the form for creating a new invitation.
     */
    public function create(Person $person): Response
    {
        $this->authorize('manageAccess', $person);

        return Inertia::render('people/access/invite', [
            'person' => $person,
        ]);
    }

    /**
     * Store a newly created invitation or access grant.
     */
    public function store(PersonAccessInviteRequest $request, Person $person): RedirectResponse
    {
        $data = $request->validated();

        // Check if user already exists
        $existingUser = User::where('email', $data['email'])->first();

        if ($existingUser) {
            // Check if user already has access
            $alreadyHasAccess = $person->users()
                ->where('users.id', $existingUser->id)
                ->whereNotNull('person_user.accepted_at')
                ->exists();

            if ($alreadyHasAccess) {
                return redirect()->back()->withErrors(['email' => 'This user already has access to this person\'s information.']);
            }

            // Grant access to existing user
            $person->users()->syncWithoutDetaching([
                $existingUser->id => [
                    'role' => $data['role'],
                    'accepted_at' => now(),
                    'invited_by' => $request->user()->id,
                    'invited_at' => now(),
                ],
            ]);

            $existingUser->notify(new PersonAccessGranted($person, $request->user()));
        } else {
            // Check if there's already a pending invitation for this email
            $existingInvitation = DB::table('person_user')
                ->where('person_id', $person->id)
                ->where('email', $data['email'])
                ->whereNull('user_id')
                ->whereNull('accepted_at')
                ->exists();

            if ($existingInvitation) {
                return redirect()->back()->withErrors(['email' => 'An invitation has already been sent to this email address.']);
            }

            // Create invitation for new user
            $token = Str::random(64);

            DB::table('person_user')->insert([
                'person_id' => $person->id,
                'user_id' => null,
                'email' => $data['email'],
                'role' => $data['role'],
                'invited_by' => $request->user()->id,
                'invitation_token' => $token,
                'invited_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            (new AnonymousNotifiable)->route('mail', $data['email'])
                ->notify(new PersonInvitation($person, $request->user(), $token, $data['name']));
        }

        return redirect()->route('people.access.index', $person);
    }

    /**
     * Remove access for the specified user.
     */
    public function destroy(Person $person, User $user): RedirectResponse
    {
        $this->authorize('manageAccess', $person);

        $person->users()->detach($user->id);

        return redirect()->back();
    }
}
