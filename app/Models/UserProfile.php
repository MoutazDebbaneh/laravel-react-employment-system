<?php

namespace App\Models;

// require 'vendor/autoload.php';

require_once __DIR__ . '/../../vendor/autoload.php';

use CURLFile;
use DateTime;
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
use Log;
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

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($profile) {
            $profile->socialLink->delete();
        });
    }

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
        $path = storage_path("app/public/cv_files/$filename");
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

        $result = json_decode($response);

        if (empty($result)) return;

        try {
            if (property_exists($result, 'skills') && !empty($result->skills)) {
                try {
                    $skills = $result->skills;
                    $skills = array_map('strtolower', $skills);
                    $existing_skills = $this->skills->pluck('name')->map(fn ($name) => strtolower($name))->toArray();
                    $new_skills = array_diff($skills, $existing_skills);
                    foreach ($new_skills as $skill) {
                        $skill = new Skill(['name' => ucwords($skill)]);
                        $this->skills()->save($skill);
                    }
                } catch (\Throwable $th) {
                    Log::error($th->getMessage());
                }
            }

            function parseDates($date) // April-yyyy
            {
                $dateTime = new DateTime($date);
                $formattedDate = $dateTime->format('Y-m-01');
                return $formattedDate;
            }

            if (property_exists($result, 'education') && !empty($result->education)) {
                $educations = $result->education;
                foreach ($educations as $education) {
                    try {
                        $dates = $education->dates;
                        $from = $dates[0] ? parseDates($dates[0]) : 'NA';
                        $to = count($dates) == 2 ? parseDates($dates[1]) : 'NA';
                        $edu = new Education([
                            'from' => $from,
                            'to' => $to,
                            'institute' => $education->name ?? 'NA',
                            'field' => 'NA',
                            'degree' => 'Bachelor',
                        ]);
                        $this->educations()->save($edu);
                    } catch (\Throwable $th) {
                        Log::error($th->getMessage());
                    }
                }
            }

            if (property_exists($result, 'experience') && !empty($result->experience)) {
                $experiences = $result->experience;
                foreach ($experiences as $experience) {
                    try {
                        $dates = $experience->dates;
                        $from = $dates[0] ? parseDates($dates[0]) : 'NA';
                        $to = count($dates) == 2 ? parseDates($dates[1]) : 'NA';
                        $exp = new Experience([
                            'from' => $from,
                            'to' => $to,
                            'position' => $experience->title ?? "NA",
                            'company' => $experience->organization ?? "NA",
                            'description' => '-',
                        ]);

                        $this->experiences()->save($exp);
                    } catch (\Throwable $th) {
                        Log::error($th->getMessage());
                    }
                }
            }
            $this->save();
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }
}
