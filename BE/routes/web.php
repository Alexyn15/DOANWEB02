<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Encore\Admin\Facades\Admin;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/user', [AuthController::class, 'index']);
});

Route::middleware(['admin.auth'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    Route::get('/admin/custom-route', [AdminController::class, 'customRoute']);
});

// Route cho Laravel-Admin
Admin::routes();
Route::get('/', function () {
    return view('welcome');
});
