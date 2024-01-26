<?php

namespace App\Events;

use App\Http\Resources\CodeResource;
use App\Models\Code;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
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
     * @return array
     */
    public function broadcastOn(): array
    {

        return [
            new PrivateChannel('private.codes'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'codes';
    }

    public function broadcastWith(): array
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
