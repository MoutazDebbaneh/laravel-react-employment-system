<?php

namespace App\Http\Controllers;

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
            'translations' => $translations,
        ]);
    }
    public function test()
    {
        $locale = App::getLocale();
        $translations = ['navbar' => Lang::get('navbar', [], $locale)];

        return Inertia::render('Test/Test', [
            'translations' => $translations,
        ]);
    }
}
