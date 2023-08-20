<?php
return [

    /*
    |--------------------------------------------------------------------------
    | Default root admin user
    |--------------------------------------------------------------------------
    |
    | Default user will be created at project installation/deployment
    |
    */

    'root_admin_first_name' => 'Admin',
    'root_admin_last_name' => 'User',
    'root_admin_email' => 'jadmin@jseek.com',
    'root_admin_password' => '123456789',

    'admin_first_name' => env('ADMIN_FIRST_NAME', ''),
    'admin_last_name' => env('ADMIN_LAST_NAME', ''),
    'admin_email' => env('ADMIN_EMAIL', ''),
    'admin_password' => env('ADMIN_PASSWORD', '')
];
