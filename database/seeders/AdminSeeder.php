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
            ['email' => config('root_admin.admin_email')],
            [
                'first_name' => config('root_admin.admin_first_name'),
                'last_name' => config('root_admin.admin_last_name'),
                'password' => bcrypt(config('root_admin.admin_password')),
                'role' => Role::Admin->value,
                'email_verified_at' => now()
            ]
        );
    }
}
