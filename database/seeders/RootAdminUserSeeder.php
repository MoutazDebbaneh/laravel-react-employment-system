<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RootAdminUserSeeder extends Seeder
{

    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (config('root_admin.admin_email')) {
            User::firstOrCreate(
                ['email' => config('root_admin.admin_email')],
                [
                    'first_name' => config('root_admin.admin_first_name'),
                    'last_name' => config('root_admin.admin_last_name'),
                    'password' => bcrypt(config('root_admin.admin_password')),
                    'role' => Role::Root_Admin,
                    'email_verified_at' => now()
                ]
            );
        }
    }
}
