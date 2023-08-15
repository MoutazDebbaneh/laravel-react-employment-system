<?php

namespace App\Events;

use App\Models\Job;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JobAdded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The newly created user instance.
     *
     * @var Job
     */
    public $job;

    /**
     * Create a new event instance.
     */
    public function __construct(Job $job)
    {
        $this->job = $job;
    }
}
