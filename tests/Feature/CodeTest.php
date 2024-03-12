<?php

namespace Tests\Feature;

use App\Models\Code;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CodeTest extends TestCase
{

    use RefreshDatabase, WithFaker;


    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_can_fetch_all_codes() {
        $user = $this->authenticateFakerUser();

        $codesNumber = Code::all()->count();
        $this->assertDatabaseCount('codes', $codesNumber);
    }

    public function test_users_can_create_code_and_comment() {
        $user = $this->authenticateFakerUser();

        $codeData = [
            'title' => 'Title of the code ',
            'description' => "this is the description of the code",
            'text' => "Code body",
            'errorImage' => null,
        ];

        $code = $this->post('/api/codes', $codeData);

        $code->assertStatus(201);

        $commentData = [
            'comment' => 'code comment',
        ];

        $codeId = json_decode($code->content())->id;

        $comment = $this->post('/api/codes/'. $codeId . '/comments', $commentData );

        // the comment was created
        $comment->assertStatus(201);

        $this->assertDatabaseHas('comments', [
            'commentable_id' =>  json_decode($code->content())->id,
        ]);
    }

    public function test_user_can_update_code() {
        $user = $this->authenticateFakerUser();


    }

    public function test_user_can_delete_code() {

    }

    public function test_code_can_have_suggestions() {
        $user = $this->authenticateFakerUser();

        $code = $user->codes()->create([
            'title' => "title of the code",
            'text' => 'the body of the code',
            'description' => 'the description of the code',
        ]);

        // test that the suggestion has been created.
        $suggestion = $code->suggestions()->create([
            'code_id' => $code->id,
            'text' => 'some suggestion',
        ]);

        $this->assertDatabaseHas('suggestions', [
            'code_id' => $suggestion->code_id,
            'text' => 'some suggestion',
        ]);
    }


}
