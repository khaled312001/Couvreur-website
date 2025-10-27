<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://www.bnbatiment.com',
        'https://bnbatiment.com',
        'http://localhost:3000',
        'http://localhost:5173'
    ],

    'allowed_origins_patterns' => [
        '#^https?://([a-z0-9-]+\.)?bnbatiment\.com$#',
        '#^http://localhost:[0-9]+$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [
        'Cache-Control',
        'ETag',
        'Last-Modified',
        'Content-Length',
        'Content-Type'
    ],

    'max_age' => 86400, // 24 hours for better caching

    'supports_credentials' => true,

]; 