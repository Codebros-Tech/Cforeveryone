<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// adding ShouldBroadcast will automatically broadcast any event classes that includes the ShouldBroadcast interface.
class PlaygroundEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('public.playground.1'),
        ];
    }

    // changing the name that appears when we broadcast it
    public function broadcastAs()
    {
        return 'playground';
    }

    // data is attached using the broadcastWith method.
    public function broadcastWith()
    {
        return [
            'heya' => 123,
        ];
    }
}
