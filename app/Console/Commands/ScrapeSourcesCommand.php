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
                        '/[^a-z\s]/',
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
                        '/[^a-z\s]/',
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
                    $job->forceFill(['job_category_id' => $job_details['category']]);

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
