<?php

use Illuminate\Support\Facades\Route;
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
