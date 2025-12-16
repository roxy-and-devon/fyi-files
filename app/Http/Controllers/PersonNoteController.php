<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonNoteStoreRequest;
use App\Models\Person;
use App\Models\PersonNote;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PersonNoteController extends Controller
{
    /**
     * Display a listing of notes.
     */
    public function index(Person $person): Response
    {
        $this->authorize('view', $person);

        $person->load('notes.author');

        return Inertia::render('people/notes/index', [
            'person' => $person,
        ]);
    }

    /**
     * Store a newly created note.
     */
    public function store(PersonNoteStoreRequest $request, Person $person): RedirectResponse
    {
        $person->notes()->create([
            'user_id' => $request->user()->id,
            'content' => $request->validated('content'),
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified note.
     */
    public function destroy(PersonNote $personNote): RedirectResponse
    {
        $this->authorize('update', $personNote->person);
        $this->authorize('createNote', $personNote->person);

        if ($personNote->user_id !== auth()->id()) {
            abort(403);
        }

        $personNote->delete();

        return redirect()->back();
    }
}
