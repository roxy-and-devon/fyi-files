<?php

namespace Database\Factories;

use App\Models\Person;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person>
 */
class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'date_of_birth' => fake()->date(),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Attach a guardian to the person after creation.
     */
    public function withGuardian(User $guardian): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $guardian->id,
        ])->afterCreating(function (Person $person) use ($guardian) {
            $person->users()->attach($guardian->id, [
                'role' => 'guardian',
                'accepted_at' => now(),
            ]);
        });
    }

    /**
     * Attach school staff access after creation.
     */
    public function withStaffAccess(User $staff): static
    {
        return $this->afterCreating(function (Person $person) use ($staff) {
            $person->users()->attach($staff->id, [
                'role' => 'school_staff',
                'accepted_at' => now(),
            ]);
        });
    }
}
