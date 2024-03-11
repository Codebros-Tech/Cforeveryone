<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserAbilityTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    // for the code
    public function test_user_can_create_code() {
        $user = User::factory()->create();

        $this->actingAs($user);

        $code = $this->post('/api/codes' ,[
            'user_id' => $this->faker()->numberBetween(1, 10),
            'title' => $this->faker()->title,
            'text' => $this->faker()->text,
            'description' => $this->faker()->text,
            'errorImage' => $this->faker()->title,
        ]);

        $content = json_decode($code->getContent());
        $this->assertEquals(
            $code->getStatusCode(),
            201
        );
    }
}
