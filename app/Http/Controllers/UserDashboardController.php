<?php

namespace App\Http\Controllers;

use App;
use App\Models\JobApplication;
use App\Models\JobCategory;
use App\Models\Language;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Lang;

class UserDashboardController extends Controller
{
    public function index()
    {
        return redirect()->action([UserDashboardController::class, 'info']);
    }
    public function info(Request $request)
    {
        $locale = App::getLocale();
        $translations = array_merge(
            Lang::get('dashboard-links', [], $locale),
            Lang::get('navbar', [], $locale),
            ['content' => Lang::get('user-info', [], $locale),]
        );

        return Inertia::render('Dashboard/Common/UserInfo/UserInfo', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'activeLink' => 'UserInfo',
            'translations' => $translations,
        ]);
    }
    public function profile()
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('dashboard-links', [], $locale),
            Lang::get('navbar', [], $locale),
        );

        $profile = auth()->user()->userProfile;
        $profile_skills = $profile->skills->toArray();
        $profile_languages = $profile->languages->toArray();
        $experiences = $profile->experiences->toArray();
        $educations = $profile->educations->toArray();
        $courses = $profile->courses->toArray();
        $profile_categories = $profile->categories->toArray() ?? [];
        $socialLink = $profile->socialLink;

        return Inertia::render('Dashboard/User/Profile/UserProfile', [
            'status' => session('status'),
            'activeLink' => 'UserProfile',
            'translations' => $translations,
            'langs' => Language::all(),
            'profile' => $profile,
            'profile_skills' => array_column($profile_skills, 'name'),
            'profile_languages' => array_column($profile_languages, 'id'),
            'experiences' => $experiences,
            'educations' => $educations,
            'courses' => $courses,
            'socialLink' => $socialLink,
            'profile_categories' => $profile_categories,
            'categories' => JobCategory::all()->toArray()
        ]);
    }
    public function applications()
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('dashboard-links', [], $locale),
            Lang::get('navbar', [], $locale),
        );

        $applications = JobApplication::where(['user_id' => auth()->user()->id])->with(['job', 'job.company'])->get();

        return Inertia::render('Dashboard/User/AppliedJobs/AppliedJobs', [
            'status' => session('status'),
            'activeLink' => 'AppliedJobs',
            'translations' => $translations,
            'applications' => $applications,
        ]);
    }
}
