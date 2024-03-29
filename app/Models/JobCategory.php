<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobCategory extends Model
{
    use HasFactory;

    protected $table = 'job_categories';
    protected $singular = 'job_category';

    protected $fillable = [
        'name_en',
        'name_ar',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function userProfiles()
    {
        return $this->belongsToMany(JobCategory::class, 'job_category_user_profile', 'job_category_id', 'user_profile_id');
    }
}
