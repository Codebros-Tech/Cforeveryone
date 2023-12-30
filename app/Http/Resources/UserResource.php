<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'matricule' => $this->matricule,
            'department' => $this->department,
            'level' => $this->level,
            'school' => $this->school,
            'username' => $this->username,
            'profile' => URL::to($this->profile),
        ];
    }
}
