<?php

namespace App\Listeners;

use App\Enums\Role;
use App\Events\UserCreated;
use App\Models\Company;
use App\Models\UserProfile;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleUserCreation implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  UserCreated  $event
     * @return void
     */
    public function handle(UserCreated $event)
    {
        $user = $event->user;
        if (intval($user->role) == Role::User->value) {
            $profile = new UserProfile();
            $user->userProfile()->save($profile);
        } else if (intval($user->role) == Role::Company->value) {
            $company = new Company();
            $user->company()->save($company);
        }
    }
}
