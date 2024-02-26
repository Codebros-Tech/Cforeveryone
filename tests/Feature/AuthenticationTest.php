<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected bool $seed = true;
    /**
     * A basic feature test example.
     */
    public function test_user_can_be_authenticated()
    {
        // create a fake instance of the user.
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/login', [
                'email' => 'funwikelseandohnwi@gmail.com',
                'password' => 'something',
            ]);

    }


}
