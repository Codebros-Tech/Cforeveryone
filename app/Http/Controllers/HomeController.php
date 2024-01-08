<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        return response("Hello world", 200);
    }

    public function users() {
        // retrieving and displaying all of the users of the application
        $users = User::all();

        return response([
            'users' => UserResource::collection($users),
        ]);
    }

    public function contact(Request $request) {
        $data = $request->validate([
            "name" => "string|required",
            "description" => "string|required",
        ]);

        $contact = Contact::create($data);

        if ($contact) {
            return response("Contact Created", 200);
        } else {
            return response("Error durring creation of the contact message", 500);
        }
    }
}
