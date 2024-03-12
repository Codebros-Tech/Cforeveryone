<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Like extends Model
{
    use HasFactory;

    public function users(): MorphToMany {
        return $this->morphToMany(User::class);
    }

    public function codes(): MorphToMany{
        return $this->morphToMany(Code::class);
    }



}
