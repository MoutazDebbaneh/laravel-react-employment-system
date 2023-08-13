<?php

namespace App\Http\Controllers;

use App;
use App\Enums\Role;
use App\Http\Requests\JobRequest;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\JobCategory;
use App\Models\JobType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Lang;
use Redirect;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        $categories = JobCategory::all();
        $types = JobType::all();

        return Inertia::render('Dashboard/Company/Jobs/NewJob', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Jobs',
            'categories' => $categories,
            'types' => $types
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobRequest $request)
    {
        $data = $request->validated();
        $company = auth()->user()->company;
        $job = new Job($data);

        $job->setAttribute('job_category_id', $data['job_category_id']);
        $company->jobs()->save($job);
        $job = $company->jobs()->latest()->first();

        $type_ids = $data['job_types'];
        $job->jobTypes()->attach($type_ids);
        $job->save();

        info('Job added');

        return Redirect::route('company.info');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        $categories = JobCategory::all();
        $types = JobType::all();
        $job = Job::where(['id' => $id])->with(['jobCategory', 'jobTypes', 'company'])->first();
        if (empty($job)) abort(404);

        return Inertia::render('Dashboard/Company/Jobs/EditJob', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Jobs',
            'categories' => $categories,
            'types' => $types,
            'job' => $job,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobRequest $request, string $id)
    {
        $data = $request->validated();

        $job = Job::where(['id' => $id])->first();
        if (empty($job)) {
            return abort(404);
        }

        $job->setAttribute('job_category_id', $data['job_category_id']);
        $job->fill($data);

        $type_ids = $data['job_types'];
        $types = JobType::whereIn('id', $type_ids)->get();
        $job->jobTypes()->sync($types);
        $job->save();

        info('Job edited');

        return Redirect::route('company.jobs');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = Job::where(['id' => $id])->first();
        $job->delete();
        return Redirect::route('company.info');
    }
    public function apply(string $id)
    {
        $user = auth()->user();
        $profile = $user->userProfile;
        $job = Job::where(['id' => $id])->first();
        if (empty($job)) abort(404);
        if (JobApplication::where(['job_id' => $id, 'user_id' => $user->id])->count() > 0) abort(401);
        $required_attributes = [
            'bio',
            'gender',
            'country',
            'city',
            'address',
            'current_position',
            'education_level'
        ];
        foreach ($required_attributes as $att) {
            if ($profile->getAttribute($att) === null) {
                dd($att);
                return abort(403);
            }
        }
        $application = new JobApplication();
        $application->setAttribute('user_id', $user->id);
        $application->setAttribute('job_id', $job->id);
        $application->save();
        return Redirect::back()->with('status', 'applied');
    }
}
