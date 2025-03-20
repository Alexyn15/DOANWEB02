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
    Route::post('/create-schedule', [ScheduleController::class, 'create']);
    Route::put('/update-schedule/{id}', [ScheduleController::class, 'update']);
    Route::delete('/delete-schedule/{id}', [ScheduleController::class, 'delete']);
});
