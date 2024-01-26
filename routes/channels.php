<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Code;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// first argument of the callback function is the instance of the currently logged in user.
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    // determine whether the currently authenticated user can subscribe to this channel or not.
    return (int) $user->id === (int) $id;
});

//Broadcast::channel('private.codes.{codeId}', function (User $user, int $codeId) {
//    // first parammeters for this callback is the currently authenticated user.
////    return $user->id === Code::findOrNew($codeId)->user_id;
//});
