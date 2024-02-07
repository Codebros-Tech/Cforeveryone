<?php

namespace App\Http\Resources;

use App\Models\Code;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // should contain the user information
        // the code information
        // and lastly the comment text
        return [
            'user' => new UserResource(User::find($this->user_id)),
            'comment' => $this->body,
            'createdAt' => $this->created_at,
        ];
    }
}
