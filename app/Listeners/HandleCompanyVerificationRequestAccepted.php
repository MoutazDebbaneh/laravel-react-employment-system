<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Events\CompanyVerificationRequestAccepted;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleCompanyVerificationRequestAccepted
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  CompanyVerificationRequestAccepted  $event
     * @return void
     */
    public function handle(CompanyVerificationRequestAccepted $event): void
    {
        $user = $event->companyVerificationRequest->company->user;
        $user->notifications()->create([
            'type' => strval(NotificationType::CompanyVerificationRequestAccepted->value),
            'related_id' => $event->companyVerificationRequest->id
        ]);
    }
}
