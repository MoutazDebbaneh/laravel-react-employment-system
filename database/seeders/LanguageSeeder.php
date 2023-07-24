<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'name_en' => 'English',
                'name_ar' => 'انكليزي'
            ],
            [
                'name_en' => 'Arabic',
                'name_ar' => 'عربي'
            ],
            [
                'name_en' => 'French',
                'name_ar' => 'فرنسي'
            ],
            [
                'name_en' => 'Russian',
                'name_ar' => 'روسي'
            ],
            [
                'name_en' => 'Persian',
                'name_ar' => 'فارسي'
            ],
            [
                'name_en' => 'Turkish',
                'name_ar' => 'تركي'
            ],
            [
                'name_en' => 'German',
                'name_ar' => 'ألماني'
            ],
            [
                'name_en' => 'Chinese',
                'name_ar' => 'صيني'
            ],
            [
                'name_en' => 'Spanish',
                'name_ar' => 'اسباني'
            ],
            [
                'name_en' => 'Italian',
                'name_ar' => 'ايطالي'
            ],
            [
                'name_en' => 'Japanese',
                'name_ar' => 'ياباني'
            ],
            [
                'name_en' => 'Korean',
                'name_ar' => 'كوري'
            ],
        ];

        foreach ($languages as $language) {
            Language::firstOrCreate($language);
        }
    }
}
