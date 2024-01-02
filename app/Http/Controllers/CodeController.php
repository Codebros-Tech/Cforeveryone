<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Http\Requests\StoreCodeRequest;
use App\Http\Requests\UpdateCodeRequest;
use App\Http\Resources\CodeResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User $user */

        // the index method will return the everybodies code sorted by the date they were posted
        $codes = Code::all();

        return response([
            'codes' => CodeResource::collection($codes),
        ]);
    }

    public function mycodes(Request $request) {
        $user = $request->user();

        $codes = $user->codes();

        return CodeResource::collection($codes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCodeRequest $request)
    {
        $data = $request->validated();

        if (isset($data['errorImage'])) {
            $relativePath = $this->saveImage($data['errorImage'], 'images/codeLogs/');
            $data['errorImage'] = $relativePath;
        }

        $code = Code::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'text' => $data['text'],
            'description' => $data['description'],
            'errorImage' => $data['errorImage'],
        ]);

        return response([
            'code' => new CodeResource($code),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Code $code)
    {
        return response([
            'code' => new CodeResource($code),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCodeRequest $request, Code $code)
    {
        $updatedCode = $request->validated();

        // make sure you can only update a code which you posted
        if ($request->user()->id !== $code->user_id) {
            return abort(403, "Unauthorized Action");
        }

        // delete the old image if it exists
        if ($code->errorImage) {
            $absolutePath = public_path($code->errorImage);
            File::delete($absolutePath);
        }


        // replace the image
        if (isset($updatedCode['errorImage'])) {
            $relativePath = $this->saveImage($updatedCode['errorImage'], 'images/codeLogs/');
            $updatedCode['errorImage'] = $relativePath;
        }


        $code->update($updatedCode);

        return response('Updated with success', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code, Request $request)
    {
        if ($request->user()->id === $code->user_id) {
            $code->delete();

            return response('Delete was successful.', 200);
        }

        return abort(403, "Unauthorized Action");
    }


}
