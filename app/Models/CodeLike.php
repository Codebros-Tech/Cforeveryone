<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code_id',
        'state',
    ];

    public function code() {
        return $this->belongsTo(Code::class);
    }

    public function user() {
        $this->belongsTo(User::class);
    }
}
