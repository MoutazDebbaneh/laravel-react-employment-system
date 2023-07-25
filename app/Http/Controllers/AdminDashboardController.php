<?php

namespace App\Http\Controllers;

use App;
use App\Models\CompanyVerificationRequest;
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
        $verification_request->is_accepted = intval($action);
        $verification_request->save();
        $verification_request->company->company_verified_at = now();
        $verification_request->company->save();
        return back();
    }
}
