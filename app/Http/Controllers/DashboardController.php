<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\CodeComment;
use App\Models\CodeLike;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request) {
        // calculate the number of codes the user has posted
        $codesNumber = Code::all()->where('user_id', $request->user()->id)->count();

        // show the user the number of code likes they have gotten
        $totalLikes = CodeLike::all()->where('user_id', $request->user()->id)->count();

        // totalC
        $totalComments = CodeComment::all()->where('user_id', $request->user()->id)->count();

        $quizesTaken = 1;

        // return all this variables via our json request.
        return response([
            'codesNum' => $codesNumber,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'quizesTaken' => $quizesTaken,
        ]);
    }
}
