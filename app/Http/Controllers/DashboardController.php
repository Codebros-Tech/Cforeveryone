<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response {
        $user = User::find($request->user()->id);

        $codesNumber = $user->codes()->count();

        $totalLikes = 0;
        foreach ($user->codes() as $code) {
            $totalLikes += $code->likes()->count();
        }

        $totalComments = 0;
        foreach ($user->codes() as $comments) {
            $totalLikes += $comments->count();
        }

        $array = [
            'codesNum' => $codesNumber,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'quizesTaken' => 1,
        ];

        return response($array);
    }
}
