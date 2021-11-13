<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionOption extends Model
{
    protected $primaryKey = null;
    public $incrementing = false;
    protected $table = 'question_options';
    public $timestamps = false;
}
