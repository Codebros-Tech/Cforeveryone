<?php

use Illuminate\Support\Facades\Broadcast;

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

