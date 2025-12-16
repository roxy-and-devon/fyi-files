<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property \Illuminate\Support\Carbon $date_of_birth
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $primaryGuardian
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $guardians
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $schoolStaff
 * @property-read \App\Models\PersonInformation|null $information
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\EmergencyContact> $emergencyContacts
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PersonNote> $notes
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PersonViewLog> $viewLogs
 *
 * @method static \Database\Factories\PersonFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person accessibleBy(\App\Models\User $user)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Person whereGuardian(\App\Models\User $user)
 *
 * @mixin \Eloquent
 */
class Person extends Model
{
    /** @use HasFactory<\Database\Factories\PersonFactory> */
    use HasFactory;

    public function primaryGuardian(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot(['role', 'invited_by', 'invitation_token', 'invited_at', 'accepted_at', 'last_reminder_sent_at'])
            ->withTimestamps();
    }

    public function guardians(): BelongsToMany
    {
        return $this->users()->wherePivot('role', 'guardian');
    }

    public function schoolStaff(): BelongsToMany
    {
        return $this->users()->wherePivot('role', 'school_staff');
    }

    public function information(): HasOne
    {
        return $this->hasOne(PersonInformation::class);
    }

    public function emergencyContacts(): HasMany
    {
        return $this->hasMany(EmergencyContact::class)->orderBy('priority');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(PersonNote::class)->latest();
    }

    public function viewLogs(): HasMany
    {
        return $this->hasMany(PersonViewLog::class)->latest();
    }

    public function scopeAccessibleBy($query, User $user): void
    {
        $query->whereHas('users', function ($q) use ($user) {
            $q->where('users.id', $user->id)
                ->whereNotNull('person_user.user_id');
        })->orWhere('user_id', $user->id);
    }

    public function scopeWhereGuardian($query, User $user): void
    {
        $query->whereHas('guardians', function ($q) use ($user) {
            $q->where('users.id', $user->id)
                ->whereNotNull('person_user.user_id');
        })->orWhere('user_id', $user->id);
    }

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }
}
