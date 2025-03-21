<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        // Đây là trang chính của admin
        return view('admin.js');
    }
}
