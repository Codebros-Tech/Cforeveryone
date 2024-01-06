<?php

namespace App\Http\Controllers;

use App\Http\Resources\CodeResource;
use App\Models\CodeComment;
use App\Http\Requests\StoreCodeCommentRequest;
use App\Http\Requests\UpdateCodeCommentRequest;
use App\Models\Code;

class CodeCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Code $code)
    {
        if ($code) {
            $comments = $code->comments;

            return response([
                'comments' => $comments,
                'code' => new CodeResource($code),
            ]);
        }

        return response('Theres no code', 404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCodeCommentRequest $request)
    {
        $data = $request->validated();

        $comment = CodeComment::create([
            'user_id' => $request->user()->id,
            'code_id'=> $data['code_id'],
            'comment' => $data['comment']
        ]);

        return response([
            'comment' => $comment,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CodeComment $codeComment)
    {
        return response([
            'comment' =>  $codeComment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CodeComment $codeComment)
    {
        $codeComment->delete();

        return response([
            'success' => "Comment deleted successfully",
        ]);
    }
}
