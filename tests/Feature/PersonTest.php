<?php

use App\Models\Person;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a person', function () {
    $person = Person::factory()->create();

    expect($person)
        ->toBeInstanceOf(Person::class)
        ->name->not->toBeEmpty()
        ->date_of_birth->not->toBeEmpty()
        ->user_id->not->toBeNull();
});

it('belongs to a guardian', function () {
    $guardian = User::factory()->create();
    $person = Person::factory()->create(['user_id' => $guardian->id]);

    expect($person->guardian)
        ->toBeInstanceOf(User::class)
        ->id->toBe($guardian->id);
});

it('can be found with its guardian', function () {
    $guardian = User::factory()->create();
    $person = Person::factory()->create(['user_id' => $guardian->id]);

    $foundPerson = Person::with('guardian')->find($person->id);

    expect($foundPerson)
        ->guardian->toBeInstanceOf(User::class)
        ->guardian->id->toBe($guardian->id);
});

it('requires a guardian', function () {
    Person::factory()->create(['user_id' => null]);
})->throws(Illuminate\Database\QueryException::class);
