
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

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

Route::get('/share-video', function () {
    return "video Sharing";
})->name('share-video');

if (\Illuminate\Support\Facades\App::environment('local')) {
    Route::get('/playground', function () {

        event(new \App\Events\PlaygroundEvent());

        $url = URL::temporarySignedRoute( 'share-video', now()->addSecond(30), [
            'video' => 123
        ]);

        return $url;
    });

    Route::get('/codelaunch', function () {

        event(new \App\Events\CodePushedEvent());

        return null;
    });

    Route::get('/ws', function () {
        return view('websocket');
    });
}


