<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PoleAnswer extends Model
{
    public $timestamps = false;
    protected $primaryKey = null;

    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'pole_id',
        'question_id',
        'option_id',
    ];
}
