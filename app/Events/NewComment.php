<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class NewComment
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

//    public CodeComment $comment;

    /**
     * Create a new event instance.
     */
//    public function __construct(CodeComment $comment)
//    {
//        $this->comment = $comment;
//    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            // every single code post is going to be on a single channel.
            new Channel('post.'. $comment->post->id),
        ];
    }
}
