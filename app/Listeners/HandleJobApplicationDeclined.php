<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Events\JobApplicationDeclined;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleJobApplicationDeclined
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  JobApplicationDeclined  $event
     * @return void
     */
    public function handle(JobApplicationDeclined $event)
    {
        $application = $event->jobApplication;
        $user = $application->user;
        $user->notifications()->create([
            'type' => strval(NotificationType::ApplicationDeclined->value),
            'related_id' => $application->id
        ]);
    }
}
