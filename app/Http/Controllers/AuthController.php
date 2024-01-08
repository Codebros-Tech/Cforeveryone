<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function signup(SignupRequest $request) {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image'], 'images/profiles/');
            $data['image'] = $relativePath;
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'profile' => $data['image'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token'=> $token,
        ]);
    }

    public function login(LoginRequest $request) {
        // retrieve the validated credentials
        $credentials = $request->validated();

        // removing the remember option from the data
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => "The provided credentials are not correct",
            ], 422);
        }

        // reaches this point if the authentication was successful

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
        /** @var User $user */
        $token = $request->user()->currentAccessToken();
        $token->delete();

        return response([
            'success' => true,
        ]);
    }

    public function me(Request $request) {
        return new UserResource($request->user());
    }

    public function delete(Request $request) {
        // delete the user token,
        $user = $request->user();
        $token = $request->user()->currentAccessToken();
        $token->delete();

        // delete the image of the user
        if ($user->image) {
            if (File::exists($user->image)) {
                File::delete($user->image);
            }
        }

        // delete all of the user and everything the user has every created.

        // delete the user information
        $user->delete();

        return response('Delete successful', 200);
    }
}
