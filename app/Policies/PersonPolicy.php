<?php

namespace App\Policies;

use App\Models\Person;
use App\Models\User;

class PersonPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Person $person): bool
    {
        return $person->user_id === $user->id
            || $person->users()
                ->where('users.id', $user->id)
                ->whereNotNull('person_user.user_id')
                ->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Person $person): bool
    {
        return $person->guardians()
            ->where('users.id', $user->id)
            ->whereNotNull('person_user.user_id')
            ->exists()
            || $person->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Person $person): bool
    {
        return $person->user_id === $user->id;
    }

    /**
     * Determine whether the user can manage access.
     */
    public function manageAccess(User $user, Person $person): bool
    {
        return $person->guardians()
            ->where('users.id', $user->id)
            ->whereNotNull('person_user.user_id')
            ->exists()
            || $person->user_id === $user->id;
    }

    /**
     * Determine whether the user can view audit logs.
     */
    public function viewAuditLogs(User $user, Person $person): bool
    {
        return $person->guardians()
            ->where('users.id', $user->id)
            ->whereNotNull('person_user.user_id')
            ->exists()
            || $person->user_id === $user->id;
    }

    /**
     * Determine whether the user can create notes.
     */
    public function createNote(User $user, Person $person): bool
    {
        return $person->guardians()
            ->where('users.id', $user->id)
            ->whereNotNull('person_user.user_id')
            ->exists()
            || $person->user_id === $user->id;
    }
}
