<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class,'logout']);
    // Route::apiResource('surveys', SurveyController::class);
    Route::post('/me', [AuthController::class, 'me']);
    Route::delete('/user', [AuthController::class, 'delete']);

    // Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
// Route::get('/surveys/public/{survey:slug}', [SurveyController::class, 'getBySlug']);
// Route::post('/surveys/{survey:id}/answer', [SurveyController::class, 'storeAnswer']);
