<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PersonInvitationController extends Controller
{
    /**
     * Display the invitation acceptance page.
     */
    public function show(Request $request, string $token): Response|RedirectResponse
    {
        $invitation = DB::table('person_user')
            ->where('invitation_token', $token)
            ->whereNull('user_id')
            ->whereNull('accepted_at')
            ->first();

        if (! $invitation) {
            abort(404, 'Invitation not found or already accepted');
        }

        // If user is not authenticated, redirect to register with the token
        if (! $request->user()) {
            return redirect()->route('register', ['invitation' => $token]);
        }

        // If user is authenticated but email doesn't match, redirect to logout with message
        if ($request->user()->email !== $invitation->email) {
            return redirect()->route('register', ['invitation' => $token])
                ->withErrors(['email' => 'This invitation was sent to ' . $invitation->email . '. Please log out and register or log in with that email address.']);
        }

        $person = Person::with('primaryGuardian')->findOrFail($invitation->person_id);

        return Inertia::render('invitations/show', [
            'token' => $token,
            'person' => $person,
            'invitationEmail' => $invitation->email,
        ]);
    }

    /**
     * Accept the invitation.
     */
    public function accept(Request $request, string $token): RedirectResponse
    {
        $invitation = DB::table('person_user')
            ->where('invitation_token', $token)
            ->whereNull('user_id')
            ->whereNull('accepted_at')
            ->first();

        if (! $invitation) {
            abort(404, 'Invitation not found or already accepted');
        }

        $person = Person::findOrFail($invitation->person_id);
        $user = $request->user();

        // Verify that the user's email matches the invitation email
        if ($user->email !== $invitation->email) {
            // Wrong user trying to accept - disregard the invitation attempt
            return redirect()->route('dashboard')
                ->withErrors(['invitation' => 'This invitation was sent to a different email address. Please log out and log in with the correct email address.']);
        }

        // Check if user already has access with this role (accepted or pending)
        $existingAccess = DB::table('person_user')
            ->where('person_id', $invitation->person_id)
            ->where('user_id', $user->id)
            ->where('role', $invitation->role)
            ->first();

        if ($existingAccess) {
            // User already has a record (accepted or pending), just delete the invitation
            if (! $existingAccess->accepted_at) {
                // If pending, mark it as accepted
                DB::table('person_user')
                    ->where('id', $existingAccess->id)
                    ->update([
                        'accepted_at' => now(),
                        'invitation_token' => null,
                        'updated_at' => now(),
                    ]);
            }
            // Delete the invitation record
            DB::table('person_user')->where('id', $invitation->id)->delete();
        } else {
            // No existing access, update the invitation record to accept it
            DB::table('person_user')
                ->where('id', $invitation->id)
                ->update([
                    'user_id' => $user->id,
                    'accepted_at' => now(),
                    'invitation_token' => null,
                    'updated_at' => now(),
                ]);
        }

        // Clear pending invitation session if it exists
        $request->session()->forget('pending_invitation');

        return redirect()->route('people.show', $person);
    }
}
