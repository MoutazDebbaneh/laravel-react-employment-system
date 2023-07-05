<?php

namespace Database\Seeders;

use App\Models\ScrapeSource;
use App\Models\ScrapeSourceConfiguration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScrapeSourceConfigurationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $source = ScrapeSource::where('name', 'Career.sy')->first();

        $config = new ScrapeSourceConfiguration([
            'title_selector' => '//div[@class="job-block-seven"]//h4[1]',
            'company_selector' => '//div[@class="job-block-seven"]//h4[1]',
            'location_selector' => '//ul[@class="job-overview"][1]//h5[contains(., "Location")]/following-sibling::*[1]',
            'description_selector' => '//div[@class="job-detail-outer"][1]//div[@class="job-detail"][1]',
            'requirements_selector' => '',
            'benefits_selector' => '',
            'experience_selector' => '//ul[@class="job-overview"][1]//h5[contains(., "Experience")]/following-sibling::*[1]',
            'min_salary_selector' => '//ul[@class="job-overview"][1]//h5[contains(., "Salary")]/following-sibling::*[1]',
            'max_salary_selector' => '//ul[@class="job-overview"][1]//h5[contains(., "Salary")]/following-sibling::*[1]',
            'min_age_selector' => '',
            'max_age_selector' => '',
            'gender_selector' => '//ul[@class="job-overview"][1]/li[7]/span',
            'display_image_selector' => '//div[@class="job-block-seven"]//img[1]',
            'post_date_selector' => '//div[@class="job-block-seven"]//ul/li[3]',
            'expiration_date_selector' => '//ul[@class="job-overview"][1]//h5[contains(., "Expiration date")]/following-sibling::*[1]',
            'type_selector' => '//div[@class="job-block-seven"]//li[@class="time"][1]',
            'jobs_list_url' => 'https://www.career.sy/job',
            'pagination_variable' => 'page',
            'jobs_link_selector' => '.job-block a',
            'category_selector' => '//div[@class="job-block-seven"]//ul/li[1]'
        ]);

        if (!$source->scrapeSourceConfiguration()->exists()) {
            $source->scrapeSourceConfiguration()->save($config);
        }
    }
}
