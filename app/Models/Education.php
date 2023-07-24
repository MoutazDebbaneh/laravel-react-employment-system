<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{

    use HasFactory;
    protected $fillable = [
        'from',
        'to',
        'institute',
        'degree',
        'field'
    ];

    protected $table = 'educations';
    protected $hidden = [];

    protected $casts = [];

    public function userProfile(): BelongsTo
    {
        return $this->belongsTo(UserProfile::class);
    }
}
