<?php

namespace App\Http\Controllers;

use App;
use App\Events\CompanyVerificationRequestAccepted;
use App\Models\apiSource;
use App\Models\CompanyVerificationRequest;
use App\Models\ScrapeSource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Lang;
use Storage;

class AdminDashboardController extends Controller
{
    public function requests()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        $requests = CompanyVerificationRequest::where(['is_accepted' => null])->with('company')->get();

        foreach ($requests as $request) {
            $filename = $request->company->logo;
            $request->company->logo =
                Storage::url('images/companies/' . $filename);
        }

        return Inertia::render('Dashboard/Admin/CompaniesRequests/CompaniesRequests', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'CompaniesRequests',
            'requests' => $requests
        ]);
    }

    public function requestAction(Request $request)
    {
        $id = $request->input('id');
        $action = $request->input('action');
        if ($id === null || $action === null) return abort(400);
        $verification_request = CompanyVerificationRequest::where(['id' => $id])->with('company')->get()->first();
        if (empty($verification_request)) return abort(404);
        $action_value = intval($action);
        if ($action_value == 0) {
            $company = $verification_request->company;
            $user = $company->user;
            $verification_request->delete();
            $company->delete();
            $user->delete();
        } else {
            $verification_request->is_accepted = intval($action);
            $verification_request->save();
            $verification_request->company->company_verified_at = now();
            $verification_request->company->save();
            event(new CompanyVerificationRequestAccepted($verification_request));
        }

        return back();
    }

    public function scrapeSources()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        $sources = ScrapeSource::query()->with('scrapeSourceConfiguration')->get();

        foreach ($sources as $source) {
            $filename = $source->getAttribute('logo');
            $source->setAttribute('logo', Storage::url('images/sources/' . $filename));
        }

        return Inertia::render('Dashboard/Admin/Sources/ScrapeSources', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'ScrapeSources',
            'sources' => $sources
        ]);
    }

    public function deleteScrapeSource(string $id)
    {
        $scrapeSource = ScrapeSource::where(['id' => $id])->with('scrapeSourceConfiguration', 'jobs')->first();
        if (empty($scrapeSource)) return abort(404);
        $scrapeSource->jobs->delete();
        $scrapeSource->scrapeSourceConfiguration->delete();
        $scrapeSource->delete();
        return back();
    }

    public function editScrapeSource(string $id)
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        $scrapeSource = ScrapeSource::where(['id' => $id])->with('scrapeSourceConfiguration')->first();
        if (empty($scrapeSource)) return abort(404);

        return Inertia::render('Dashboard/Admin/Sources/ScrapeSourceForm', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'ScrapeSources',
            'source' => $scrapeSource
        ]);
    }
    public function addScrapeSource()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        return Inertia::render('Dashboard/Admin/Sources/ScrapeSourceForm', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'ScrapeSources',
        ]);
    }
    public function apiSources()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        $sources = apiSource::query()->with('apiSourceConfiguration')->get();

        foreach ($sources as $source) {
            $filename = $source->getAttribute('logo');
            $source->setAttribute('logo', Storage::url('images/sources/' . $filename));
        }

        return Inertia::render('Dashboard/Admin/Sources/APISources', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'APISources',
            'sources' => $sources
        ]);
    }

    public function deleteAPISource(string $id)
    {
        $apiSource = apiSource::where(['id' => $id])->with('apiSourceConfiguration', 'jobs')->first();
        if (empty($apiSource)) return abort(404);
        $apiSource->jobs->delete();
        $apiSource->apiSourceConfiguration->delete();
        $apiSource->delete();
        return back();
    }

    public function editAPISource(string $id)
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        $apiSource = apiSource::where(['id' => $id])->with('apiSourceConfiguration')->first();
        if (empty($apiSource)) return abort(404);

        return Inertia::render('Dashboard/Admin/Sources/APISourceForm', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'APISources',
            'source' => $apiSource
        ]);
    }
    public function addAPISource()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);

        return Inertia::render('Dashboard/Admin/Sources/APISourceForm', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'APISources',
        ]);
    }
}
