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
            $relativePath = $this->saveImage($data['image']);
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

    private function saveImage($image) {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type )) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);

            if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception("base 64 decode failed");
            }
        } else {
            throw new \Exception("did not match the data url with the image data");
        }

        $dir = 'images/profiles/';
        $file = Str::random() . '.'. $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
