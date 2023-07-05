<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class apiSourceConfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'jobs_list_endpoint',
        'jobs_list_method',
        'pagination_pass_type',
        'pagination_variable',
        'search_variable',
        'jobs_array_path',
        'job_id_path',
        'jobs_link_endpoint',
        'jobs_link_method',
        'job_id_pass_type',
        'title_path',
        'company_path',
        'location_path',
        'description_path',
        'requirements_path',
        'benefits_path',
        'experience_path',
        'min_salary_path',
        'max_salary_path',
        'min_age_path',
        'max_age_path',
        'gender_path',
        'display_image_path',
        'post_date_path',
        'expiration_date_path',
        'type_path',
        'category_path'
    ];

    protected $hidden = [];

    protected $casts = [
        'gender_map' => 'json',
        'type_map' => 'json',
        'category_map' => 'json'
    ];

    public function apiSource(): BelongsTo
    {
        return $this->belongsTo(apiSource::class);
    }
}
