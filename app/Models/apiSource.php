<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class apiSource extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function apiSourceConfiguration(): HasOne
    {
        return $this->hasOne(apiSourceConfiguration::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }
}
