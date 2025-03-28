<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

class CalendarController extends Controller
{
    public function showCalendar()
    {
        $currentDate = Carbon::now(); // Lấy ngày hiện tại
        $startOfMonth = $currentDate->copy()->startOfMonth(); // Ngày đầu tháng
        $endOfMonth = $currentDate->copy()->endOfMonth(); // Ngày cuối tháng

        // Tạo một mảng chứa các ngày trong tháng
        $daysInMonth = [];
        $currentDay = $startOfMonth;

        while ($currentDay <= $endOfMonth) {
            $daysInMonth[] = $currentDay->copy();
            $currentDay->addDay();
        }

        // Trả về view với dữ liệu ngày tháng
        return view('calendar', ['days' => $daysInMonth, 'currentDate' => $currentDate]);
    }
}
