
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Models\Code;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::get('/chat', function () {
    event(new \App\Events\ChatMessageEvent());
    return "chat message";
});

Route::get('/share-video', function () {
    return "video Sharing";
})->name('share-video');


Route::get('/server-created', function (Request $request) {
    \App\Events\ServerCreated::dispatch($request->user());
});

Route::get('/newmessage', function () {
    broadcast(\App\Events\NewMessageEvent::class);
    return null;
});

Route::get('/user/notifications', [\App\Http\Controllers\HomeController::class, 'getUserNotifications']);
