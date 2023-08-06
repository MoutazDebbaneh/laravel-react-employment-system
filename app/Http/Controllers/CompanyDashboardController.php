<?php

namespace App\Http\Controllers;

use App;
use App\Http\Requests\CompanyInformationUpdateRequest;
use App\Models\CompanyVerificationRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Lang;
use Redirect;
use Request;

class CompanyDashboardController extends Controller
{
    public function info()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        $company = auth()->user()->company;

        if (!empty($company->company_verified_at)) {
            session()->put('status', 'verified');
        } else if (!empty(CompanyVerificationRequest::where('company_id', $company->id)->count())) {
            session()->put('status', 'verification-request-sent');
        }

        $verificationError = '';

        if (!empty(session('verificationError'))) {
            $verificationError = session()->remove('verificationError');
        }

        return Inertia::render('Dashboard/Company/CompanyInformation/CompanyInformation', [
            'status' => session('status'),
            'verificationError' => $verificationError,
            'translations' => $translations,
            'activeLink' => 'CompanyInformation',
            'company' => $company,
        ]);
    }

    public function updateCompanyInformation(CompanyInformationUpdateRequest $request): RedirectResponse
    {

        $data = $request->validated();

        // Handle Profile Picture
        if (empty($data['logo'])) {
            unset($data['logo']);
        } else {
            $file = $request->file('logo');
            $savedFile = $file->store('public/images/companies');
            $data['logo'] = basename($savedFile);
        }

        $company = $request->user()->company;
        $company->fill($data)->save();

        info('Company Information updated');

        return Redirect::route('company.info');
    }

    public function sendVerificationRequest(Request $request): JsonResponse|RedirectResponse
    {
        $company = auth()->user()->company;
        if (empty($company) || !empty($company->company_verified_at)) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        if (
            empty($company->name) || empty($company->phone)
            || empty($company->headquarters) || empty($company->email)
            || empty($company->website)
        ) {
            session()->put('verificationError', 'You must complete your company information first.');
            return back();
        }

        $count = CompanyVerificationRequest::where('company_id', $company->id)->count();

        if (!empty($count) && $count > 0) return back();

        $companyVerificationRequest = new CompanyVerificationRequest();

        $company->companyVerificationRequest()->save($companyVerificationRequest);

        session()->put('status', 'verification-request-sent');

        return back();
    }

    public function jobs()
    {
        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        $jobs = auth()->user()->company->jobs;

        return Inertia::render('Dashboard/Company/Jobs/Jobs', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Jobs',
            'jobs' => $jobs,
        ]);
    }
}
