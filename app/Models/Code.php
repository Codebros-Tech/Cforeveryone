<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Code extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'text',
        'errorImage',
        'user_id'
    ];

    public function user(): BelongsTo {
        $this->belongsTo(User::class);
    }

    public function comments(): HasMany {
        return $this->hasMany(CodeComment::class);
    }

    public function likes(): HasMany {
        return $this->hasMany(CodeLike::class);
    }

    public function likesByUser($userId): HasMany {
        return $this->hasMany(CodeLike::class)->where('user_id', $userId);
    }

    public function suggestions(): HasMany {
        $this->hasMany(CodeSuggestion::class);
    }

    // talking about automatically broadcasting the code.
    public function broadcastOn(string $event): array {
        // the event string contain the type of event that has occurred. This could be
        // created, updated, deleted, trashed, restored.
        return match($event) {
            'deleted' => [], // returns an array in the case of deleted.
            default => [$this, $this->user],
        };
    }
}
