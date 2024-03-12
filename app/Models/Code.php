<?php

namespace App\Models;

use Cassandra\Map;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @method static create(array $array)
 */
class Code extends Model
{
    use BroadcastsEvents ,HasFactory;

    protected $fillable = [
        'title',
        'description',
        'text',
        'errorImage',
        'user_id'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    // implementing the things relating to comments
    // morphMany is used in the case of one to many polymorphic relationships
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function codeViews(): HasMany {
        return $this->hasMany(CodeView::class);
    }

    public function likes(): MorphToMany {
        return $this->morphToMany(Like::class);
    }


    /**
     * Provide us with the number of seconds that this user viewed the code for.
     * @return int
     */
    public function getViewDuration($user_id): int {
        $durationArray =  $this->codeViews()->where('user_id', $user_id)->get();
        if (isset($durationArray[0])) {
            return $durationArray[0]->duration;
        }
        return 0;
    }

    /** gets the number of users who commented on this code
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUsersWhoCommented():  \Illuminate\Database\Eloquent\Collection{
        return $this->comments()->where(['user_id'])->get();
    }



}
