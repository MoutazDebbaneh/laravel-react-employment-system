<?php

namespace App\Helpers;

use App\Enums\Gender;
use DateTime;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CommandHelpers
{
    public static function normalizeJobData(
        array &$results,
        Collection &$job_categories,
        array &$normalized_categories,
        Collection &$job_types,
        array &$normalized_types,
        $mappings,
        string $logchannel
    ) {

        // Handle mappings
        if (isset($mappings['gender_map']) && isset($results['gender'])) {
            $map = is_string($mappings['gender_map']) ?
                json_decode($mappings['gender_map'], true) : $mappings['gender_map'];

            if (is_string($map)) {
                $map = json_decode($map, true);
            }

            if (isset($map[$results['gender']])) {
                $results['gender'] = $map[$results['gender']];
            }
        }

        if (isset($mappings['type_map']) && isset($results['type'])) {
            $map = is_string($mappings['type_map']) ?
                json_decode($mappings['type_map'], true) : $mappings['type_map'];

            if (is_string($map)) {
                $map = json_decode($map, true);
            }

            if (is_string($results['type'])) {
                if (isset($map[$results['type']])) {
                    $results['type'] = $map[$results['type']];
                }
            } else if (is_array($results['type'])) {
                $mapped_types = [];
                foreach ($results['type'] as $type) {
                    if (isset($map[$type])) {
                        $mapped_types[] = $map[$type];
                    }
                }
                $results['type'] = $mapped_types;
            }
        }

        if (isset($mappings['category_map']) && isset($results['category'])) {
            $map = is_string($mappings['category_map']) ?
                json_decode($mappings['category_map'], true) : $mappings['category_map'];

            if (is_string($map)) {
                $map = json_decode($map, true);
            }

            if (is_string($results['category'])) {
                if (isset($map[$results['category']])) {
                    $results['category'] = $map[$results['category']];
                }
            } else if (is_array($results['category'])) {
                $mapped_categories = [];
                foreach ($results['category'] as $category) {
                    if (isset($map[$category])) {
                        $mapped_categories[] = $map[$category];
                    }
                }
                $results['category'] = $mapped_categories;
            }
        }

        // Handle title and company name
        if (!empty($results['title']) && !empty($results['company']) && $results['title'] != $results['company']) {
            if (count(explode('-', $results['title'])) > 1) {
                $results['title'] = explode('-', $results['title'])[0];
            }
            $results['title'] .= (' --- ' . $results['company']);
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
            if (is_string($results['experience'])) {
                $results['experience'] = preg_replace('/[^0-9]/', '', $results['experience']);
                $results['experience'] = intval($results['experience']);
            }
            if ($results['experience'] > 9) {
                $results['experience'] = (int)($results['experience'] / 12);
            }
        }

        // Handle Dates
        if (!empty($results['post_date'])) {
            $results['post_date'] = str_replace('/', '-', $results['post_date']);

            $timestamp = strtotime($results['post_date']);
            if ($timestamp != false) {
                $date = new DateTime('@' . $timestamp);
                $results['post_date'] = $date->format('Y-m-d');
            } else {
                Log::channel($logchannel)->info("Can't handle post_date");
            }
        }
        if (!empty($results['expiration_date'])) {
            $results['expiration_date'] = str_replace('/', '-', $results['expiration_date']);

            $timestamp = strtotime($results['expiration_date']);
            if ($timestamp != false) {
                $date = new DateTime('@' . $timestamp);
                $results['expiration_date'] = $date->format('Y-m-d');
            } else {
                Log::channel($logchannel)->info("Can't handle expiration_date");
            }
        }

        // Handle category
        if (empty($results['category'])) $results['category'] = 'Other';
        if (!empty($results['category'])) {
            $categories = [];
            if (is_string($results['category'])) {
                if (str_contains($results['category'], '/')) $categories = [explode('/', $results['category'])];
                else if (str_contains($results['category'], '-')) $categories = [explode('-', $results['category'])];
                else if (str_contains($results['category'], ',')) $categories = [explode(',', $results['category'])];
                else $categories[] = [$results['category']];
            } else {
                foreach ($results['category'] as $category) {
                    if (str_contains($category, '/')) $categories[] = explode('/', $category);
                    else if (str_contains($category, '-')) $categories[] = explode('-', $category);
                    else if (str_contains($category, ',')) $categories[] = explode(',', $category);
                    else $categories[] = [$category];
                }
            }

            $match = false;

            foreach ($categories as $subcategories) {

                foreach ($subcategories as $index => $category) {
                    $category = str_word_count(
                        preg_replace('/[^a-z\s]/', '', strtolower(trim($category))),
                        1
                    );
                    foreach ($normalized_categories as $index => $normalized_category) {
                        if (!empty(array_intersect($normalized_category, $category))) {
                            $results['category'] = $job_categories[$index]->id;
                            $match = true;
                            break;
                        }
                    }
                    if ($match) break;
                }
            }

            if (!$match) {
                $results['category'] = $job_categories->where('name_en', 'Other')->first()->id;
            }

            // dd($results['category']);
        }

        // Handle job types
        if (empty($results['type'])) $results['type'] = 'Full Time';
        $matched_types_ids = [];
        if (!empty($results['type'])) {

            $types = [];
            if (is_string($results['type'])) {
                if (str_contains($results['type'], '/')) $types = explode('/', $results['type']);
                else if (str_contains($results['type'], '-')) $types = explode('-', $results['type']);
                else if (str_contains($results['type'], ',')) $types = explode(',', $results['type']);
                else $types[] = $results['type'];
            } else {
                $types = $results['type'];
            }

            foreach ($normalized_types as $index => $normalized_type) {

                foreach ($types as $job_type) {
                    $nt =
                        str_word_count(
                            preg_replace('/[^a-z\s]/', '', strtolower(trim($job_type))),
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

        $full_time_id = $job_types->where('name_en', 'Full Time')->first()->id;
        $part_time_id = $job_types->where('name_en', 'Part Time')->first()->id;

        if (in_array($full_time_id, $results['matched_types_ids']) && in_array($part_time_id, $results['matched_types_ids'])) {
            $key = array_search($part_time_id, $results['matched_types_ids']);
            unset($results['matched_types_ids'][$key]);
        }


        // Handle company logo
        if (!empty($results['display_image'])) {
            $url = $results['display_image'];
            $image = file_get_contents($url);
            $filename = basename($url);
            Storage::put("public/images/$filename", $image);
            $results['display_image'] = $filename;
        }

        foreach ($results as $key => $result) {
            if (is_string($result)) {
                $results[$key] = trim($result);
            }
        }
    }
}
