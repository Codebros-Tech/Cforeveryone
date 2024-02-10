<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Code;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//         \App\Models\User::factory(10)->create();

//         \App\Models\User::factory()->create([
//             'name' => 'Test User',
//             'email' => 'test@example.com',
//         ]);

        User::factory()->count(10)->create();
        User::create([
            'name' => "Funwi Kelsea Ndohnwi",
            'email' => 'funwikelseandohnwi@gmail.com',
            'password' => bcrypt("something"),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => "Funwi Kelsea Ndohnwi",
            'email' => 'kelseafunwi@gmail.com',
            'password' => bcrypt("something"),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'remember_token' => Str::random(10),
        ]);

        Code::factory()->count(20)->create();
    }
}
