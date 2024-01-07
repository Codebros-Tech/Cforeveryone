<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeCommentController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\CodeLikeController;
use App\Http\Controllers\DashboardController;
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
    Route::apiResource('codes', CodeController::class);
    Route::get('/codes/mycodes', [CodeController::class, 'mycodes']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::delete('/user', [AuthController::class, 'delete']);

    Route::get('/dashboard', [DashboardController::class, 'index']);


    // things related to a user.
    Route::get('/users', [HomeController::class, 'users']);

    Route::apiResource('/codes/{code:id}/comments', CodeCommentController::class);

    Route::get('/codes/{code:id}/likes', [CodeController::class, 'getLikeState']);
    Route::post('/codes/{code:id}/like', [CodeController::class, 'changeLikeState']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

