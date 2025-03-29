<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function create(Request $request)
    {
        try {
            Log::info('Create Schedule Request:', $request->all());

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'time' => 'nullable|string|max:50',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after_or_equal:start_time',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            $schedule = Schedule::create([
                'name' => $request->name,
                'description' => $request->description,
                'time' => $request->time,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'id_users' => auth()->id(), // Lấy id người dùng hiện tại
            ]);

            return response()->json([
                'message' => 'Tạo lịch thành công!',
                'schedule' => $schedule,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error Creating Schedule:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Lỗi khi tạo lịch'], 500);
        }
    }

    // Phương thức cập nhật lịch
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'time' => 'nullable|string|max:50',
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

            // Cập nhật thông tin lịch
            $schedule->update([
                'name' => $request->name,
                'description' => $request->description,
                'time' => $request->time,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'id_users' => auth()->id(), // Lấy id người dùng hiện tại

            ]);

            return response()->json([
                'message' => 'Cập nhật lịch thành công!',
                'schedule' => $schedule,
            ]);
        } catch (\Exception $e) {
            Log::error('Error Updating Schedule:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Lỗi khi cập nhật lịch'], 500);
        }
    }
    // Phương thức xóa lịch
    public function delete($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Lịch không tồn tại!'], 404);
        }

        $schedule->delete();

        return response()->json(['message' => 'Xóa lịch thành công!']);
    }
    // Phương thức lấy danh sách lịch
    public function index()
    {
        try {
            $schedules = Schedule::where('id_users', auth()->id())->get();

            // Định dạng giờ theo múi giờ Việt Nam
            $formattedSchedules = $schedules->map(function ($schedule) {
                return [
                    'id' => $schedule->id,
                    'name' => $schedule->name,
                    'description' => $schedule->description,
                    'time' => $schedule->time,
                    'start_time' => Carbon::parse($schedule->start_time)->timezone('Asia/Ho_Chi_Minh')->toDateTimeString(),
                    'end_time' => Carbon::parse($schedule->end_time)->timezone('Asia/Ho_Chi_Minh')->toDateTimeString(),
                ];
            });

            return response()->json($formattedSchedules, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching schedules:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Lỗi khi lấy danh sách lịch'], 500);
        }
    }

    public function showCalendar()
    {
        return view('calendar');
    }
}
