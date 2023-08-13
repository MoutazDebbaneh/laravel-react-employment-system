<?php

namespace App\Http\Controllers\Pages;

use App;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Lang;
use Storage;

class CompaniesPageController extends Controller
{
    public function index(?Request $request)
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('companies', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)]
        );

        $perPage = 10; // number of companies to display per page
        $page = $request->query('page', 1);
        $query = Company::query()->whereNotNull('company_verified_at');

        // apply filters based on request parameters

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $order = $request->query('order', 'newest');
        if (!in_array($order, ['newest', 'oldest'])) $order = 'newest';

        $companies = $query->orderBy('created_at', $order === 'newest' ? 'desc' : 'asc')->paginate($perPage, ['*'], 'page', $page);

        foreach ($companies as $company) {
            $company->logo = Storage::url('images/companies/' . $company->logo);
        }

        return inertia('Companies/CompaniesPage', [
            'translations' => $translations,
            'locale' => $locale,
            'companies' => $companies,
            'perPage' => $perPage,
            'search' => $request->search,
            'current_order' => $order,
            'activeLink' => 'Companies'
        ]);
    }
}
