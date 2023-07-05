<?php

namespace Database\Seeders;

use App\Models\JobType;
use Illuminate\Database\Seeder;

class JobTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $job_types = [
            [
                'name_en' => 'Full Time',
                'name_ar' => 'دوام كامل'
            ],
            [
                'name_en' => 'Part Time',
                'name_ar' => 'دوام جزئي'
            ],
            [
                'name_en' => 'Freelance',
                'name_ar' => 'عمل حر'
            ],
            [
                'name_en' => 'Internship',
                'name_ar' => 'تدريب'
            ],
            [
                'name_en' => 'Temporary',
                'name_ar' => 'عمل مؤقت'
            ],
            [
                'name_en' => 'Volunteering',
                'name_ar' => 'تطوع'
            ],
            [
                'name_en' => 'Contract',
                'name_ar' => 'عقد عمل'
            ],
        ];

        foreach ($job_types as $job_type) {
            JobType::firstOrCreate($job_type);
        }
    }
}
