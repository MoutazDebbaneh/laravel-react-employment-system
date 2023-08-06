<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Events\JobApplicationCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleJobApplicationCreated
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  JobApplicationCreated  $event
     * @return void
     */
    public function handle(JobApplicationCreated $event)
    {
        $application = $event->jobApplication;
        $company_user = $application->job->company->user;
        $company_user->notifications()->create([
            'type' => strval(NotificationType::ApplicationSubmitted->value),
            'related_id' => $application->id
        ]);
    }
}
