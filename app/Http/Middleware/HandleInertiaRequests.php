<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;
use Storage;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $role = empty($user) ? null : $request->user()->role;
        $user_notifications = empty($user) ? [] : $user->notifications()->where('is_read', 0)->get();
        $profile_picture = empty($user) ? '' : ($role == Role::Company->value ?
            Storage::url('images/companies/' . $user->company->logo) :
            Storage::url('images/users/' . $user->userProfile->profile_picture)
        );

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'notifications' => $user_notifications,
                'profile_picture' => $profile_picture
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'locale' => App::getLocale(),
        ]);
    }
}
