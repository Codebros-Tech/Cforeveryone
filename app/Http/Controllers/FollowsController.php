<?php

namespace App\Http\Controllers;

use App\Models\Follows;
use App\Http\Requests\StoreFollowsRequest;
use App\Http\Requests\UpdateFollowsRequest;

class FollowsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFollowsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Follows $follows)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follows $follows)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFollowsRequest $request, Follows $follows)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follows $follows)
    {
        //
    }
}
