<?php

namespace Database\Seeders;

use App\Models\ScrapeSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScrapeSourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ScrapeSource::firstOrCreate([
            'name' => 'Career.sy',
            'logo' => 'career.sy.png'
        ]);
    }
}
