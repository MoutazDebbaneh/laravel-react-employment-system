<?php

namespace App\Http\Controllers;

use App;
use App\Events\JobApplicationAccepted;
use App\Events\JobApplicationDeclined;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Lang;
use Storage;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($job_id)
    {
        $job = Job::find($job_id);
        if (empty($job)) return abort(404);
        $company = auth()->user()->company;
        if ($job->company->id != $company->id) return abort(401);
        $applications = JobApplication::where('job_id', $job_id)->whereNull('accepted')->with('user', 'user.userProfile')->get();
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        foreach ($applications as $application) {
            $application->user->userProfile->profile_picture =
                Storage::url(
                    'images/users/' . $application->user->userProfile->profile_picture
                );
        }

        return Inertia::render('Dashboard/Company/Applications/ApplicationsList', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Jobs',
            'applications' => $applications,
            'job' => $job
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $application = JobApplication::find($id)
            ->with([
                'job', 'user', 'user.userProfile',
                'user.userProfile.languages', 'user.userProfile.courses',
                'user.userProfile.experiences', 'user.userProfile.educations',
                'user.userProfile.skills', 'user.userProfile.socialLink'
            ])->first();
        if (empty($application) || $application->accepted !== null) return abort(404);
        $application->user->userProfile->profile_picture =
            Storage::url(
                'images/users/' . $application->user->userProfile->profile_picture
            );
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        return Inertia::render('Dashboard/Company/Applications/Application', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Jobs',
            'application' => $application,
        ]);
    }

    public function applicationAction(Request $request)
    {
        $id = $request->input('id');
        $action = $request->input('action');
        if ($id === null || $action === null) return abort(400);
        $application = JobApplication::where(['id' => $id])->with('job')->get()->first();
        if (empty($application)) return abort(404);
        $action_value = intval($action);
        $application->accepted = $action_value;
        $application->save();
        if ($action_value == 1) {
            event(new JobApplicationAccepted($application));
        } else {
            event(new JobApplicationDeclined($application));
        }
        return redirect('/company/jobs/' . strval($application->job->id) . '/applications');
    }
}
