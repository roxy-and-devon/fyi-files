---
name: Student Information Management System
overview: Build a system where guardians manage student information (medical conditions, special needs) and grant access to school staff. Uses role-based permissions with audit logging for staff views.
todos:
  - id: create-person-user-migration
    content: Create person_user migration (pivot table with invitation support)
    status: pending
  - id: create-person-information-migration
    content: Create person_information migration (1:1 medical/special needs data)
    status: pending
    dependencies:
      - create-person-user-migration
  - id: create-emergency-contacts-migration
    content: Create emergency_contacts migration (1:many emergency contacts)
    status: pending
    dependencies:
      - create-person-user-migration
  - id: create-person-notes-migration
    content: Create person_notes migration (1:many freeform notes)
    status: pending
    dependencies:
      - create-person-user-migration
  - id: create-person-view-logs-migration
    content: Create person_view_logs migration (audit trail for staff views)
    status: pending
    dependencies:
      - create-person-user-migration
  - id: run-migrations
    content: "Run all migrations: php artisan migrate"
    status: pending
    dependencies:
      - create-person-user-migration
      - create-person-information-migration
      - create-emergency-contacts-migration
      - create-person-notes-migration
      - create-person-view-logs-migration
  - id: update-person-model
    content: Update Person model with relationships, scopes, and casts (fillable not needed due to Model::unguard())
    status: pending
    dependencies:
      - run-migrations
  - id: create-person-information-model
    content: Create PersonInformation model with relationships
    status: pending
    dependencies:
      - run-migrations
  - id: create-emergency-contact-model
    content: Create EmergencyContact model with relationships
    status: pending
    dependencies:
      - run-migrations
  - id: create-person-note-model
    content: Create PersonNote model with relationships
    status: pending
    dependencies:
      - run-migrations
  - id: create-person-view-log-model
    content: Create PersonViewLog model (no timestamps, uses viewed_at)
    status: pending
    dependencies:
      - run-migrations
  - id: update-user-model
    content: Update User model with people relationships
    status: pending
    dependencies:
      - update-person-model
  - id: test-relationships
    content: Test all model relationships in tinker
    status: pending
    dependencies:
      - update-person-model
      - create-person-information-model
      - create-emergency-contact-model
      - create-person-note-model
      - create-person-view-log-model
      - update-user-model
  - id: create-person-policy
    content: Create PersonPolicy with all authorization methods
    status: pending
    dependencies:
      - update-person-model
  - id: register-person-policy
    content: Register PersonPolicy in bootstrap/providers.php
    status: pending
    dependencies:
      - create-person-policy
  - id: write-person-policy-test
    content: Write PersonPolicyTest unit test
    status: pending
    dependencies:
      - create-person-policy
  - id: run-policy-tests
    content: "Run PersonPolicyTest: php artisan test --filter=PersonPolicyTest"
    status: pending
    dependencies:
      - write-person-policy-test
      - register-person-policy
  - id: create-form-requests
    content: Create all 7 Form Request classes (PersonStore, PersonUpdate, PersonInformationUpdate, EmergencyContactStore, EmergencyContactUpdate, PersonNoteStore, PersonAccessInvite)
    status: pending
    dependencies:
      - update-person-model
  - id: create-person-controller
    content: Create PersonController with full CRUD methods
    status: pending
    dependencies:
      - create-form-requests
      - register-person-policy
  - id: create-person-information-controller
    content: Create PersonInformationController (show, edit, update)
    status: pending
    dependencies:
      - create-form-requests
      - register-person-policy
  - id: create-emergency-contact-controller
    content: Create EmergencyContactController (index, store, update, destroy)
    status: pending
    dependencies:
      - create-form-requests
      - register-person-policy
  - id: create-person-note-controller
    content: Create PersonNoteController (index, store, destroy)
    status: pending
    dependencies:
      - create-form-requests
      - register-person-policy
  - id: write-crud-feature-tests
    content: Write feature tests for PersonController, PersonInformationController, EmergencyContactController, PersonNoteController
    status: pending
    dependencies:
      - create-person-controller
      - create-person-information-controller
      - create-emergency-contact-controller
      - create-person-note-controller
  - id: run-crud-tests
    content: "Run CRUD feature tests: php artisan test --filter=Person"
    status: pending
    dependencies:
      - write-crud-feature-tests
  - id: create-person-access-controller
    content: Create PersonAccessController (index, create, store, destroy)
    status: pending
    dependencies:
      - create-form-requests
      - register-person-policy
  - id: create-person-invitation-controller
    content: Create PersonInvitationController (show, accept)
    status: pending
    dependencies:
      - create-person-access-controller
  - id: write-access-control-tests
    content: Write feature tests for PersonAccessController and PersonInvitationController
    status: pending
    dependencies:
      - create-person-access-controller
      - create-person-invitation-controller
  - id: run-access-control-tests
    content: Run access control feature tests
    status: pending
    dependencies:
      - write-access-control-tests
  - id: create-person-access-granted-notification
    content: Create PersonAccessGranted notification
    status: pending
    dependencies:
      - update-person-model
  - id: create-person-invitation-notification
    content: Create PersonInvitation notification
    status: pending
    dependencies:
      - update-person-model
  - id: create-person-invitation-reminder-notification
    content: Create PersonInvitationReminder notification
    status: pending
    dependencies:
      - update-person-model
  - id: create-person-invitation-expired-notification
    content: Create PersonInvitationExpired notification (notifies guardian when invitation expires)
    status: pending
    dependencies:
      - update-person-model
  - id: configure-mail-settings
    content: Configure mail settings in .env (use Mailtrap for testing)
    status: pending
  - id: test-notifications
    content: Test notifications with Notification::fake() in tests
    status: pending
    dependencies:
      - create-person-access-granted-notification
      - create-person-invitation-notification
      - create-person-invitation-reminder-notification
      - create-person-invitation-expired-notification
      - write-access-control-tests
  - id: create-track-person-views-middleware
    content: Create TrackPersonViews middleware with section parameter support
    status: pending
    dependencies:
      - create-person-view-log-model
  - id: register-track-person-views-middleware
    content: Register TrackPersonViews middleware alias in bootstrap/app.php
    status: pending
    dependencies:
      - create-track-person-views-middleware
  - id: create-person-audit-controller
    content: Create PersonAuditController (index with pagination)
    status: pending
    dependencies:
      - register-person-policy
  - id: write-middleware-tests
    content: Write TrackPersonViewsMiddlewareTest feature test
    status: pending
    dependencies:
      - create-track-person-views-middleware
      - register-track-person-views-middleware
  - id: run-middleware-tests
    content: Run middleware tests
    status: pending
    dependencies:
      - write-middleware-tests
  - id: create-send-invitation-reminders-command
    content: Create SendInvitationReminders command to check pending invitations and send reminders every 5 days
    status: pending
    dependencies:
      - create-person-invitation-reminder-notification
      - create-person-invitation-expired-notification
  - id: create-send-invitation-reminders-job
    content: Create SendInvitationReminders job (optional - can use command directly in schedule)
    status: pending
    dependencies:
      - create-send-invitation-reminders-command
  - id: schedule-invitation-reminders
    content: Schedule invitation reminders command in routes/console.php (daily check, send reminders every 5 days, expire after 30 days)
    status: pending
    dependencies:
      - create-send-invitation-reminders-command
  - id: write-invitation-reminder-tests
    content: Write feature tests for invitation reminder system (reminders sent, expiration after 30 days, guardian notified)
    status: pending
    dependencies:
      - schedule-invitation-reminders
  - id: run-invitation-reminder-tests
    content: Run invitation reminder tests
    status: pending
    dependencies:
      - write-invitation-reminder-tests
  - id: add-routes
    content: Add all routes to routes/web.php with proper middleware
    status: pending
    dependencies:
      - create-person-controller
      - create-person-information-controller
      - create-emergency-contact-controller
      - create-person-note-controller
      - create-person-access-controller
      - create-person-invitation-controller
      - create-person-audit-controller
      - register-track-person-views-middleware
      - schedule-invitation-reminders
  - id: generate-wayfinder-routes
    content: "Generate Wayfinder routes: php artisan wayfinder:generate"
    status: pending
    dependencies:
      - add-routes
  - id: update-dashboard
    content: Update dashboard.tsx with people list and empty state
    status: pending
    dependencies:
      - create-person-controller
      - generate-wayfinder-routes
  - id: create-people-index-page
    content: Create people/index.tsx with searchable list
    status: pending
    dependencies:
      - generate-wayfinder-routes
  - id: create-people-create-edit-pages
    content: Create people/create.tsx and people/edit.tsx forms
    status: pending
    dependencies:
      - generate-wayfinder-routes
  - id: create-people-show-page
    content: Create people/show.tsx with tabbed interface structure
    status: pending
    dependencies:
      - generate-wayfinder-routes
  - id: create-medical-information-forms
    content: Create medical information forms in people/show.tsx Medical tab
    status: pending
    dependencies:
      - create-people-show-page
  - id: create-emergency-contacts-management
    content: Create emergency contacts management UI in people/show.tsx Overview tab
    status: pending
    dependencies:
      - create-people-show-page
  - id: create-notes-interface
    content: Create notes interface in people/show.tsx Notes tab
    status: pending
    dependencies:
      - create-people-show-page
  - id: create-access-management-pages
    content: Create people/access/index.tsx and people/access/invite.tsx
    status: pending
    dependencies:
      - create-people-show-page
      - generate-wayfinder-routes
  - id: create-audit-log-page
    content: Create audit log display in people/show.tsx Audit tab
    status: pending
    dependencies:
      - create-people-show-page
  - id: create-invitation-acceptance-page
    content: Create invitation acceptance page for public invitations
    status: pending
    dependencies:
      - generate-wayfinder-routes
  - id: test-frontend-workflows
    content: Test all frontend workflows manually in browser
    status: pending
    dependencies:
      - create-medical-information-forms
      - create-emergency-contacts-management
      - create-notes-interface
      - create-access-management-pages
      - create-audit-log-page
      - create-invitation-acceptance-page
  - id: update-person-factory
    content: Update PersonFactory with withGuardian and withStaffAccess states
    status: pending
    dependencies:
      - update-person-model
  - id: create-new-factories
    content: Create PersonInformationFactory, EmergencyContactFactory, PersonNoteFactory, PersonViewLogFactory
    status: pending
    dependencies:
      - create-person-information-model
      - create-emergency-contact-model
      - create-person-note-model
      - create-person-view-log-model
  - id: write-remaining-feature-tests
    content: Write all remaining feature tests (PersonInformationController, EmergencyContactController, PersonNoteController, PersonAuditController)
    status: pending
    dependencies:
      - create-new-factories
      - update-person-factory
  - id: run-full-test-suite
    content: "Run full test suite: php artisan test"
    status: pending
    dependencies:
      - write-remaining-feature-tests
      - run-crud-tests
      - run-access-control-tests
      - run-middleware-tests
      - run-policy-tests
      - run-invitation-reminder-tests
  - id: fix-test-failures
    content: Fix any test failures from full test suite
    status: pending
    dependencies:
      - run-full-test-suite
  - id: run-duster
    content: "Run Duster code formatter: vendor/bin/duster fix --dirty"
    status: pending
    dependencies:
      - fix-test-failures
      - test-frontend-workflows
  - id: manual-browser-testing
    content: Perform comprehensive manual browser testing
    status: pending
    dependencies:
      - run-duster
  - id: test-invitation-emails
    content: Test invitation email delivery and acceptance flow
    status: pending
    dependencies:
      - manual-browser-testing
      - configure-mail-settings
  - id: test-access-control-permissions
    content: Verify all access control permissions work correctly
    status: pending
    dependencies:
      - manual-browser-testing
  - id: verify-audit-logging
    content: Verify audit logging captures all staff views correctly
    status: pending
    dependencies:
      - manual-browser-testing
---

# Student Information Management System - Implementation Plan

## Overview

Build a system where guardians manage student information (medical conditions, special needs) and grant access to school staff. Uses role-based permissions with audit logging for staff views.

## User Decisions Summary

- **Primary Guardian**: Hybrid approach - keep `user_id` for ownership, create guardian entry in `person_user` pivot for access control
- **Invitations**: Support both searching existing users AND email invitations to new users
- **Invitation Reminders**: Send reminders every 5 days for 30 days, then expire and notify guardian
- **Notes**: Visible to both guardians and staff (staff read-only)
- **Audit**: Track views only (when staff view information and sections)
- **Landing**: Update existing dashboard to show people list with "add student" empty state
- **Email**: Use Laravel Notifications (not Mailables)
- **Testing**: Feature tests for controllers, unit tests for policies, factory tests

## Database Schema

### New Tables (5 migrations to create)

1. **person_user** - Pivot for access control with invitation support

   - Fields: id, person_id (FK), user_id (FK nullable), role (enum: guardian/school_staff), invited_by (FK nullable), invitation_token (unique, nullable), invited_at, accepted_at, last_reminder_sent_at (nullable), timestamps
   - Unique constraint on (person_id, user_id, role)
   - Note: user_id is nullable for pending invitations

2. **person_information** - 1:1 medical/special needs data

   - Fields: id, person_id (FK unique), medical_conditions (text), allergies, medications, dietary_restrictions, special_accommodations, timestamps

3. **emergency_contacts** - 1:many emergency contacts

   - Fields: id, person_id (FK), name, relationship (nullable), phone, email (nullable), priority (integer), timestamps
   - Index on (person_id, priority)

4. **person_notes** - 1:many freeform notes (guardians create, all can view)

   - Fields: id, person_id (FK), user_id (FK - author), content (text), timestamps
   - Index on (person_id, created_at)

5. **person_view_logs** - Audit trail for staff views

   - Fields: id, person_id (FK), user_id (FK), section (string), viewed_at (timestamp), ip_address (nullable), user_agent (nullable)
   - No updated_at (immutable audit records)
   - Indexes on (person_id, viewed_at) and (user_id, viewed_at)

## Models to Create/Update

### Update Person Model (app/Models/Person.php)

**Add relationships:**

- `primaryGuardian()` - belongsTo User via user_id
- `users()` - belongsToMany User with pivot fields
- `guardians()` - users()->wherePivot('role', 'guardian')
- `schoolStaff()` - users()->wherePivot('role', 'school_staff')
- `information()` - hasOne PersonInformation
- `emergencyContacts()` - hasMany EmergencyContact (ordered by priority)
- `notes()` - hasMany PersonNote (latest first)
- `viewLogs()` - hasMany PersonViewLog (latest first)

**Add scopes:**

- `accessibleBy(User $user)` - where user has access via pivot
- `whereGuardian(User $user)` - where user is guardian

**Add casts:**

- date_of_birth: 'date'

**Note:** No fillable needed - Model::unguard() is set in AppServiceProvider

### Create New Models

- **PersonInformation** (app/Models/PersonInformation.php) - belongsTo Person (no fillable needed)
- **EmergencyContact** (app/Models/EmergencyContact.php) - belongsTo Person, cast priority to int (no fillable needed)
- **PersonNote** (app/Models/PersonNote.php) - belongsTo Person, belongsTo User (author) (no fillable needed)
- **PersonViewLog** (app/Models/PersonViewLog.php) - no timestamps (uses viewed_at), cast viewed_at to datetime (no fillable needed)

### Update User Model (app/Models/User.php)

**Add relationships:**

- `people()` - belongsToMany Person with pivot fields
- `primaryPeople()` - hasMany Person via user_id
- `guardedPeople()` - people()->wherePivot('role', 'guardian')
- `staffAccessPeople()` - people()->wherePivot('role', 'school_staff')

## Authorization - PersonPolicy

**Create:** app/Policies/PersonPolicy.php

**Methods:**

- `viewAny()` - true (all auth users can view their list)
- `view()` - check user has access via person_user pivot
- `create()` - true (any auth user can create)
- `update()` - check user is guardian via pivot
- `delete()` - check user_id matches (primary guardian only)
- `manageAccess()` - check user is guardian via pivot
- `viewAuditLogs()` - check user is guardian via pivot
- `createNote()` - check user is guardian via pivot

**Register:** Add to bootstrap/providers.php or AppServiceProvider

## Form Requests (Validation)

Create in app/Http/Requests/:

1. **PersonStoreRequest** - name (required, string, max:255), date_of_birth (required, date, before:today)
2. **PersonUpdateRequest** - same rules, authorize via policy
3. **PersonInformationUpdateRequest** - all fields nullable, string, max:5000
4. **EmergencyContactStoreRequest** - name/phone required, email/relationship optional
5. **EmergencyContactUpdateRequest** - same as store, authorize via person relationship
6. **PersonNoteStoreRequest** - content required, string, max:10000
7. **PersonAccessInviteRequest** - type (existing/new), user_id (required_if existing), email/name (required_if new), role (guardian/school_staff)

## Controllers

### 1. PersonController (app/Http/Controllers/PersonController.php)

- `index()` - list accessible people with eager loading
- `create()` - show create form
- `store()` - create person, set user_id, auto-create guardian pivot entry with accepted_at = now()
- `show()` - show details with all relationships, pass authorization bools as props
- `edit()` - show edit form
- `update()` - update person
- `destroy()` - delete person (primary guardian only)

### 2. PersonInformationController

- `show()` - display medical info
- `edit()` - show edit form
- `update()` - updateOrCreate information

### 3. EmergencyContactController

- `index()` - list contacts
- `store()` - create contact
- `update()` - update contact (authorize via person)
- `destroy()` - delete contact

### 4. PersonNoteController

- `index()` - list notes with authors
- `store()` - create note (set user_id to auth user)
- `destroy()` - delete note (guardian only, own notes)

### 5. PersonAccessController

- `index()` - list users with access
- `create()` - show invite form
- `store()` - handle both existing user (attach with accepted_at) and new user (create invitation token, send notification)
- `destroy()` - revoke access (detach from pivot)

### 6. PersonInvitationController (app/Http/Controllers/PersonInvitationController.php)

- `show(string $token)` - show invitation acceptance page
- `accept(Request $request, string $token)` - update pivot with user_id, set accepted_at, redirect to person

### 7. PersonAuditController

- `index()` - show view logs (guardians only) with pagination

## Middleware

**Create:** app/Http/Middleware/TrackPersonViews.php

**Logic:**

- Accept optional section parameter
- Check if person route parameter exists
- Check if user is school_staff via pivot
- If yes, create PersonViewLog with section, timestamp, IP, user agent
- Don't log guardian views
- Return response unchanged

**Register:** Add alias in bootstrap/app.php middleware section

## Notifications

**Create in app/Notifications/:**

1. **PersonAccessGranted.php**

   - Constructor: Person $person, User $invitedBy
   - via: ['mail']
   - toMail: greeting, line explaining access granted, action button to view person, thankyou

2. **PersonInvitation.php**

   - Constructor: Person $person, User $invitedBy, string $token, string $inviteeName
   - via: ['mail']
   - toMail: greeting with name, explanation, action button to accept invitation route

3. **PersonInvitationReminder.php**

   - Constructor: Person $person, User $invitedBy, string $token, string $inviteeName, int $daysSinceInvited
   - via: ['mail']
   - toMail: greeting with name, reminder about pending invitation, days remaining, action button to accept

4. **PersonInvitationExpired.php**

   - Constructor: Person $person, User $invitedBy, string $inviteeName
   - via: ['mail']
   - toMail: notification to guardian that invitation expired after 30 days, invitee name, option to resend

## Routes (add to routes/web.php)

```php
Route::middleware(['auth', 'verified'])->group(function () {
    // People CRUD
    Route::resource('people', PersonController::class);

    // Information
    Route::get('people/{person}/information', [PersonInformationController::class, 'show'])
        ->middleware('track.person.views:medical')->name('people.information.show');
    Route::get('people/{person}/information/edit', [PersonInformationController::class, 'edit'])
        ->name('people.information.edit');
    Route::patch('people/{person}/information', [PersonInformationController::class, 'update'])
        ->name('people.information.update');

    // Emergency Contacts
    Route::post('people/{person}/emergency-contacts', [EmergencyContactController::class, 'store'])
        ->name('people.emergency-contacts.store');
    Route::patch('emergency-contacts/{emergencyContact}', [EmergencyContactController::class, 'update'])
        ->name('emergency-contacts.update');
    Route::delete('emergency-contacts/{emergencyContact}', [EmergencyContactController::class, 'destroy'])
        ->name('emergency-contacts.destroy');

    // Notes
    Route::get('people/{person}/notes', [PersonNoteController::class, 'index'])
        ->middleware('track.person.views:notes')->name('people.notes.index');
    Route::post('people/{person}/notes', [PersonNoteController::class, 'store'])
        ->name('people.notes.store');
    Route::delete('notes/{personNote}', [PersonNoteController::class, 'destroy'])
        ->name('notes.destroy');

    // Access Management
    Route::get('people/{person}/access', [PersonAccessController::class, 'index'])
        ->name('people.access.index');
    Route::get('people/{person}/access/invite', [PersonAccessController::class, 'create'])
        ->name('people.access.create');
    Route::post('people/{person}/access', [PersonAccessController::class, 'store'])
        ->name('people.access.store');
    Route::delete('people/{person}/access/{user}', [PersonAccessController::class, 'destroy'])
        ->name('people.access.destroy');

    // Audit
    Route::get('people/{person}/audit', [PersonAuditController::class, 'index'])
        ->name('people.audit.index');
});

// Public invitation
Route::get('invitations/{token}', [PersonInvitationController::class, 'show'])
    ->name('invitations.show');
Route::post('invitations/{token}/accept', [PersonInvitationController::class, 'accept'])
    ->middleware('auth')->name('invitations.accept');
```

## Frontend Pages

### Update Dashboard (resources/js/Pages/dashboard.tsx)

- Accept `people` prop
- Show empty state if no people: "No students yet" with "Add Your Student" button
- Show grid of people cards if has people: name, DOB, role badge, "View Details" button
- Use Wayfinder for routing

### Create People Pages (resources/js/Pages/people/)

1. **index.tsx** - List all accessible people in table/grid with search
2. **create.tsx** - Form with name and date_of_birth using Inertia `<Form>` and Wayfinder
3. **edit.tsx** - Same form for editing
4. **show.tsx** - Tabbed interface:

   - Overview tab (basic info, emergency contacts)
   - Medical tab (structured info fields)
   - Notes tab (list + add form for guardians)
   - Access tab (guardians only - list users + invite)
   - Audit tab (guardians only - view logs)
   - Use shadcn Tabs component
   - Pass canUpdate, canManageAccess, canViewAudit as props

5. **access/index.tsx** - List users with access, role badges, revoke buttons
6. **access/invite.tsx** - Form with radio toggle (existing/new), conditional fields, role selection

### Page Component Patterns

- Use `<Form {...ControllerAction.form()}>` with Wayfinder
- Use shadcn components (Button, Input, Label, Card, Tabs, Dialog, etc.)
- Handle form errors with `errors` from Form render prop
- Show processing state with `processing` from Form render prop
- Format dates appropriately (date_of_birth as 'Y-m-d' for inputs)

## Factories

### Update PersonFactory (database/factories/PersonFactory.php)

**Add states:**

- `withGuardian(User $guardian)` - set user_id, afterCreating attach to pivot with role guardian
- `withStaffAccess(User $staff)` - afterCreating attach to pivot with role school_staff

### Create New Factories

1. **PersonInformationFactory** - faker data for all medical fields
2. **EmergencyContactFactory** - faker name, phone, relationship, email, random priority 1-3
3. **PersonNoteFactory** - faker paragraphs for content
4. **PersonViewLogFactory** - random section, recent dates, faker IP and user agent

## Testing

### Unit Tests (tests/Unit/)

**PersonPolicyTest.php:**

- Test guardians can update
- Test staff cannot update
- Test only primary guardian can delete
- Test secondary guardians cannot delete
- Test guardians can manage access
- Test staff cannot manage access

### Feature Tests (tests/Feature/)

**PersonControllerTest.php:**

- Test auth users can view their people
- Test creating person sets user_id and creates guardian pivot
- Test cannot view others' people (403)
- Test guardians can update
- Test staff cannot update
- Test only primary guardian can delete

**PersonAccessControllerTest.php:**

- Test guardians can invite existing users (check pivot created, notification sent)
- Test guardians can send email invitations (check token created, notification sent)
- Test staff cannot invite users (403)
- Test guardians can revoke access

**PersonInformationControllerTest.php:**

- Test guardians can update information
- Test staff cannot update (403)
- Test information is created if doesn't exist

**TrackPersonViewsMiddlewareTest.php:**

- Test staff views create logs
- Test guardian views don't create logs
- Test section parameter is captured

Use `Notification::fake()` for email tests, use factory states (`withGuardian()`, `withStaffAccess()`)

## Implementation Sequence

### Phase 1: Database Foundation

1. Create 5 migrations in order (person_user → person_information → emergency_contacts → person_notes → person_view_logs)
2. Run migrations: `php artisan migrate`
3. Update Person model with relationships, scopes, casts (no fillable needed)
4. Create 4 new models (PersonInformation, EmergencyContact, PersonNote, PersonViewLog)
5. Update User model with relationships
6. Test relationships in tinker

### Phase 2: Authorization

1. Create PersonPolicy with all methods
2. Register policy in bootstrap/providers.php
3. Write PersonPolicyTest
4. Run tests: `php artisan test --filter=PersonPolicyTest`

### Phase 3: Validation

1. Create 7 Form Request classes with rules and messages
2. Follow existing pattern (array-based rules)

### Phase 4: Backend - Core CRUD

1. Create PersonController with CRUD methods
2. Create PersonInformationController
3. Create EmergencyContactController
4. Create PersonNoteController
5. Write feature tests for each
6. Run tests: `php artisan test --filter=Person`

### Phase 5: Backend - Access Control

1. Create PersonAccessController
2. Create PersonInvitationController
3. Write feature tests for invitation flows
4. Run tests

### Phase 6: Notifications

1. Create PersonAccessGranted notification
2. Create PersonInvitation notification
3. Create PersonInvitationReminder notification
4. Create PersonInvitationExpired notification
5. Configure mail settings in .env (use Mailtrap for testing)
6. Test with Notification::fake() in tests

### Phase 7: Audit Middleware

1. Create TrackPersonViews middleware
2. Register in bootstrap/app.php
3. Create PersonAuditController
4. Write middleware tests
5. Run tests

### Phase 8: Invitation Reminders

1. Create SendInvitationReminders command/job
2. Logic: Check pending invitations (user_id is null, accepted_at is null)
3. Send reminders every 5 days (check last_reminder_sent_at)
4. After 30 days from invited_at, cancel invitation (delete pivot row) and notify guardian
5. Schedule command to run daily in routes/console.php
6. Write tests for reminder and expiration logic

### Phase 9: Routes & Wayfinder

1. Add all routes to routes/web.php
2. Apply middleware to appropriate routes
3. Test routes: `php artisan route:list --path=people`
4. Generate Wayfinder routes: `php artisan wayfinder:generate`

### Phase 10: Frontend - Dashboard & Core

1. Update dashboard.tsx with people list and empty state
2. Create people/index.tsx
3. Create people/create.tsx and people/edit.tsx
4. Create people/show.tsx with tabs structure
5. Test in browser manually

### Phase 11: Frontend - Features

1. Create medical information forms
2. Create emergency contacts management
3. Create notes interface
4. Create access management pages
5. Create audit log page
6. Create invitation acceptance page
7. Test all workflows

### Phase 12: Factories & Testing

1. Update PersonFactory with states
2. Create 4 new factories
3. Write all remaining feature tests
4. Run full test suite: `php artisan test`
5. Fix any failures

### Phase 13: Final Polish

1. Run Duster: `vendor/bin/duster fix --dirty`
2. Manual browser testing
3. Test invitation emails
4. Test access control permissions
5. Verify audit logging

## Critical Files Reference

**Backend:**

- app/Models/Person.php - Core model
- app/Policies/PersonPolicy.php - Authorization logic
- app/Http/Controllers/PersonController.php - Main CRUD
- app/Http/Controllers/PersonAccessController.php - Access management
- app/Http/Middleware/TrackPersonViews.php - Audit logging
- routes/web.php - Route definitions
- bootstrap/app.php - Middleware registration

**Frontend:**

- resources/js/Pages/dashboard.tsx - Landing page
- resources/js/Pages/people/show.tsx - Main detail view
- resources/js/Pages/people/create.tsx - Create form
- resources/js/Pages/people/access/invite.tsx - Invitation flow

**Testing:**

- tests/Unit/PersonPolicyTest.php - Authorization tests
- tests/Feature/PersonControllerTest.php - CRUD tests
- tests/Feature/PersonAccessControllerTest.php - Invitation tests
- database/factories/PersonFactory.php - Test data

## Important Considerations

1. **Dual Guardian Entry**: When creating a person, BOTH set user_id AND create person_user pivot entry
2. **Invitation Tokens**: Use `Str::random(64)` for security
3. **Email Check**: When inviting "new" user, verify email doesn't already exist in users table
4. **Pending Invitations**: person_user rows with user_id = null are pending; filter with `whereNotNull('user_id')` for active access
5. **Eager Loading**: Always eager load relationships in controllers to prevent N+1
6. **Date Formatting**: Format date_of_birth as 'Y-m-d' for input fields in frontend
7. **Permission Props**: Pass authorization checks as props to frontend (canUpdate, canManageAccess, etc.)
8. **Middleware Section**: Pass section parameter to middleware for granular audit tracking
9. **Queue Configuration**: Use `QUEUE_CONNECTION=sync` in development for immediate email processing
10. **Wayfinder**: Always run `php artisan wayfinder:generate` after adding/changing routes
11. **Mass Assignment**: No fillable arrays needed - Model::unguard() is enabled in AppServiceProvider
12. **Invitation Reminders**: Track last_reminder_sent_at in person_user table, send reminders every 5 days, expire after 30 days

## Success Criteria

- Guardians can create students and manage all their information
- Guardians can invite other guardians and school staff via search or email
- School staff have read-only access with all views logged
- Guardians can view audit logs showing staff activity
- Email notifications sent for all access grants
- All tests passing (feature, unit, factory)
- Dashboard shows people list with empty state
- Person detail page has tabbed interface
- Code follows Laravel 12 and application conventions
