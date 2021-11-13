<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $hidden = ['created_at', 'updated_at', 'id'];

    public function options()
    {
        return $this->hasManyThrough(
            Option::class,
            QuestionOption::class,
            'question_id',
            'id',
            'id',
            'option_id'
        );
    }
}
