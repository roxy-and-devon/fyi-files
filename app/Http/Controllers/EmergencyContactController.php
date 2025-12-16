<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmergencyContactStoreRequest;
use App\Http\Requests\EmergencyContactUpdateRequest;
use App\Models\EmergencyContact;
use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EmergencyContactController extends Controller
{
    /**
     * Display a listing of emergency contacts.
     */
    public function index(Person $person): Response
    {
        $this->authorize('view', $person);

        $person->load('emergencyContacts');

        return Inertia::render('people/emergency-contacts/index', [
            'person' => $person,
        ]);
    }

    /**
     * Store a newly created emergency contact.
     */
    public function store(EmergencyContactStoreRequest $request, Person $person): RedirectResponse
    {
        $person->emergencyContacts()->create($request->validated());

        return redirect()->back();
    }

    /**
     * Update the specified emergency contact.
     */
    public function update(EmergencyContactUpdateRequest $request, EmergencyContact $emergencyContact): RedirectResponse
    {
        $emergencyContact->update($request->validated());

        return redirect()->back();
    }

    /**
     * Remove the specified emergency contact.
     */
    public function destroy(EmergencyContact $emergencyContact): RedirectResponse
    {
        $this->authorize('update', $emergencyContact->person);

        $emergencyContact->delete();

        return redirect()->back();
    }
}
