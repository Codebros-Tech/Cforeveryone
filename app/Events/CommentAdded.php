<?php

namespace App\Events;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentAdded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Comment $comment;
    public int $codeId;

    /**
     * Create a new event instance.
     */
    public function __construct($codeId ,Comment $comment)
    {
        $this->comment = $comment;
        $this->codeId = $codeId;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('public.code.'.$this->codeId.'.comment'),
        ];
    }

    public function broadcastAs(): string {
        return 'comment';
    }

    public function broadcastWith() {
        return [
            'comment' => new CommentResource($this->comment),
        ];
    }
}
