<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ];

        // If invitation is provided, validate email matches invitation
        if (isset($input['invitation'])) {
            $invitation = DB::table('person_user')
                ->where('invitation_token', $input['invitation'])
                ->whereNull('user_id')
                ->whereNull('accepted_at')
                ->first();

            if ($invitation) {
                $rules['email'][] = function ($attribute, $value, $fail) use ($invitation) {
                    if ($value !== $invitation->email) {
                        $fail('The email address must match the invitation email address (' . $invitation->email . ').');
                    }
                };
            }
        }

        Validator::make($input, $rules)->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        // Store invitation token in session for redirect after authentication/verification
        if (isset($input['invitation'])) {
            session(['pending_invitation' => $input['invitation']]);
        }

        return $user;
    }
}
