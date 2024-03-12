<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Suggestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'code_id',
        'text',
    ];

    public function code(): BelongsTo {
        return $this->belongsTo(Code::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
