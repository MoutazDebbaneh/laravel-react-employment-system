<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RootAdminUserSeeder::class);
        $this->call(JobTypesSeeder::class);
        $this->call(JobCategoriesSeeder::class);
        $this->call(ScrapeSourcesSeeder::class);
        $this->call(ScrapeSourceConfigurationsSeeder::class);
        $this->call(apiSourcesSeeder::class);
        $this->call(apiSourceConfigurationsSeeder::class);
    }
}
