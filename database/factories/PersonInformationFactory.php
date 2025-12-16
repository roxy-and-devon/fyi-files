<?php

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonInformation>
 */
class PersonInformationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'person_id' => Person::factory(),
            'medical_conditions' => fake()->optional()->paragraph(),
            'allergies' => fake()->optional()->paragraph(),
            'medications' => fake()->optional()->paragraph(),
            'dietary_restrictions' => fake()->optional()->paragraph(),
            'special_accommodations' => fake()->optional()->paragraph(),
        ];
    }
}
