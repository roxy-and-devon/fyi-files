<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $date_of_birth
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $guardian
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
 *
 * @mixin \Eloquent
 */
class Person extends Model
{
    /** @use HasFactory<\Database\Factories\PersonFactory> */
    use HasFactory;

    public function guardian()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
