<?php

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function set($locale)
    {
        if (in_array($locale, config('app.available_locales'))) {
            App::setLocale($locale);
            session()->put('locale', App::getLocale());
        }
        return redirect()->back();
    }
}
