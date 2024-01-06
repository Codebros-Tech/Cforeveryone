<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\CodeLike;
use Illuminate\Http\Request;

class CodeLikeController extends Controller
{
    public function getState(Code $code, Request $request) {

    }

    public function changeState(Code $code, Request $request) {
        // $code will contain the code which are currently modifying.
        
    }
}
