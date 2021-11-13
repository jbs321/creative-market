<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SavePoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user' => 'required|UUID|max:128|exists:users,uuid',
            'pole' => 'required|UUID|max:128|exists:poles,uuid',
            'questions' => 'array',
            'questions.*' => 'required|UUID|exists:options,uuid',
        ];
    }
}
