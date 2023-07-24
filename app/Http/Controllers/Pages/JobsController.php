<?php

namespace App\Http\Controllers\Pages;

use App;
use App\Enums\SourceType;
use App\Http\Controllers\Controller;
use App\Models\apiSource;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\JobType;
use App\Models\ScrapeSource;
use Illuminate\Http\Request;
use Lang;
use Log;
use Storage;

class JobsController extends Controller
{
    public function index(?Request $request)
    {
        $locale = App::getLocale();
        Log::info($locale);

        $translations = array_merge(
            Lang::get('jobs', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)]
        );

        $perPage = 10; // number of jobs to display per page
        $page = $request->query('page', 1);
        $query = Job::query()->with(['jobCategory', 'jobTypes']);

        // apply filters based on request parameters
        if ($request->has('category') && $request->category != 0) {
            $query->where('job_category_id', $request->category);
        }

        if ($request->has('internal') && $request->internal == '1') {
            $query->whereNull('source_url');
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('type')) {
            $types = (array)$request->type;
            $query->whereHas('jobTypes', function ($query) use ($types) {
                $query->whereIn('job_types.id', $types);
            });
        }

        $order = $request->query('order', 'newest');
        if (!in_array($order, ['newest', 'oldest'])) $order = 'newest';


        $jobs = $query->orderBy('created_at', $order === 'newest' ? 'desc' : 'asc')->paginate($perPage, ['*'], 'page', $page);

        foreach ($jobs as $job) {
            if (!empty($job->display_image)) {
                $job->display_image = Storage::url('images/' . $job->display_image);
            }
            if (!empty($job->source_url)) {
                $logo = '#';
                if ($job->source_type == SourceType::API->value) {
                    $logo = Storage::url('images/' . $job->apiSource->logo);
                    $job->source = $job->apiSource;
                } else {
                    $logo = Storage::url('images/' . $job->scrapeSource->logo);
                    $job->source = $job->scrapeSource;
                }
                $job->source_logo = $logo;
            }
        }

        $filters = [
            'categories' => JobCategory::all(),
            'types' => JobType::all(),
        ];

        return inertia('Jobs/Jobs', [
            'translations' => $translations,
            'jobs' => $jobs,
            'filters' => $filters,
            'perPage' => $perPage,
            'search' => $request->search,
            'category' => $request->category,
            'internal' => $request->internal,
            'current_order' => $order,
            'types' => $request->type,
            'activeLink' => 'Jobs'
        ]);
    }
}
