<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonInformation extends Model
{
    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}
