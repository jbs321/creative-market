<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

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

    protected function formatErrors(Validator $validator)
    {
        $errors = parent::formatErrors($validator);

        // this will remove the keys that have index larger than 0
        $keys = array_filter(array_keys($errors), function($item) {
            $parts = explode('.', $item);

            // you might want to modify this to match your fields,
            // I had another level of keys
            if (count($parts) === 3 and is_numeric($parts[1]) and (int)$parts[1] > 0) {
                return false;
            }

            return true;
        });

        $errors = array_intersect_key($errors, array_flip($keys));

        return $errors;
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
            'store_urls' => 'string',
        ];
    }
}
