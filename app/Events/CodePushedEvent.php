<?php

namespace App\Events;

use App\Models\Code;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


// Laravel will automatically broadcast any event classes that implement the ShouldBroadcast Method.
class CodePushedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    private Code $code;

    public function __construct()
    {
//        $this->code = $code;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn()
    {
//        return [
//            new Channel('public_code'),
//        ];

        return new Channel('public.code.1');
    }

    public function broadcastAs()
    {
        return 'code';
    }

    public function broadcastWith()
    {
        return [
            'hello' => 'Nothing interesting'
        ];
    }
}
