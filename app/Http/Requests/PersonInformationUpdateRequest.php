<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonInformationUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('person'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'medical_conditions' => ['nullable', 'string', 'max:5000'],
            'allergies' => ['nullable', 'string', 'max:5000'],
            'medications' => ['nullable', 'string', 'max:5000'],
            'dietary_restrictions' => ['nullable', 'string', 'max:5000'],
            'special_accommodations' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
