<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

class AdminsController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'editableAdmin.first_name' => 'required|string|max:255|min:3',
            'editableAdmin.last_name' => 'required|string|max:255|min:3',
            'editableAdmin.email' => 'required|string|email|max:255',
            'editableAdmin.password' => ['required', Rules\Password::defaults()],
        ]);

        $data = $request->input('editableAdmin');

        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => Role::Admin->value
        ]);

        $user->setAttribute('email_verified_at', now());
        $user->save();

        return redirect(route('admin.adminsList'));
    }
    public function update(string $id, Request $request)
    {

        $request->validate([
            'editableAdmin.first_name' => 'required|string|max:255|min:3',
            'editableAdmin.last_name' => 'required|string|max:255|min:3',
            'editableAdmin.email' => 'required|string|email|max:255',
        ]);

        $data = $request->input('editableAdmin');

        $admin = User::where(['id' => $id])->first();

        if (empty($admin)) return abort(404);

        $admin->fill($data);
        $admin->save();

        return back();
    }
    public function destroy(string $id)
    {
        $admin = User::where(['id' => $id])->first();

        if (empty($admin)) return abort(404);

        $admin->delete();

        return back();
    }
}
