<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Events\JobApplicationAccepted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleJobApplicationAccepted
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  JobApplicationAccepted  $event
     * @return void
     */
    public function handle(JobApplicationAccepted $event)
    {
        $application = $event->jobApplication;
        $user = $application->user;
        $user->notifications()->create([
            'type' => strval(NotificationType::ApplicationAccepted->value),
            'related_id' => $application->id
        ]);
    }
}
