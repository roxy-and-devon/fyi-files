---
name: Student Information Management System
overview: Build a student information management system where guardians can manage their children's medical/special needs information and grant access to school staff. The system uses a pivot table for user-person relationships with role-based permissions, includes structured and freeform data storage, detailed audit logging, and email notifications for access grants.
todos: []
---

# Student Information Management System Implementation

## Overview

This application allows guardians to manage their children's medical conditions, special needs, and related information, then grant access to teachers and school staff. The system uses role-based permissions where guardians have full control and can invite others, while school staff have read-only access with detailed audit tracking.

## Database Schema

### New Tables

1. **`person_user` (pivot table)**

   - `id` (primary key)
   - `person_id` (foreign key to people)
   - `user_id` (foreign key to users)
   - `role` (enum: 'guardian', 'school_staff')
   - `invited_by` (foreign key to users, nullable)
   - `invitation_token` (string, nullable - for email invites)
   - `invited_at` (timestamp, nullable)
   - `accepted_at` (timestamp, nullable)
   - `created_at`, `updated_at`

2. **`person_information`**

   - `id` (primary key)
   - `person_id` (foreign key to people)
   - `medical_conditions` (text, nullable)
   - `allergies` (text, nullable)
   - `medications` (text, nullable)
   - `dietary_restrictions` (text, nullable)
   - `special_accommodations` (text, nullable)
   - `created_at`, `updated_at`

3. **`emergency_contacts`**

   - `id` (primary key)
   - `person_id` (foreign key to people)
   - `name` (string)
   - `relationship` (string, nullable)
   - `phone` (string)
   - `email` (string, nullable)
   - `priority` (integer, default 1 - for ordering)
   - `created_at`, `updated_at`

4. **`person_notes`**

   - `id` (primary key)
   - `person_id` (foreign key to people)
   - `user_id` (foreign key to users - who created it)
   - `content` (text)
   - `created_at`, `updated_at`

5. **`person_view_logs`**

   - `id` (primary key)
   - `person_id` (foreign key to people)
   - `user_id` (foreign key to users - who viewed)
   - `section` (string - e.g., 'overview', 'medical_conditions', 'allergies', 'medications', 'notes', etc.)
   - `viewed_at` (timestamp)
   - `ip_address` (string, nullable)
   - `user_agent` (text, nullable)

### Updates to Existing Tables

- **`people` table**: Add `user_id` foreign key (already exists) - this represents the primary guardian who created the record

## Models & Relationships

### User Model ([app/Models/User.php](app/Models/User.php))

- `peopleAsGuardian()` - hasMany through person_user where role = 'guardian'
- `peopleAsStaff()` - hasMany through person_user where role = 'school_staff'
- `allPeople()` - hasMany through person_user (both roles)
- `invitationsSent()` - hasMany PersonUser where invited_by = this user

### Person Model ([app/Models/Person.php](app/Models/Person.php))

- `guardians()` - belongsToMany User through person_user where role = 'guardian'
- `schoolStaff()` - belongsToMany User through person_user where role = 'school_staff'
- `allUsers()` - belongsToMany User through person_user
- `information()` - hasOne PersonInformation
- `emergencyContacts()` - hasMany EmergencyContact
- `notes()` - hasMany PersonNote
- `viewLogs()` - hasMany PersonViewLog
- `primaryGuardian()` - belongsTo User (via user_id)

### New Models

- `PersonUser` (pivot model) - for managing relationships
- `PersonInformation` - structured data
- `EmergencyContact` - emergency contact information
- `PersonNote` - freeform notes
- `PersonViewLog` - audit tracking

## Policies & Authorization

### PersonPolicy

- `viewAny()` - user must have access to at least one person
- `view()` - user must be guardian or school_staff for this person
- `create()` - any authenticated user (they become primary guardian)
- `update()` - only guardians
- `delete()` - only primary guardian
- `manageAccess()` - only guardians
- `inviteUser()` - only guardians

## Controllers

### HomeController

- `index()` - Home page with conditional content:
  - If no people: Empty state prompting to add first student
  - If has people: Dashboard listing all accessible people with quick actions
  - Different messaging for guardians vs staff

### PersonController

- `index()` - List all people user has access to (grouped by role)
- `create()` - Show form to add new student
- `store()` - Create new person, add creator as primary guardian
- `show()` - Display person details (with audit logging for staff)
- `edit()` - Edit form (guardians only)
- `update()` - Update person (guardians only)
- `destroy()` - Delete person (primary guardian only)

### PersonAccessController

- `index()` - List all users with access to a person
- `store()` - Invite user (search existing or email invite)
- `update()` - Change role or permissions
- `destroy()` - Revoke access
- `acceptInvitation()` - Accept invitation via token

### PersonInformationController

- `show()` - Get structured information
- `update()` - Update structured information (guardians only)

### EmergencyContactController

- `store()` - Add emergency contact (guardians only)
- `update()` - Update contact (guardians only)
- `destroy()` - Remove contact (guardians only)

### PersonNoteController

- `index()` - List notes for a person
- `store()` - Add note (guardians only)
- `update()` - Update note (guardians only, only their own notes)
- `destroy()` - Delete note (guardians only, only their own notes)

### PersonAuditController

- `index()` - Show view logs for a person (guardians only)
- Filter by user, section, date range

## Email Notifications

### Mailable Classes

- `PersonAccessGranted` - Sent when existing user is added to a person
- `PersonInvitation` - Sent when new user is invited via email

### Notification Content

- PersonAccessGranted: "You've been granted [guardian/school_staff] access to [Person Name]"
- PersonInvitation: "You've been invited to access [Person Name] as [role]. Click here to accept."

## Frontend Pages

### Home Page ([resources/js/pages/home.tsx](resources/js/pages/home.tsx))

- Conditional rendering based on user's people count
- Empty state: "Add your first student" with CTA button
- Dashboard: Grid/list of people cards with:
  - Person name and photo/avatar
  - Role badge (Guardian/Staff)
  - Quick stats (last updated, view count for staff)
  - Quick actions (View, Edit if guardian)

### Person Pages

- `people/index.tsx` - List all accessible people
- `people/show.tsx` - Person detail view with tabs:
  - Overview (basic info, emergency contacts)
  - Medical Information (structured fields)
  - Notes (freeform notes)
  - Access Management (guardians only)
  - Audit Log (guardians only)
- `people/create.tsx` - Add new student form
- `people/edit.tsx` - Edit person form (guardians only)

### Access Management Pages

- `people/{id}/access/index.tsx` - List users with access
- `people/{id}/access/invite.tsx` - Invite user form (search + email invite)

## Routes

```php
// Public
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/invitations/{token}', [PersonAccessController::class, 'acceptInvitation'])->name('invitations.accept');

// Authenticated
Route::middleware(['auth', 'verified'])->group(function () {
    // People
    Route::resource('people', PersonController::class);
    Route::get('people/{person}/access', [PersonAccessController::class, 'index'])->name('people.access.index');
    Route::post('people/{person}/access', [PersonAccessController::class, 'store'])->name('people.access.store');
    Route::put('people/{person}/access/{personUser}', [PersonAccessController::class, 'update'])->name('people.access.update');
    Route::delete('people/{person}/access/{personUser}', [PersonAccessController::class, 'destroy'])->name('people.access.destroy');
    
    // Information
    Route::get('people/{person}/information', [PersonInformationController::class, 'show'])->name('people.information.show');
    Route::put('people/{person}/information', [PersonInformationController::class, 'update'])->name('people.information.update');
    
    // Emergency Contacts
    Route::post('people/{person}/emergency-contacts', [EmergencyContactController::class, 'store'])->name('people.emergency-contacts.store');
    Route::put('people/{person}/emergency-contacts/{contact}', [EmergencyContactController::class, 'update'])->name('people.emergency-contacts.update');
    Route::delete('people/{person}/emergency-contacts/{contact}', [EmergencyContactController::class, 'destroy'])->name('people.emergency-contacts.destroy');
    
    // Notes
    Route::get('people/{person}/notes', [PersonNoteController::class, 'index'])->name('people.notes.index');
    Route::post('people/{person}/notes', [PersonNoteController::class, 'store'])->name('people.notes.store');
    Route::put('people/{person}/notes/{note}', [PersonNoteController::class, 'update'])->name('people.notes.update');
    Route::delete('people/{person}/notes/{note}', [PersonNoteController::class, 'destroy'])->name('people.notes.destroy');
    
    // Audit
    Route::get('people/{person}/audit', [PersonAuditController::class, 'index'])->name('people.audit.index');
});
```

## Middleware

### TrackPersonViews

- Applied to person detail routes
- Logs views to `person_view_logs` table
- Only tracks for school_staff role (not guardians)
- Captures section viewed, timestamp, IP, user agent

## Implementation Flow

1. Create migrations for all new tables
2. Create models with relationships
3. Create policies for authorization
4. Create controllers with CRUD operations
5. Create email notifications
6. Create frontend pages and components
7. Add routes
8. Implement audit logging middleware
9. Update home page to use HomeController
10. Add navigation links to sidebar/menu

## Key Features

- Role-based access control (guardian vs school_staff)
- Invitation system (search existing users or email invite)
- Email notifications for access grants
- Structured data storage (medical info, allergies, etc.)
- Freeform notes
- Emergency contacts management
- Detailed audit logging of staff views
- Audit log viewing for guardians
- Multi-guardian support (multiple guardians per person)