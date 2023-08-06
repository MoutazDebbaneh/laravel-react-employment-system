<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Enums\Role;
use App\Events\CompanyVerificationRequestSent;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Notification;

class HandleCompanyVerificationRequestSent
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  CompanyVerificationRequestSent  $event
     * @return void
     */
    public function handle(CompanyVerificationRequestSent $event): void
    {
        $admins = User::whereIn('id', [Role::Admin->value, Role::Root_Admin->value])->get();
        foreach ($admins as $admin) {
            $admin->notifications()->create([
                'type' => strval(NotificationType::CompanyVerificationRequestSent->value),
                'related_id' => $event->verificationRequest->id
            ]);
        }
    }
}
