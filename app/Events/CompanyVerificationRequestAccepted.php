<?php

namespace App\Events;

use App\Models\CompanyVerificationRequest;
use App\Models\JobApplication;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CompanyVerificationRequestAccepted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The newly job application instance.
     *
     * @var CompanyVerificationRequest
     */
    public $companyVerificationRequest;

    /**
     * Create a new event instance.
     */
    public function __construct(CompanyVerificationRequest $companyVerificationRequest)
    {
        $this->companyVerificationRequest = $companyVerificationRequest;
    }
}
