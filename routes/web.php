<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\Pages\JobsPageController;
use App\Http\Controllers\Utils\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Utils\NotificationController;
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
Route::middleware(['notadmin'])->get('/', [HomeController::class, 'test'])->name('new-home');

Route::get('/jobs', [JobsPageController::class, 'index'])->name('jobs');

Route::get('/jobs/{id}', [JobsPageController::class, 'details'])->name('jobs.details')->whereNumber('id');

Route::middleware(['auth', 'user', 'verified'])->get('/jobs/{id}/apply', [JobController::class, 'apply'])->name('jobs.apply');

Route::middleware(['auth'])->post('/notifications/read', [NotificationController::class, 'markRead'])->name('notifications.markRead');

Route::get('/language/set/{locale}', [LanguageController::class, 'set'])->name('language.set')->whereAlpha('locale');

Route::middleware('auth')->group(function () {

    Route::get('/user/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/user/info', [UserDashboardController::class, 'info'])->name('user.info');
    Route::get('/user/notifications', [NotificationController::class, 'index'])->name('user.notifications');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::middleware('notadmin')->group(function () {
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/user/personal-info/update', [UserProfileController::class, 'updatePersonalInformation'])->name('user.updatePersonalInformation');
        Route::patch('/user/about/update', [UserProfileController::class, 'updateAbout'])->name('user.updateAbout');
        Route::patch('/user/experiences/update', [UserProfileController::class, 'updateExperiences'])->name('user.updateExperiences');
        Route::patch('/user/educations/update', [UserProfileController::class, 'updateEducations'])->name('user.updateEducations');
        Route::patch('/user/courses/update', [UserProfileController::class, 'updateCourses'])->name('user.updateCourses');
    });

    Route::middleware('user')->group(function () {
        Route::get('/user/profile', [UserDashboardController::class, 'profile'])->name('user.profile');
        Route::get('/user/applications', [UserDashboardController::class, 'applications'])->name('user.applications');
        Route::post('/user/personal-info/update', [UserProfileController::class, 'updatePersonalInformation'])->name('user.updatePersonalInformation');
        Route::patch('/user/about/update', [UserProfileController::class, 'updateAbout'])->name('user.updateAbout');
        Route::patch('/user/experiences/update', [UserProfileController::class, 'updateExperiences'])->name('user.updateExperiences');
        Route::patch('/user/educations/update', [UserProfileController::class, 'updateEducations'])->name('user.updateEducations');
        Route::patch('/user/courses/update', [UserProfileController::class, 'updateCourses'])->name('user.updateCourses');
    });

    Route::middleware('company')->prefix('company')->group(function () {
        Route::middleware('verified')->get('/info', [CompanyDashboardController::class, 'info'])->name('company.info');
        Route::middleware('verified')->post('/info/update', [CompanyDashboardController::class, 'updateCompanyInformation'])->name('company.info.update');
        Route::middleware('verified')->post('/verify', [CompanyDashboardController::class, 'sendVerificationRequest'])->name('company.verify');
        Route::middleware(['verified', 'company.verified'])->get('/jobs', [CompanyDashboardController::class, 'jobs'])->name('company.jobs');
        Route::middleware(['verified', 'company.verified'])->get('/jobs/create', [JobController::class, 'create'])->name('company.jobs.create');
        Route::middleware(['verified', 'company.verified'])->post('/jobs/create', [JobController::class, 'store'])->name('company.jobs.store');
        Route::middleware(['verified', 'company.verified'])->get('/jobs/{id}/edit', [JobController::class, 'edit'])->name('company.jobs.edit')->whereNumber('id');
        Route::middleware(['verified', 'company.verified'])->patch('/jobs/{id}/edit', [JobController::class, 'update'])->name('company.jobs.update')->whereNumber('id');
        Route::middleware(['verified', 'company.verified'])->delete('/jobs/{id}/delete', [JobController::class, 'destroy'])->name('company.jobs.delete')->whereNumber('id');

        Route::middleware(['verified', 'company.verified'])->get('/jobs/{job_id}/applications', [JobApplicationController::class, 'index'])->name('company.job.applications')->whereNumber('job_id');
        Route::middleware(['verified', 'company.verified'])->get('/applications/{id}', [JobApplicationController::class, 'show'])->name('company.application.show')->whereNumber('id');
        Route::middleware(['verified', 'company.verified'])->post('/application/handle', [JobApplicationController::class, 'applicationAction'])->name('company.application.action');
    });

    Route::prefix('admin')->group(function () {
        Route::get('/requests', [AdminDashboardController::class, 'requests'])->name('admin.requests');
        Route::post('/request/handle', [AdminDashboardController::class, 'requestAction'])->name('admin.request.action');
    });
});


require __DIR__ . '/auth.php';
