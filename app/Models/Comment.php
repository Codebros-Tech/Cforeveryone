<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'body',
        'commentable_id',
        'commentable_type',
        'created_at',
        'updated_at'
    ];

    // get the parent's commentable model, code or user or comment
    public function commentable(): MorphTo {
        return $this->morphTo();
    }
}
