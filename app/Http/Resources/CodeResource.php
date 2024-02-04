<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Traits\Date;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Ramsey\Uuid\Type\Time;

class CodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'text' => $this->text,
            'errorImage' => URL::to($this->errorImage),
            'user' => new UserResource(User::find($this->user_id)),
            'createdAt' =>$this->created_at,
            'likes' => $this->likes()->where('state', '=', 1)->count(),
            'comments' => $this->comments()->count(),
            'suggestions' => 0,
            'userLikeStatus' => $this->likes()->where('user_id', '=', $request->user()->id)->first(),
        ];
    }
}
