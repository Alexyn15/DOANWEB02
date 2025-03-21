<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Encore\Admin\Auth\Database\Administrator;
use Illuminate\Support\Facades\Hash;

class ConvertAdminUserSeeder extends Seeder
{
    public function run()
    {
        // Lấy tài khoản admin hiện tại từ bảng users
        $user = User::where('role', 'admin')->first();

        if ($user) {
            // Kiểm tra nếu tài khoản admin đã tồn tại trong bảng admin_users
            if (Administrator::where('username', $user->email)->doesntExist()) {
                Administrator::create([
                    'username' => $user->email,
                    'password' => $user->password,
                    'name' => $user->name,
                ]);
            }
        }
    }
}
