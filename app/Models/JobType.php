<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class JobType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function jobs(): BelongsToMany
    {
        return $this->belongsToMany(Job::class);
    }
}
