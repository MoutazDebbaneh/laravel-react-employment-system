<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\Role;
use App\Models\UserProfile;
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
        if (config('admin.root_admin_email')) {
            $user = User::firstOrCreate(
                ['email' => config('admin.root_admin_email')],
                [
                    'first_name' => config('admin.root_admin_first_name'),
                    'last_name' => config('admin.root_admin_last_name'),
                    'password' => bcrypt(config('admin.root_admin_password')),
                    'role' => Role::Root_Admin,
                    'email_verified_at' => now()
                ]
            );
            $user->userProfile()->firstOrCreate(
                ['user_id' => $user->id],
                []
            );
        }
    }
}
