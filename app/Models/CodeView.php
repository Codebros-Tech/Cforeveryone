<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CodeView extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'code_id',
      'duration'
    ];

    public function code(): BelongsTo {
        return $this->belongsTo(Code::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

}
