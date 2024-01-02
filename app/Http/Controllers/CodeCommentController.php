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
        $comments = $code->comments;

        return response([
            'comments' => $comments,
            'code' => new CodeResource($code),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCodeCommentRequest $request)
    {
        $data = $request->validated();

        $comment = CodeComment::create($data);

        return response([
            'comment' => $comment,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CodeComment $codeComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CodeComment $codeComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCodeCommentRequest $request, CodeComment $codeComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CodeComment $codeComment)
    {
        //
    }
}
