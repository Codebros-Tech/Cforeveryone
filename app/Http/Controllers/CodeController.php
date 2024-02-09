<?php

namespace App\Http\Controllers;

use App\Events\CodePushedEvent;
use App\Events\CommentAdded;
use App\Http\Resources\CommentResource;
use App\Models\Code;
use App\Http\Requests\StoreCodeRequest;
use App\Http\Requests\UpdateCodeRequest;
use App\Http\Resources\CodeResource;
use App\Models\Comment;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
       if (Cache::has('codes')) {
           $codes = Cache::get('codes');
       } else {
           $codes =  Code::orderBy('id', 'DESC')->get();
           Cache::put('codes', $codes, $seconds = 5);
       }

        return response([
            'codes' => CodeResource::collection($codes),
        ]);
    }

    public function codes(Request $request): Response {
        $user = $request->user();

        $codes = $user->codes()->where('user_id', $user->id)->orderBy('id', 'DESC')->get();

        return response([
            'codes' => CodeResource::collection($codes)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Exception
     */
    public function store(StoreCodeRequest $request): Response
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

        CodePushedEvent::dispatch($code, 'pushed');

        return response([
            'status' => 'Code Stored'
        ]);
    }

    public function changeLikeState(Code $code ,Request $request) : Response {
        // check if any like states already exist
        //st in the database
        if ($code->likes()->where('user_id', $request->user()->id)->first()) {
            // fetch that like item and modify the state
            $currentState = $code->likes()->where('user_id', $request->user()->id)->first()->state;
            $like = $code->likes()->where('user_id', $request->user()->id)->update(['user_id' =>$request->user()->id, 'code_id' => $code->id ,'state' => !$currentState]);
        } else {
            // create the new state since it does not exist
            $like = ['user_id' => $request->user()->id, 'code_id' =>$code->id, 'state' => true];
            $like = CodeLike::create($like);
        }
        return response($like, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Code $code): Response
    {
        return response([
            'code' => new CodeResource($code),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCodeRequest $request, Code $code): Response
    {
        $updatedCode = $request->validated();

        // make sure you can only update a code which you posted
        if ($request->user()->id !== $code->user_id) {
            return response("Unauthorized Action", 403);
        }

        // delete the old image if it exists
        if ($code->errorImage) {
            $absolutePath = public_path($code->errorImage);
            File::delete($absolutePath);
        }

        CodePushedEvent::dispatch($code, 'pushed');


        // replace the image
        if (isset($updatedCode['errorImage'])) {
            $relativePath = $this->saveImage($updatedCode['errorImage'], 'images/codeLogs/');
            $updatedCode['errorImage'] = $relativePath;
        }

        CodePushedEvent::dispatch($code);


        $code->update($updatedCode);

        return response('Updated with success', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code, Request $request): Response
    {
        if ($request->user()->id === $code->user_id) {

             foreach ($code->comments() as $comment) {
                 $comment->delete();
             }

             $code->delete();

             CodePushedEvent::dispatch($code, 'deleted');

            return response('Delete was successful.', 200);
        }

        return response("Unauthorized Action", 403);
    }

    // working with the comment section
    public function comments(Code $code): Response {
        $comments = $code->comments()->get();

        return response([
            'code' => new CodeResource($code),
            'comments' => CommentResource::collection($comments),
        ]);
    }

    public function comment(Code $code, Request $request) : Response {
        $data = $request->validate([
            'comment' => 'required|string',
        ]);

        $comment = $code->comments()->save(new Comment([
            'user_id' => $request->user()->id,
            'body' => $data['comment']
        ]));

        CommentAdded::dispatch($code->id, $comment);

        return response([
            'status' => "Success adding the comment'",
        ]);
    }

}
