<?php

namespace App\Listeners;

use App\Enums\NotificationType;
use App\Events\JobAdded;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleJobAdded
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  JobAdded  $event
     * @return void
     */
    public function handle(JobAdded $event)
    {
        $job = $event->job;
        $categoryID = $job->getAttribute('job_category_id');

        $users = User::whereHas('userProfile.categories', function ($query) use ($categoryID) {
            $query->where('job_categories.id', $categoryID);
        })->get();

        foreach ($users as $user) {
            $user->notifications()->create([
                'type' => strval(NotificationType::JobAdded->value),
                'related_id' => $job->id
            ]);
            info('JobAdded Notification sent');
        }
    }
}
