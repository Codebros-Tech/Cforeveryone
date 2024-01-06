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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'text' => $this->text,
            'errorImage' => URL::to($this->errorImage),
            'user' => new UserResource(User::find($this->user_id)),
            'createdAt' => new \DateTime($this->createdAt),
            'like' => $this->likesByUser($request->user()->id),
        ];
    }
}
