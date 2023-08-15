<?php

namespace App\Providers;

use App\Events\CompanyVerificationRequestAccepted;
use App\Events\CompanyVerificationRequestSent;
use App\Events\JobApplicationAccepted;
use App\Events\JobApplicationCreated;
use App\Events\JobApplicationDeclined;
use App\Events\UserCreated;
use App\Events\JobAdded;
use App\Listeners\HandleUserCreation;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Listeners\HandleCompanyVerificationRequestSent;
use App\Listeners\HandleCompanyVerificationRequestAccepted;
use App\Listeners\HandleJobAdded;
use App\Listeners\HandleJobApplicationAccepted;
use App\Listeners\HandleJobApplicationCreated;
use App\Listeners\HandleJobApplicationDeclined;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        UserCreated::class => [
            HandleUserCreation::class,
        ],
        CompanyVerificationRequestSent::class => [
            HandleCompanyVerificationRequestSent::class,
        ],
        CompanyVerificationRequestAccepted::class => [
            HandleCompanyVerificationRequestAccepted::class,
        ],
        JobApplicationCreated::class => [
            HandleJobApplicationCreated::class,
        ],
        JobApplicationAccepted::class => [
            HandleJobApplicationAccepted::class,
        ],
        JobApplicationDeclined::class => [
            HandleJobApplicationDeclined::class,
        ],
        JobAdded::class => [
            HandleJobAdded::class,
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
