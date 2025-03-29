<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;



// đăng ký các tuyến đường cho ứng dụng web
Route::get('/', function () {
    return view('welcome');
});

// Routes cho tạo lịch
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

//routes cho đăng ký
Route::post('/register', [AuthController::class, 'register']);
// routes cho đăng nhập
Route::post('/login', [AuthController::class, 'login']);
