<?php

namespace App\Http\Controllers\Pages;

use App;
use App\Enums\NotificationType;
use App\Enums\SourceType;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\JobCategory;
use App\Models\JobType;
use Illuminate\Http\Request;
use Lang;
use Storage;

class JobsPageController extends Controller
{
    public function index(?Request $request)
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('jobs', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)]
        );

        $perPage = 10; // number of jobs to display per page
        $page = $request->query('page', 1);
        $query = Job::query()->with(['jobCategory', 'jobTypes', 'company']);

        // apply filters based on request parameters
        if ($request->has('category') && $request->category != 0) {
            $query->where('job_category_id', $request->category);
        }

        if ($request->has('company') && $request->company != 0) {
            $query->where('company_id', $request->company);
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
                $job->display_image = (empty($job->source_url) ? Storage::url('images/companies/' . $job->display_image) : Storage::url('images/external/' . $job->display_image));
            }
            if (!empty($job->source_url)) {
                $logo = '#';
                if ($job->source_type == SourceType::API->value) {
                    $logo = Storage::url('images/sources/' . $job->apiSource->logo);
                    $job->source = $job->apiSource;
                } else {
                    $logo = Storage::url('images/sources/' . $job->scrapeSource->logo);
                    $job->source = $job->scrapeSource;
                }
                $job->source_logo = $logo;
            }
        }

        $filters = [
            'categories' => JobCategory::all(),
            'types' => JobType::all(),
            'companies' => Company::whereNotNull('company_verified_at')->get(),
        ];

        return inertia('Jobs/JobsPage', [
            'translations' => $translations,
            'locale' => $locale,
            'jobs' => $jobs,
            'filters' => $filters,
            'perPage' => $perPage,
            'search' => $request->search,
            'category' => $request->category,
            'company' => $request->company,
            'internal' => $request->internal,
            'current_order' => $order,
            'types' => $request->type,
            'activeLink' => 'Jobs'
        ]);
    }
    public function details(string $id)
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('jobs', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)]
        );

        $job = Job::where(['id' => $id])->with(['jobCategory', 'jobTypes', 'company'])->first();

        if (empty($job)) abort(404);

        $job->display_image = empty($job->source_url) ? Storage::url('images/companies/' . $job->display_image) : Storage::url('images/external/' . $job->display_image);
        $similars = Job::latest()->where(['job_category_id' => $job->job_category_id])->whereNot('id', $id)->limit(6)->get();

        foreach ($similars as $similar) {
            $similar->display_image = empty($similar->source_url) ? Storage::url('images/companies/' . $similar->display_image) : Storage::url('images/external/' . $similar->display_image);
        }

        $alreadyApplied = empty(auth()->user()) ? false : JobApplication::where(['user_id' => auth()->user()->id, 'job_id' => $id])->count() > 0;

        return inertia('Jobs/JobDetails', [
            'status' => session('status'),
            'translations' => $translations,
            'job' => $job,
            'locale' => $locale,
            'activeLink' => 'Jobs',
            'similars' => $similars,
            'alreadyApplied' => $alreadyApplied,
        ]);
    }
}
