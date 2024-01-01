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
}
