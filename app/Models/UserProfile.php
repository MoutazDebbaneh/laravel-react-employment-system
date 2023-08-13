<?php

namespace App\Models;

// require 'vendor/autoload.php';

require_once __DIR__ . '/../../vendor/autoload.php';

use CURLFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

// use Aws\S3\S3Client;
// use Aws\Common\Credentials\Credentials;
// use Aws\Common\Signature\SignatureV4;
// use Aws\S3\Exception\S3Exception;
use Storage;
// use Symfony\Component\EventDispatcher\Event;

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

    public function parseCV()
    {
        $filename = $this->getAttribute('cv_file');
        $path = storage_path('app/public/cv_files/0g4jqXR0i7aVLamXjQo7QONZV28COgOpXLSuQD4v.pdf');
        $apiKey = env('API_LAYER_API_KEY');

        $uploadUrl = 'https://api.apilayer.com/resume_parser/upload';

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $uploadUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($path));

        $headers = array(
            'Content-Type: application/octet-stream',
            'apikey: ' . $apiKey
        );

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error: ' . curl_error($ch);
        }

        curl_close($ch);

        dd(json_decode($response));
    }
}
