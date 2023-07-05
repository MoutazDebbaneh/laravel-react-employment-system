<?php

namespace App\Console\Commands;

use App\Enums\APIMethod;
use App\Enums\APIPassType;
use App\Enums\SourceType;
use App\Helpers\CommandHelpers;
use App\Models\apiSource;
use App\Models\apiSourceConfiguration;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\JobType;
use CurlHandle;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FetchapiSourcesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-apis';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';


    static $job_details_paths = [
        'title_path',
        'company_path',
        'location_path',
        'description_path',
        'requirements_path',
        'benefits_path',
        'experience_path',
        'min_salary_path',
        'max_salary_path',
        'min_age_path',
        'max_age_path',
        'gender_path',
        'display_image_path',
        'post_date_path',
        'expiration_date_path',
        'type_path',
        'category_path'
    ];


    static function navigateJson($json, $keys_string)
    {
        if (empty($json)) return '';
        $keys = explode('.', $keys_string);
        $keys = array_filter($keys, fn ($k) => !empty($k));
        $value = $json;

        foreach ($keys as $key) {
            if (is_array($value) && array_key_exists($key, $value)) {
                $value = $value[$key];
            } elseif (is_object($value) && property_exists($value, $key)) {
                $value = $value->$key;
            } else {
                Log::channel('apifetchlog')->error("Unknown key $key");
                return null;
            }
        }

        return $value;
    }

    static function initCurl($url, $data, $method, $pass_type): CurlHandle
    {
        $curl = curl_init();

        $opt_array = [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_RETURNTRANSFER => true
        ];

        switch ($pass_type) {
            case APIPassType::Form->value:

                $opt_array += [
                    CURLOPT_URL => $url,
                    CURLOPT_POSTFIELDS => http_build_query($data)
                ];
                break;

            case APIPassType::Query->value:
                $opt_array += [
                    CURLOPT_URL => $url . '?' . http_build_query($data),
                ];
                break;

            case 'Path':
                $opt_array += [CURLOPT_URL => $url . '/' . reset($data)];
                break;
            default:
                break;
        }

        curl_setopt_array($curl, $opt_array);

        return $curl;
    }

    static function fetchJobDetails(apiSourceConfiguration &$config, string $job_id)
    {
        try {


            $form_data = array(
                $config->getAttribute('job_id_path') => $job_id,
            );

            $curl = self::initCurl(
                $config->getAttribute('jobs_link_endpoint'),
                $form_data,
                $config->getAttribute('jobs_link_method'),
                $config->getAttribute('job_id_pass_type')
            );

            $response = curl_exec($curl);

            $url = curl_getinfo($curl, CURLINFO_EFFECTIVE_URL);

            if (curl_errno($curl)) {
                $error_msg = curl_error($curl);
                Log::channel('apifetchlog')->error($error_msg);
                return [];
            }

            $content_type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
            $response_data = null;

            if (strpos($content_type, 'application/json') !== false) {
                $response_data = json_decode($response, true);
            } elseif (
                strpos($content_type, 'application/xml') !== false
                || strpos($content_type, 'text/xml') !== false
            ) {
                $response_data = json_decode(json_encode(simplexml_load_string($response)), true);
            } else {
                Log::channel('apifetchlog')->error("Can't decode response:");
                Log::channel('apifetchlog')->error(json_encode($response_data));
                return [];
            }

            $results = [];

            $results['source_url'] = $url;

            foreach (self::$job_details_paths as $path_key) {
                $path = $config->getAttribute($path_key);
                if (empty($path)) continue;
                // echo $path . "\n";
                $value = self::navigateJson($response_data, $path);
                // echo $value . "\n";
                if (empty($value)) continue;
                if (is_string($value)) $value = strip_tags($value);
                $results[str_replace('_path', '', $path_key)] = $value;
            }

            Log::channel('apifetchlog')->info(json_encode($results));

            curl_close($curl);

            return $results;
        } catch (\Throwable $th) {
            echo $th->getMessage();
            Log::channel('apifetchlog')->error('Caught throwable of type: ' . get_class($th));
            Log::channel('apifetchlog')->error($th->getMessage());
        }
        return [];
    }

    static function fetchJobIds(apiSourceConfiguration $config, string $last_fetched_url): array
    {
        try {

            $page = 0;
            $job_ids = [];
            $stop = false;

            while (!$stop) {

                $form_data = array(
                    $config->getAttribute('search_variable') => '',
                    $config->getAttribute('pagination_variable') => $page,
                );

                $curl = self::initCurl(
                    $config->getAttribute('jobs_list_endpoint'),
                    $form_data,
                    $config->getAttribute('jobs_list_method'),
                    $config->getAttribute('pagination_pass_type')
                );

                $response = curl_exec($curl);

                if (curl_errno($curl)) {
                    $error_msg = curl_error($curl);
                    Log::channel('apifetchlog')->error($error_msg);
                    return [];
                }
                $content_type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
                $response_data = null;

                if (strpos($content_type, 'application/json') !== false) {
                    $response_data = json_decode($response, true);
                } elseif (
                    strpos($content_type, 'application/xml') !== false
                    || strpos($content_type, 'text/xml') !== false
                ) {
                    $response_data = json_decode(json_encode(simplexml_load_string($response)), true);
                } else {
                    Log::channel('apifetchlog')->error("Can't decode response:");
                    Log::channel('apifetchlog')->error(json_encode($response_data));
                    return [];
                }

                $jobs = self::navigateJson($response_data, $config->getAttribute('jobs_array_path'));

                if (empty($jobs)) break;

                foreach ($jobs as $job) {
                    $id = self::navigateJson($job, $config->getAttribute('job_id_path'));
                    if (str_ends_with($last_fetched_url, $id)) {
                        Log::channel('apifetchlog')->info("Reached last fetched job id $id");
                        $stop = true;
                        break;
                    }
                    $job_ids[] = $id;
                }

                // Close the cURL session
                curl_close($curl);

                $page += 1;
            }
            return array_reverse($job_ids);
        } catch (\Throwable $th) {
            echo $th->getMessage();
            Log::channel('apifetchlog')->error('Caught throwable of type: ' . get_class($th));
            Log::channel('apifetchlog')->error($th->getMessage());
        }
        return [];
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sources = apiSource::all();

        foreach ($sources as $source) {

            $name = $source->name;
            $config = $source->apiSourceConfiguration()->first();

            if (empty($config)) {
                Log::channel('scraplog')->warning("$name doesn't have a configuration. Skipping...");
                continue;
            }

            Log::channel('apifetchlog')->info("Scraping $name started\n");

            $last_fetched_url = $source->jobs()->latest()->pluck('source_url')->first() ?? '';

            $job_ids = self::fetchJobIds($config, $last_fetched_url);
            $count = count($job_ids);
            Log::channel('apifetchlog')->info("Fetched $count id");

            foreach ($job_ids as $job_id) {


                $results = self::fetchJobDetails($config, $job_id);

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

                $mappings = [
                    'gender_map' => $config->getAttribute('gender_map'),
                    'type_map' => $config->getAttribute('type_map'),
                    'category_map' => $config->getAttribute('category_map')
                ];

                CommandHelpers::normalizeJobData(
                    $results,
                    $job_categories,
                    $normalized_categories,
                    $job_types,
                    $normalized_types,
                    $mappings,
                    'apifetchlog'
                );

                $results['source_type'] = SourceType::API->value;

                $job_details = array_filter($results, function ($value) {
                    return !($value == null || $value == '');
                });

                $job = new Job($job_details);

                if (isset($job_details['category'])) {
                    if (is_int($job_details['category'])) {
                        $job->forceFill(['category_id' => $job_details['category']]);
                    } else {
                        $job->forceFill(
                            ['category_id' => reset($job_details['category'])]
                        );
                    }
                }

                $source->jobs()->save($job);

                Log::channel('apifetchlog')->info('Job saved:');
                Log::channel('apifetchlog')->info(json_encode($job));

                if (isset($job_details['matched_types_ids']))
                    $job->jobTypes()->sync($job_details['matched_types_ids']);
            }

            Log::channel('apifetchlog')->info("Scraping $name ended\n");
        }
    }
}
