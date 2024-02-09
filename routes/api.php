<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
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
    // this means that it should execute the /codes/mine route first.
    Route::get('/codes/mine', [CodeController::class, 'codes']);
    Route::apiResource('codes', CodeController::class);
    Route::post('/me', [AuthController::class, 'me']);
    Route::delete('/user', [AuthController::class, 'delete']);

    Route::get('/dashboard', [DashboardController::class, 'index']);


    // things related to a user.
    Route::get('/users', [HomeController::class, 'users']);
    Route::get('/users', [HomeController::class, 'users']);

    // comment routes section
    Route::get('/codes/{code:id}/comments', [CodeController::class, 'comments']);
    Route::post('/codes/{code:id}/comments', [CodeController::class, 'comment']);

    Route::get('/codes/{code:id}/likes', [CodeController::class, 'getLikeState']);
    Route::post('/codes/{code:id}/like', [CodeController::class, 'changeLikeState']);

    Route::post('/contact', [HomeController::class, 'contact']);


});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

