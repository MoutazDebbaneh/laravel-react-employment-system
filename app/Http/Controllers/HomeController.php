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

        $translations = array_merge(
            Lang::get('home', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)],
        );

        $categories = JobCategory::all();

        return Inertia::render('Home/Home', [
            'locale' => $locale,
            'translations' => $translations,
            'categories' => $categories,
            'activeLink' => 'Home'
        ]);
    }
    public function about()
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('home', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)],
        );

        return Inertia::render('AboutUs/AboutUs', [
            'locale' => $locale,
            'translations' => $translations,
            'activeLink' => 'About'
        ]);
    }
    public function terms()
    {
        $locale = App::getLocale();

        $translations = array_merge(
            Lang::get('home', [], $locale),
            ['navbar' => Lang::get('navbar', [], $locale)],
        );

        return Inertia::render('Terms/Terms', [
            'locale' => $locale,
            'translations' => $translations,
            'activeLink' => 'Terms'
        ]);
    }
}
