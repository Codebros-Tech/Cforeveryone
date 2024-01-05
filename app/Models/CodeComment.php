<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code_id',
        'comment',
    ];


    public function code() {
        $this->belongsTo(Code::class);
    }
}
