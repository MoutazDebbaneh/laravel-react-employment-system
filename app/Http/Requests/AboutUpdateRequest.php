<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutUpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            "bio" => ['nullable', 'string'],
            "linkedin" => ['nullable', 'url', 'regex:/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/'],
            "facebook" => ['nullable', 'url', 'regex:/^https?:\/\/(www\.)?facebook\.com\/(?:\w+\/)*(?:profile\.php\?id=(?=\d.+)|\w+)$/'],
            "instagram" => ['nullable', 'url', 'regex:/^https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?$/'],
            "twitter" => ['nullable', 'url', 'regex:/^https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/'],
            "telegram" => ['nullable', 'url', 'regex:/^https?:\/\/(?:www\.)?t\.me\/([a-zA-Z0-9_]{5,32})\/?$/'],
        ];
    }

    public function messages()
    {
        return [
            'linkedin.regex' => 'Please enter a valid LinkedIn profile link.',
            'facebook.regex' => 'Please enter a valid Facebook profile link.',
            'instagram.regex' => 'Please enter a valid Instagram profile link.',
            'twitter.regex' => 'Please enter a valid Twitter profile link.',
            'telegram.regex' => 'Please enter a valid Telegram profile link.',
        ];
    }
}
