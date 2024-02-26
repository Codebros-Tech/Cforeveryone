<?php

namespace Tests\Feature;

 use App\Models\User;
 use Illuminate\Foundation\Testing\RefreshDatabase;
 use Illuminate\Foundation\Testing\WithFaker;
 use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected $seed = true;
    /**
     * A basic test example.
     */
    public function test_that_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_empty(): void {
        $this->assertDatabaseHas('users', [
            'email' => 'funwikelseandohnwi@gmail.com',
        ]);
    }

    public function test_users_can_create_code_and_comment() {
        // create the user
        $user = User::factory()->create();

        // this line of code will log the user in the system,
        $this->actingAs($user);

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


}
