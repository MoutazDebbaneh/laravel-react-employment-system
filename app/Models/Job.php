<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'location',
        'description',
        'requirements',
        'benefits',
        'experience',
        'min_salary',
        'max_salary',
        'min_age',
        'max_age',
        'gender',
        'display_image',
        'post_date',
        'expiration_date',
        'source_type',
        'source_url'
    ];

    protected $hidden = [];

    protected $casts = [];

    public function jobCategory(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function jobTypes(): BelongsToMany
    {
        return $this->belongsToMany(JobType::class);
    }

    public function scrapeSource(): BelongsTo
    {
        return $this->belongsTo(ScrapeSource::class);
    }
}
