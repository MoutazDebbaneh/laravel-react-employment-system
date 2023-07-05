<?php

namespace App\Console\Commands;

use App\Models\ScrapeSourceConfiguration;
use DateTime;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Log;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\WebDriverBy;
use App\Enums\Gender;
use App\Enums\SourceType;
use App\Helpers\CommandHelpers;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\JobType;
use App\Models\ScrapeSource;

class ScrapeSourcesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape-sources';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    static $args = [
        '--headless',
        '--blink-settings=imagesEnabled=false',
        '--disable-images',
        '--disable-css',
        '--disable-fonts',
        '--user-agent=""Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36""'
    ];

    static $signle_text_selectors = [
        'title_selector',
        'company_selector',
        'location_selector',
        'experience_selector',
        'min_salary_selector',
        'max_salary_selector',
        'min_age_selector',
        'max_age_selector',
        'gender_selector',
        'post_date_selector',
        'expiration_date_selector',
        'type_selector',
        'category_selector'
    ];

    static $long_text_selectors = [
        'description_selector',
        'requirements_selector',
        'benefits_selector',
    ];

    static function normalizedJobData(
        array &$results,
        Collection &$job_categories,
        array &$normalized_categories,
        Collection &$job_types,
        array &$normalized_types
    ) {
        // Handle title and company name
        if (!empty($results['title']) && !empty($results['company']) && $results['title'] != $results['company']) {
            $results['title'] .= (' - ' . $results['company']);
        }
        unset($results['company']);

        // Handle Gender
        if (!empty($results['gender'])) {
            $gender = strtolower($results['gender']);
            $casted_gender = null;
            if ($gender == 'male') $casted_gender = (bool)Gender::Male->value;
            if ($gender == 'female') $casted_gender = (bool)Gender::Female->value;
            if ($gender == 'woman') $casted_gender = (bool)Gender::Female->value;
            $results['gender'] = $casted_gender;
        }

        // Handle Salaries
        if (!empty($results['min_salary'])) {
            $min_salary = $results['min_salary'];
            if (str_contains($min_salary, '-')) {

                //Get first part of the salary
                $min_salary = explode('-', $min_salary)[0];
            }
            // Remove non-digit and non-comma characters
            $min_salary = preg_replace('/[^0-9,]/', '', $min_salary);

            // Remove commas from the salary string
            $min_salary = str_replace(',', '', $min_salary);

            $results['min_salary'] = trim($min_salary);
        }

        if (!empty($results['max_salary'])) {
            $max_salary = $results['max_salary'];
            if (str_contains($max_salary, '-')) {

                //Get first part of the salary
                $max_salary = explode('-', $max_salary)[1];
            }
            // Remove non-digit and non-comma characters using preg_replace()
            $max_salary = preg_replace('/[^0-9,]/', '', $max_salary);

            // Remove commas from the salary string using str_replace()
            $max_salary = str_replace(',', '', $max_salary);
            $results['max_salary'] = trim($max_salary);
        }

        // Handle experience
        if (!empty($results['experience'])) {
            $results['experience'] = preg_replace('/[^0-9]/', '', $results['experience']);
        }

        // Log::channel('scraplog')->info('post_date / expiration_date Before Handling');
        // Log::channel('scraplog')->info($results['post_date']);
        // Log::channel('scraplog')->info($results['expiration_date']);

        // Handle Dates
        if (!empty($results['post_date'])) {
            $results['post_date'] = str_replace('/', '-', $results['post_date']);

            $timestamp = strtotime($results['post_date']);
            if ($timestamp != false) {
                $date = new DateTime('@' . $timestamp);
                $results['post_date'] = $date->format('Y-m-d');
            } else {
                Log::channel('scraplog')->info("Can't handle post_date");
            }
        }
        if (!empty($results['expiration_date'])) {
            $results['expiration_date'] = str_replace('/', '-', $results['expiration_date']);

            $timestamp = strtotime($results['expiration_date']);
            if ($timestamp != false) {
                $date = new DateTime('@' . $timestamp);
                $results['expiration_date'] = $date->format('Y-m-d');
            } else {
                Log::channel('scraplog')->info("Can't handle expiration_date");
            }
        }

        // Log::channel('scraplog')->info('post_date / expiration_date After Handling');
        // Log::channel('scraplog')->info($results['post_date']);
        // Log::channel('scraplog')->info($results['expiration_date']);


        // Handle category
        if (!empty($results['category'])) {
            $category = str_word_count(
                preg_replace('/[^a-z]/', '', strtolower($results['category'])),
                1
            );
            foreach ($normalized_categories as $index => $normalized_category) {
                $match = false;
                if (!empty(array_intersect($normalized_category, $category))) {
                    $results['category'] = $job_categories[$index]->id;
                    $match = true;
                    break;
                }
                if (!$match) {
                    $results['category'] = $job_categories->where('name_en', 'Other')->first()->id;
                }
            }
        }

        // Handle job types
        $matched_types_ids = [];
        if (!empty($results['type'])) {
            $type = $results['type'];
            $types = [];
            $sep = '';
            if (str_contains($type, '-')) $sep = '-';
            else if (str_contains($type, ',')) $sep = ',';
            else if (str_contains($type, '/')) $sep = '/';
            if ($sep == '') {
                $types[] = $type;
            } else {
                $types = explode($sep, $type);
            }

            foreach ($normalized_types as $index => $normalized_type) {

                foreach ($types as $job_type) {
                    $nt =
                        str_word_count(
                            preg_replace('/[^a-z]/', '', strtolower($job_type)),
                            1
                        );

                    if (!empty(array_intersect($nt, $normalized_type))) {
                        $matched_types_ids[] = $index;
                        break;
                    }
                }
            }
        }
        $results['matched_types_ids'] = array_map(fn ($index) => $job_types[$index]->id, $matched_types_ids);

        // Handle company logo
        if (!empty($results['display_image'])) {
            $url = $results['display_image'];
            $image = file_get_contents($url);
            $filename = basename($url);
            Storage::put("storage/images/$filename", $image);
            $results['display_image'] = $filename;
        }
    }


    static function scrapeDetails(
        RemoteWebDriver &$driver,
        array &$urls,
        ScrapeSourceConfiguration &$config,
        ScrapeSource &$source
    ) {

        try {

            $job_categories = JobCategory::select('id', 'name_en')->get();

            $normalized_categories = array_map(
                fn ($category)
                =>
                str_word_count(
                    preg_replace(
                        '/[^a-z]/',
                        '',
                        strtolower($category['name_en'])
                    ),
                    1
                ),
                $job_categories->toArray()
            );

            $job_types = JobType::select('id', 'name_en')->get();
            $normalized_types = array_map(
                fn ($type)
                =>
                str_word_count(
                    preg_replace(
                        '/[^a-z]/',
                        '',
                        strtolower($type['name_en'])
                    ),
                    1
                ),
                $job_types->toArray()
            );

            foreach ($urls as $url) {

                $driver->get($url);

                $results = [];

                if (!empty($config->getAttribute('display_image_selector')))
                    $results['display_image'] = $driver->findElement(WebDriverBy::xpath($config->getAttribute('display_image_selector')))->getAttribute('src');

                foreach (self::$signle_text_selectors as $selector_key) {
                    $selector = $config->getAttribute($selector_key);
                    if (empty($selector)) continue;

                    try {
                        $value = trim(
                            $driver->findElement(WebDriverBy::xpath($selector))->getText(),
                            " \t\n\r\0\x0B-"
                        );

                        $results[substr($selector_key, 0, -9)] = $value;
                    } catch (\Throwable $th) {
                    }
                }

                foreach (self::$long_text_selectors as $selector_key) {
                    $selector = $config->getAttribute($selector_key);
                    if (empty($selector)) continue;

                    $text_tags = $driver->findElements(WebDriverBy::xpath($selector));

                    try {
                        $value = '';
                        foreach ($text_tags as $text_tag) {
                            $value .= (trim($text_tag->getText()) . "\n");
                        }

                        $results[substr($selector_key, 0, -9)] = $value;
                    } catch (\Throwable $th) {
                    }
                }

                Log::channel('scraplog')->info("$url raw results:");
                Log::channel('scraplog')->info(json_encode($results));

                // self::normalizedJobData(
                //     $results,
                //     $job_categories,
                //     $normalized_categories,
                //     $job_types,
                //     $normalized_types
                // );

                CommandHelpers::normalizeJobData(
                    $results,
                    $job_categories,
                    $normalized_categories,
                    $job_types,
                    $normalized_types,
                    null,
                    'scraplog'
                );

                Log::channel('scraplog')->info("$url normalized results:");
                Log::channel('scraplog')->info(json_encode($results));

                $results['source_url'] = $url;
                $results['source_type'] = SourceType::Scrape->value;

                $job_details = array_filter($results, function ($value) {
                    return !($value == null || $value == '');
                });

                $job = new Job($job_details);

                if (isset($job_details['category']))
                    $job->forceFill(['category_id' => $job_details['category']]);

                $source->jobs()->save($job);

                if (isset($job_details['matched_types_ids']))
                    $job->jobTypes()->sync($job_details['matched_types_ids']);
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
            Log::channel('scraplog')->error('Caught throwable of type: ' . get_class($th));
            Log::channel('scraplog')->error($th->getMessage());
        }
    }


    static function scrapeLinks(
        RemoteWebDriver &$driver,
        ScrapeSourceConfiguration &$config,
        string $last_scraped_url
    ) {

        $jobs_list_url = $config->getAttribute('jobs_list_url');
        $jobs_link_selector = $config->getAttribute('jobs_link_selector');
        $pagination_variable = $config->getAttribute('pagination_variable');

        Log::channel('scraplog')->info("Scraping $jobs_list_url");

        $page = 1;
        $urls = [];

        $stop = false;

        try {

            while (!$stop && $page < 2) { // TODO

                Log::channel('scraplog')->info("Scraping page = $page");

                // Targeted page URL
                $url = "$jobs_list_url?$pagination_variable=$page";

                // Make a GET request to the website
                $driver->get($url);

                $job_link_tags = $driver->findElements(WebDriverBy::cssSelector($jobs_link_selector));

                $results_count = count($job_link_tags);

                Log::channel('scraplog')->info("Found $results_count jobs in page $page:");
                echo "Found $results_count jobs in page $page\n";

                // Terminary condition

                if ($results_count == 0) {
                    break;
                }

                foreach ($job_link_tags as $job_link_tag) {
                    $href = $job_link_tag->getAttribute('href');
                    Log::channel('scraplog')->info($href);
                    // Check for relative link
                    $url = str_starts_with($href, '/') ? $jobs_list_url . $href : $href;
                    if ($url == $last_scraped_url) {
                        Log::channel('scraplog')->info("Reached last scraped job $url");
                        $stop = true;
                        break;
                    }
                    $urls[] = str_starts_with($href, '/') ? $jobs_list_url . $href : $href;
                }

                $page += 1;
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
            Log::channel('scraplog')->error('Caught throwable of type: ' . get_class($th));
            Log::channel('scraplog')->error($th->getMessage());
        }

        return array_reverse($urls);
    }


    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        echo "Scrape Handle Started\n";

        try {
            $chromeOptions = new ChromeOptions();
            $chromeOptions->addArguments(self::$args);
            $capabilities = DesiredCapabilities::chrome();
            $capabilities->setCapability('chromeOptions', $chromeOptions);
            $driver = RemoteWebDriver::create(env("SCRAPE_SERVER"), $capabilities);

            $sources = ScrapeSource::all();

            foreach ($sources as $source) {
                $name = $source->name;

                echo "Scraping $name started\n";
                Log::channel('scraplog')->info("Scraping $name started\n");

                $config = $source->scrapeSourceConfiguration()->first();

                if (empty($config)) {
                    Log::channel('scraplog')->warning("$name doesn't have a configuration. Skipping...");
                    continue;
                }

                $last_scraped_url = $source->jobs()->latest()->pluck('source_url')->first() ?? '';

                $urls = self::scrapeLinks($driver, $config, $last_scraped_url);

                $count = count($urls);
                echo "Scraping job urls ended with $count new jobs to fetch\n";
                Log::channel('scraplog')->info("Scraping ended with $count new jobs to fetch");

                self::scrapeDetails($driver, $urls, $config, $source);

                echo "Scraping $name ended\n";
                Log::channel('scraplog')->info("Scraping $name ended\n");
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
            Log::channel('scraplog')->error('Caught throwable of type: ' . get_class($th));
            Log::channel('scraplog')->error($th->getMessage());
        }
    }
}
