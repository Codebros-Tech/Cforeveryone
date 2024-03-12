<?php

namespace Tests\Feature;

 use App\Models\User;
 use Illuminate\Foundation\Testing\RefreshDatabase;
 use Illuminate\Foundation\Testing\WithFaker;
 use Psy\Util\Str;
 use Tests\TestCase;

class UserTest extends TestCase
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

    public function test_that_users_can_contact_support() {
        // create a fake user
        $user = User::factory()->create();

        $this->actingAs($user);

        $reportInformation = [
            'name' => $user->name,
            'description' => $this->faker()->text,
        ];

        $contact = $this->post('/api/contact', $reportInformation);

        $this->assertEquals(200, $contact->getStatusCode());
    }


    public function test_user_can_retrieve_all_their_notifications() {
        $user = $this->authenticateFakerUser();


    }

}
