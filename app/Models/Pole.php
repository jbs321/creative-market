<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Pole extends Model
{
    protected $hidden = ['created_at', 'updated_at', 'id'];

    public function questions()
    {
        return $this->hasManyThrough(
            Question::class,
            PoleQuestion::class,
            'pole_id',
            'id',
            'id',
            'question_id'
        );
    }
}
