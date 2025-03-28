<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Định nghĩa route cho login admin
Route::post('/login_admin', [AuthController::class, 'loginAdmin']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Định nghĩa các route cho lịch
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/schedules', [ScheduleController::class, 'index']); // Lấy danh sách lịch
    Route::post('/schedules', [ScheduleController::class, 'create']); // Tạo lịch
    Route::put('/update-schedule/{id}', [ScheduleController::class, 'update']); // Cập nhật lịch
    Route::delete('/delete-schedule/{id}', [ScheduleController::class, 'delete']); // Xóa lịch
});
