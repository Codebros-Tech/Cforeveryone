<?php

namespace Database\Seeders;

use App\Models\Code;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        User::create([
            'name' => "Funwi Kelsea Ndohnwi",
            'email' => 'funwikelseandohwni@gmail.com',
            'password' => bcrypt("something"),
            'current_team_id' => null,
        ]);
    }
}
