<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';
    protected $singular = 'company';

    protected $fillable = [
        'name',
        'email',
        'logo',
        'website',
        'phone',
        'headquarters',
    ];

    protected $hidden = [];

    protected $casts = [
        'company_verified_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function companyVerificationRequest()
    {
        return $this->hasOne(CompanyVerificationRequest::class);
    }
}
