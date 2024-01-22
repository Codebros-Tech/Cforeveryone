<?php

namespace App\Events;

use App\Http\Resources\CodeResource;
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
    public String $action;

    public function __construct($code, $action)
    {
        $this->code = $code;
        $this->action = $action;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn()
    {

        return new Channel('public.code');
    }

    public function broadcastAs()
    {
        return 'code';
    }

    public function broadcastWith()
    {
        return match ($this->action) {
            'pushed' => [
                'code' => new CodeResource($this->code),
            ],
            'deleted' =>  [
                'id' => $this->code->id,
            ],
            default => [],
        };
    }
}
