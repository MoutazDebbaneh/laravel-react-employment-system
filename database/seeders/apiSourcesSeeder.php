<?php

namespace Database\Seeders;

use App\Models\apiSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class apiSourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        apiSource::firstOrCreate(['name' => 'Forsa.sy']);
    }
}
