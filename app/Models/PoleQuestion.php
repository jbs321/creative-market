<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PoleQuestion extends Model
{
    protected $primaryKey = null;
    public $incrementing = false;
    protected $table = 'pole_questions';
    public $timestamps = false;
}
