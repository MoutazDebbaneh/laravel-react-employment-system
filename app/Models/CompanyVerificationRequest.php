<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyVerificationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_accepted',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
