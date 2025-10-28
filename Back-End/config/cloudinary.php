<?php

/*
 * This file is part of the Laravel Cloudinary package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Parse Cloudinary URL to extract credentials
$cloudinaryUrl = env('CLOUDINARY_URL', 'cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1');
$parsedCloudName = 'dxyczvtd1';
$parsedApiKey = '667964626244861';
$parsedApiSecret = 'Q-W2KrzSH4wMSTxYlvgSmBAG77s';

if (preg_match('/cloudinary:\/\/([^:]+):([^@]+)@([^\/]+)/', $cloudinaryUrl, $matches)) {
    $parsedApiKey = $matches[1];
    $parsedApiSecret = $matches[2];
    $parsedCloudName = $matches[3];
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Configuration
    |--------------------------------------------------------------------------
    |
    | An HTTP or HTTPS URL to notify your application (a webhook) when the process of uploads, deletes, and any API
    | that accepts notification_url has completed.
    |
    |
    */
    'notification_url' => env('CLOUDINARY_NOTIFICATION_URL'),

    /*
    |--------------------------------------------------------------------------
    | Cloudinary Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your Cloudinary settings. Cloudinary is a cloud hosted
    | media management service for all file uploads, storage, delivery and transformation needs.
    |
    |
    */
    'cloud_url' => $cloudinaryUrl,

    /**
     * Parsed Cloudinary credentials from CLOUDINARY_URL
     * Format: cloudinary://api_key:api_secret@cloud_name
     */
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME', $parsedCloudName),

    'api_key' => env('CLOUDINARY_API_KEY', $parsedApiKey),

    'api_secret' => env('CLOUDINARY_API_SECRET', $parsedApiSecret),

    /**
     * Upload Preset From Cloudinary Dashboard
     */
    'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET', 'bnbatiment_services'),

    /**
     * Route to get cloud_image_url from Blade Upload Widget
     */
    'upload_route' => env('CLOUDINARY_UPLOAD_ROUTE'),

    /**
     * Controller action to get cloud_image_url from Blade Upload Widget
     */
    'upload_action' => env('CLOUDINARY_UPLOAD_ACTION'),
];
