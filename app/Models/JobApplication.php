<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'accepted',
    ];

    protected $hidden = [];

    protected $casts = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            // Trigger the event when a new record is created
            event(new \App\Events\JobApplicationCreated($model));
        });
    }
}
