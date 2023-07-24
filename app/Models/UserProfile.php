<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_picture',
        'bio',
        'website',
        'gender',
        'country',
        'city',
        'address',
        'cv_file',
        'current_position',
        'education_level',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function languages(): BelongsToMany
    {
        return $this->belongsToMany(Language::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class);
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }
    public function socialLink(): HasOne
    {
        return $this->hasOne(SocialLink::class);
    }
    public function categories()
    {
        return $this->belongsToMany(JobCategory::class, 'job_category_user_profile', 'user_profile_id', 'job_category_id');
    }
}
