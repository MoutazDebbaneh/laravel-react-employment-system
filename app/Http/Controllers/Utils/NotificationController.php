<?php

namespace App\Http\Controllers\Utils;

use App\Enums\NotificationType;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class NotificationController extends Controller
{

    public function index()
    {
        $unread_notifications = auth()->user()->notifications->where('is_read', false)->all();
        foreach ($unread_notifications as $unread_notification) {
            $unread_notification->setAttribute('is_read', true);
            $unread_notification->save();
        }
        $notifications = auth()->user()->notifications;

        foreach ($notifications as $notification) {
            $related_url = '#';
            switch ($notification->type) {
                case NotificationType::ApplicationSubmitted->value:
                    $related_url = route('company.application.show', $notification->related_id);
                    break;
                case NotificationType::ApplicationAccepted->value:
                    // TODO after applied jobs implementation
                    break;
                case NotificationType::ApplicationDeclined->value:
                    // TODO after applied jobs implementation
                    break;
                case NotificationType::NewJob->value:
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

        $locale = App::getLocale();
        $translations = Lang::get('navbar', [], $locale);
        return Inertia::render('Dashboard/Common/Notifications/Notifications', [
            'status' => session('status'),
            'translations' => $translations,
            'activeLink' => 'Notifications',
            'notifications' => $notifications,
        ]);
    }
    public function markRead()
    {
        $unread_notifications = auth()->user()->notifications->where('is_read', false)->all();
        foreach ($unread_notifications as $unread_notification) {
            $unread_notification->setAttribute('is_read', true);
            $unread_notification->save();
        }
        return redirect()->back();
    }
}
