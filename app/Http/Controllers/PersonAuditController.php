<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Inertia\Inertia;
use Inertia\Response;

class PersonAuditController extends Controller
{
    /**
     * Display a listing of audit logs.
     */
    public function index(Person $person): Response
    {
        $this->authorize('viewAuditLogs', $person);

        $logs = $person->viewLogs()
            ->with('user')
            ->latest('viewed_at')
            ->paginate(50);

        return Inertia::render('people/audit/index', [
            'person' => $person,
            'logs' => $logs,
        ]);
    }
}
