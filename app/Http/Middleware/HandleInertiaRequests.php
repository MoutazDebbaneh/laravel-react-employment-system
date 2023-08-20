<?php

namespace App\Http\Middleware;

use App\Enums\NotificationType;
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

        foreach ($user_notifications as $notification) {
            $related_url = '#';
            switch ($notification->type) {
                case NotificationType::ApplicationSubmitted->value:
                    $related_url = route('company.application.show', $notification->related_id);
                    break;
                case NotificationType::ApplicationAccepted->value:
                    $related_url = route('user.applications', $notification->related_id);
                    break;
                case NotificationType::ApplicationDeclined->value:
                    $related_url = route('user.applications', $notification->related_id);
                    break;
                case NotificationType::JobAdded->value:
                    $related_url = route('jobs.details', $notification->related_id);
                    break;
                case NotificationType::CompanyVerificationRequestSent->value:
                    $related_url = route('admin.requests');
                    break;
                case NotificationType::CompanyVerificationRequestAccepted->value:
                    $related_url = route('company.info');
                    break;
            }
            $notification->related_url = $related_url;
        }

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
