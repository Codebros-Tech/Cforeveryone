<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class CodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // for each of the codes, we are going to send the number of likes of the code.
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'text' => $this->text,
            'errorImage' => URL::to($this->errorImage),
            'user' => new UserResource(User::find($this->user_id)),
            'createdAt' => $this->created_at,
            // send the number of likes of the code
            'likes' => $this->likes()->where('state', '=', 1)->count(),
            // send the number of comments on this code
            'comments' => $this->comments()->count(),
            // calculate the number of suggestions made on this code.
            'suggestions' => 0,
            // returns true if the current user has ligked this code.
            'userLikeStatus' => $this->likes()->where('user_id', '=', $request->user()->id)->first(),
        ];
    }
}
