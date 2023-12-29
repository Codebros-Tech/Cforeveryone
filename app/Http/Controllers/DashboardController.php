<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    // public function index(Request $request) {

    //     $user = $request->user();

    //     // total number of surveys created by the user
    //     $totalSurveys = Survey::query()->where('user_id', $user->id)->count();

    //     // latest survey
    //     $latestSurvey = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

    //     // total number of answers
    //     $totalAnswers = SurveyAnswer::query()
    //                     ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
    //                     ->where('surveys.user_id', $user->id)
    //                     ->count();

    //     // getting the latest 5 answers
    //     $latestAnswers = SurveyAnswer::query()
    //         ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
    //         ->where('surveys.user_id', $user->id)
    //         ->orderBy('end_date', 'DESC')
    //         ->limit(5)
    //         ->getModels('survey_answers.*');

    //     return [
    //         'totalSurveys' => $totalSurveys,
    //         'latestSurvey' => $latestSurvey ? new SurveyResourceDashboard($latestSurvey) : null,
    //         'totalAnswers' => $totalAnswers,
    //         'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
    //     ];
    // }
}
