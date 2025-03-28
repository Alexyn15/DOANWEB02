<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'time',
        'start_time',
        'end_time',
        'id_users', // Thêm trường id_users
    ];

    protected $dates = [
        'start_time',
        'end_time',
    ];
}
