<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@jseek.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Account',
                'password' => bcrypt(config('root_admin.admin_password')),
                'role' => Role::Admin->value,
                'email_verified_at' => now()
            ]
        );
    }
}
