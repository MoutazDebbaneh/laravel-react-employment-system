<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function userProfiles(): BelongsToMany
    {
        return $this->belongsToMany(UserProfile::class);
    }
}
