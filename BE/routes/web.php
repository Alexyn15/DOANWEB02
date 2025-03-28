<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;

// Routes cho hiển thị lịch
Route::get('/calendar', [ScheduleController::class, 'showCalendar']);

Route::get('/', function () {
    return view('welcome');
});

// Routes cho người dùng đã đăng nhập
Route::middleware(['auth'])->group(function () {
    Route::get('/user', [AuthController::class, 'index']);
    Route::post('/schedules', [ScheduleController::class, 'create']);
    Route::put('/schedules/{id}', [ScheduleController::class, 'update']); // Route để cập nhật lịch
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::delete('/schedules/{id}', [ScheduleController::class, 'delete']);
});

// Routes cho admin
Route::middleware(['admin.auth'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    Route::get('/admin/custom-route', [AdminController::class, 'customRoute']);
});
// Route cho đăng ký
Route::post('/register', [AuthController::class, 'register']);
// Route cho đăng nhập
Route::post('/login', [AuthController::class, 'login']);
// Route cho lấy thông tin người dùng
Route::get('/user', [AuthController::class, 'getUser'])->middleware('auth:sanctum');
// Route cho đăng xuất
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
