<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request) {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token'=> $token,
        ]);
    }

    public function login(LoginRequest $request) {
        // retrieve the validated credentials
        $credentials = $request->validated();

        // removing the remember option from the data
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => "The provided credentials are not correct",
            ], 422);
        }

        // reaches this point if the authentication was successful

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout() {
        /** @var User $user */
        $user = Auth::user();

        $user->currentAccessToken->delete();

        return response([
            'success' => true,
        ]);
    }

    public function me(Request $request) {
        return $request->user();
    }
}
