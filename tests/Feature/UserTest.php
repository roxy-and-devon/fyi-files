<?php

use App\Models\Person;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can have dependents', function () {
    $user = User::factory()->create();
    $dependents = Person::factory()->count(3)->create([
        'user_id' => $user->id,
    ]);

    $user->refresh();

    expect($user->dependents)
        ->toHaveCount(3)
        ->each(
            fn ($dependent) => $dependent
                ->toBeInstanceOf(Person::class)
                ->user_id->toBe($user->id)
        );
});

it('can retrieve dependents count', function () {
    $user = User::factory()->create();
    Person::factory()->count(5)->create([
        'user_id' => $user->id,
    ]);

    expect($user->loadCount('dependents'))
        ->dependents_count->toBe(5);
});

it('eager loads dependents relationship', function () {
    $user = User::factory()->create();
    Person::factory()->count(2)->create([
        'user_id' => $user->id,
    ]);

    $userWithDependents = User::with('dependents')->find($user->id);

    expect($userWithDependents->relationLoaded('dependents'))->toBeTrue()
        ->and($userWithDependents->dependents)
        ->toHaveCount(2)
        ->each(fn ($dependent) => $dependent->toBeInstanceOf(Person::class));
});

it('prevents deletion of user with dependents', function () {
    $user = User::factory()->create();
    Person::factory()->count(2)->create([
        'user_id' => $user->id,
    ]);

    expect(fn () => $user->delete())
        ->toThrow(
            \Illuminate\Database\QueryException::class,
            'FOREIGN KEY constraint failed'
        );

    // Verify user and dependents still exist
    expect(User::find($user->id))->not->toBeNull()
        ->and(Person::where('user_id', $user->id)->count())->toBe(2);
});
