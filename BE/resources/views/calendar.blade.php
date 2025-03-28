<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lịch Thời Gian</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            width: 14.28%;
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
        }
        .today {
            background-color: #f0f8ff;
        }
    </style>
</head>
<body>
    <h1>Lịch Thời Gian Tháng {{ $currentDate->format('m') }} Năm {{ $currentDate->format('Y') }}</h1>
    <table>
        <thead>
            <tr>
                <th>CN</th>
                <th>T2</th>
                <th>T3</th>
                <th>T4</th>
                <th>T5</th>
                <th>T6</th>
                <th>T7</th>
            </tr>
        </thead>
        <tbody>
            @php
                $startDayOfWeek = $days[0]->dayOfWeek; // Ngày đầu tháng
                $emptyCells = $startDayOfWeek; // Số ô trống trước ngày đầu tháng
            @endphp

            <tr>
                @for ($i = 0; $i < $emptyCells; $i++)
                    <td></td> <!-- Ô trống trước ngày đầu tháng -->
                @endfor

                @foreach ($days as $day)
                    <td class="{{ $day->isToday() ? 'today' : '' }}">
                        {{ $day->format('d') }}
                    </td>

                    @if ($day->dayOfWeek == 6) <!-- Nếu là thứ 7, xuống dòng -->
                        </tr><tr>
                    @endif
                @endforeach
            </tr>
        </tbody>
    </table>
</body>
</html>