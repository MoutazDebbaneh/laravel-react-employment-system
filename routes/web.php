<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Pages\JobsController;
use App\Http\Controllers\Utils\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/', [HomeController::class, 'test'])->name('new-home');

Route::get('/jobs', [JobsController::class, 'index'])->name('jobs');

// Route::get('/user-info', [ProfileController::class, 'userInfo'])->name('user.info');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/language/set/{locale}', [LanguageController::class, 'set'])->name('language.set');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/user/info', [UserDashboardController::class, 'info'])->name('user.info');
    Route::get('/user/profile', [UserDashboardController::class, 'profile'])->name('user.profile');

    Route::post('/user/personal-info/update', [UserProfileController::class, 'updatePersonalInformation'])->name('user.updatePersonalInformation');
    Route::patch('/user/about/update', [UserProfileController::class, 'updateAbout'])->name('user.updateAbout');
    Route::patch('/user/experiences/update', [UserProfileController::class, 'updateExperiences'])->name('user.updateExperiences');
    Route::patch('/user/educations/update', [UserProfileController::class, 'updateEducations'])->name('user.updateEducations');
    Route::patch('/user/courses/update', [UserProfileController::class, 'updateCourses'])->name('user.updateCourses');

    Route::middleware('company')->prefix('company')->group(function () {
        Route::middleware('verified')->get('/info', [CompanyDashboardController::class, 'info'])->name('company.info');
        Route::middleware('verified')->post('/info/update', [CompanyDashboardController::class, 'updateCompanyInformation'])->name('company.info.update');
        Route::middleware('verified')->post('/verify', [CompanyDashboardController::class, 'sendVerificationRequest'])->name('company.verify');
    });

    Route::prefix('admin')->group(function () {
        Route::get('/requests', [AdminDashboardController::class, 'requests'])->name('admin.requests');
        Route::post('/request/handle', [AdminDashboardController::class, 'requestAction'])->name('admin.request.action');
    });
});


require __DIR__ . '/auth.php';
