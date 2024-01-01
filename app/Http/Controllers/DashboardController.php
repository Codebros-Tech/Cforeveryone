<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\CodeSolution;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request) {
        // calculate the number of codes the user has posted
        $codesNumber = Code::all()->where('user_id', $request->user()->id)->count();
        // calculate the number of problems the user has solved
        $solutionNumber = CodeSolution::all()->where('user_id', $request->user()->id)->count();

        // return all this variables via our json request.
        return response([
            'codesNum' => $codesNumber,
            'solutionNum' => $solutionNumber,
        ]);
    }
}
