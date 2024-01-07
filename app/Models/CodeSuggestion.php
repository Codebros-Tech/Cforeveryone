<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeSuggestion extends Model
{
    use HasFactory;

    public function code() {
        $this->belongsTo(Code::class);
    }
}
