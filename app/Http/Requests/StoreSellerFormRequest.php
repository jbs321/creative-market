<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSellerFormRequest extends FormRequest
{
    public const ALLOWED_CATEGORIES = [
        'Select Category',
        'Graphics',
        'FontsTemplates',
        'Add-ons',
        'PhotosWeb Themes',
        '3D',
    ];

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
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'portfolio_link' => 'required|url|unique:users,portfolio_link',
            'category' => [
                'required',
                'string',
                Rule::in(self::ALLOWED_CATEGORIES),
            ],
            'store_urls' => 'string|nullable',
        ];
    }
}
