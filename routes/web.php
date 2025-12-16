<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $people = \App\Models\Person::query()
            ->accessibleBy(auth()->user())
            ->with(['primaryGuardian'])
            ->latest()
            ->get();

        return Inertia::render('dashboard', [
            'people' => $people,
        ]);
    })->name('dashboard');

    // People CRUD
    Route::resource('people', \App\Http\Controllers\PersonController::class);

    // Information
    Route::get('people/{person}/information', [\App\Http\Controllers\PersonInformationController::class, 'show'])
        ->middleware('track.person.views:medical')->name('people.information.show');
    Route::get('people/{person}/information/edit', [\App\Http\Controllers\PersonInformationController::class, 'edit'])
        ->name('people.information.edit');
    Route::patch('people/{person}/information', [\App\Http\Controllers\PersonInformationController::class, 'update'])
        ->name('people.information.update');

    // Emergency Contacts
    Route::post('people/{person}/emergency-contacts', [\App\Http\Controllers\EmergencyContactController::class, 'store'])
        ->name('people.emergency-contacts.store');
    Route::patch('emergency-contacts/{emergencyContact}', [\App\Http\Controllers\EmergencyContactController::class, 'update'])
        ->name('emergency-contacts.update');
    Route::delete('emergency-contacts/{emergencyContact}', [\App\Http\Controllers\EmergencyContactController::class, 'destroy'])
        ->name('emergency-contacts.destroy');

    // Notes
    Route::get('people/{person}/notes', [\App\Http\Controllers\PersonNoteController::class, 'index'])
        ->middleware('track.person.views:notes')->name('people.notes.index');
    Route::post('people/{person}/notes', [\App\Http\Controllers\PersonNoteController::class, 'store'])
        ->name('people.notes.store');
    Route::delete('notes/{personNote}', [\App\Http\Controllers\PersonNoteController::class, 'destroy'])
        ->name('notes.destroy');

    // Access Management
    Route::get('people/{person}/access', [\App\Http\Controllers\PersonAccessController::class, 'index'])
        ->name('people.access.index');
    Route::get('people/{person}/access/invite', [\App\Http\Controllers\PersonAccessController::class, 'create'])
        ->name('people.access.create');
    Route::post('people/{person}/access', [\App\Http\Controllers\PersonAccessController::class, 'store'])
        ->name('people.access.store');
    Route::delete('people/{person}/access/{user}', [\App\Http\Controllers\PersonAccessController::class, 'destroy'])
        ->name('people.access.destroy');

    // Audit
    Route::get('people/{person}/audit', [\App\Http\Controllers\PersonAuditController::class, 'index'])
        ->name('people.audit.index');
});

// Public invitation
Route::get('invitations/{token}', [\App\Http\Controllers\PersonInvitationController::class, 'show'])
    ->name('invitations.show');
Route::post('invitations/{token}/accept', [\App\Http\Controllers\PersonInvitationController::class, 'accept'])
    ->middleware('auth')->name('invitations.accept');

// Clear pending invitation session
Route::post('clear-pending-invitation', function () {
    session()->forget('pending_invitation');

    return response()->noContent();
})->middleware('auth')->name('clear-pending-invitation');

require __DIR__ . '/settings.php';
