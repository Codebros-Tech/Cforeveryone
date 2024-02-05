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

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
    // in the case of presence channel, we will return but the user information.
});

Broadcast::channel('private.chat.{id}', function (User $user, $id) {
    // this means the currently logged in user is always allowed to join the channel.
    return true;
});
