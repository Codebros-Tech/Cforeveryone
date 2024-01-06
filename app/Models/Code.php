<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function user() {
        $this->belongsTo(User::class, 'user_id');
    }

    public function comments() {
        return $this->hasMany(CodeComment::class);
    }

    public function likes() {
        return $this->hasMany(CodeLike::class);
    }

    public function likesByUser($userId) {
        return $this->hasMany(CodeLike::class)->where('user_id', $userId);
    }
}
