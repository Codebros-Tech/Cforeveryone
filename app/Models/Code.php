<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
}
