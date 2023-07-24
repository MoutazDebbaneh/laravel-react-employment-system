<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;

class HomeController extends Controller
{
    public function index()
    {
        $locale = App::getLocale();
        $translations = ['navbar' => Lang::get('navbar', [], $locale)];

        return Inertia::render('Home/Home', [
            'translations' => $translations
        ]);
    }
    public function test()
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('home', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)]
        );

        $categories = JobCategory::all();

        return Inertia::render('Home/UserHome', [
            'translations' => $translations,
            'categories' => $categories,
            'activeLink' => 'Home'
        ]);
    }
}
