<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    // Tạo lịch mới
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $schedule = Schedule::create($request->all());

        return response()->json([
            'message' => 'Tạo lịch thành công!',
            'schedule' => $schedule
        ], 201);
    }

    // Cập nhật lịch hiện có
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Lịch không tồn tại!'], 404);
        }

        $schedule->update($request->all());

        return response()->json([
            'message' => 'Cập nhật lịch thành công!',
            'schedule' => $schedule
        ]);
    }

    // Xóa lịch
    public function delete($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Lịch không tồn tại!'], 404);
        }

        $schedule->delete();

        return response()->json(['message' => 'Xóa lịch thành công!']);
    }
}
