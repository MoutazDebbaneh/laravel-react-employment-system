<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CompanyVerificationRequestSent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $verificationRequest;

    /**
     * Create a new event instance.
     */
    public function __construct($verificationRequest)
    {
        $this->verificationRequest = $verificationRequest;
    }
}
