<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Code>
 */
class CodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maxId = User::max('id');
        return [
            'user_id' => $this->faker->numberBetween(1, $maxId),
            'title' => $this->faker->title(),
            'description' => $this->faker->text(20),
            'text' => $this->faker->text(200),
        ];
    }
}
