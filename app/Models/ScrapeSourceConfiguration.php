<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScrapeSourceConfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_selector',
        'company_selector',
        'location_selector',
        'description_selector',
        'requirements_selector',
        'benefits_selector',
        'experience_selector',
        'min_salary_selector',
        'max_salary_selector',
        'min_age_selector',
        'max_age_selector',
        'gender_selector',
        'display_image_selector',
        'post_date_selector',
        'expiration_date_selector',
        'type_selector',
        'jobs_list_url',
        'pagination_variable',
        'jobs_link_selector',
        'category_selector',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function scrapeSource(): BelongsTo
    {
        return $this->belongsTo(ScrapeSource::class);
    }
}
