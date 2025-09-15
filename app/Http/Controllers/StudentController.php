<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'studentNamename' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
            'gradeLevel' => 'required|string|max:50',
            'homeroomTeacher' => 'required|string|max:255',
            'conditions' => 'array',
            'conditions.*.name' => 'required|string|max:255',
            'conditions.*.description' => 'nullable|string',
        ]);

        return response()->json([
            'message' => 'Student profile created successfully!',
            'data' => $validated,
        ]);
    }
}
