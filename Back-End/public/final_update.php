<?php
/**
 * Final Service Images Update Script
 * Upload this file to: public_html/api/final_update.php
 * Visit: https://api.bnbatiment.com/final_update.php?password=update2024
 */

$password = $_GET['password'] ?? '';
if ($password !== 'update2024') die('Access denied');

echo "<h1>🎯 Final Service Images Update</h1>";
echo "<style>body{font-family:Arial,sans-serif;margin:20px;} .success{color:green;} .error{color:red;} .warning{color:orange;} .info{color:blue;} pre{background:#f5f5f5;padding:10px;border-radius:5px;}</style>";

try {
    // Step 1: Update .env file
    echo "<h2>📝 Step 1: Updating Environment Configuration</h2>";
    
    $envPath = __DIR__ . '/.env';
    $envContent = 'APP_NAME="BN Bâtiment API"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.bnbatiment.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=srv448.hstgr.io
DB_PORT=3306
DB_DATABASE=u696043789_bnbatiment
DB_USERNAME=u696043789_bnbatiment
DB_PASSWORD=support@Passord123

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=support@bnbatiment.com
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD_HERE
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=support@bnbatiment.com
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://YOUR_CLOUDINARY_URL_HERE

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://bnbatiment.com,https://www.bnbatiment.com
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS,PATCH
CORS_ALLOWED_HEADERS=Content-Type,Authorization,X-Requested-With,Accept,Origin,X-XSRF-TOKEN
CORS_ALLOWED_CREDENTIALS=true
CORS_MAX_AGE=86400';

    // Create backup
    if (file_exists($envPath)) {
        $backupPath = $envPath . '.backup.' . date('Y-m-d-H-i-s');
        copy($envPath, $backupPath);
        echo "<p class='success'>✅ Backup created: " . basename($backupPath) . "</p>";
    }
    
    // Update .env file
    if (file_put_contents($envPath, $envContent)) {
        echo "<p class='success'>✅ .env file updated with correct database host: srv448.hstgr.io</p>";
    } else {
        echo "<p class='error'>❌ Failed to update .env file</p>";
        exit;
    }
    
    // Step 2: Load Laravel
    echo "<h2>⚙️ Step 2: Loading Laravel Framework</h2>";
    
    require __DIR__.'/vendor/autoload.php';
    $app = require_once __DIR__.'/bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    
    echo "<p class='success'>✅ Laravel loaded successfully!</p>";
    
    // Step 3: Connect to database
    echo "<h2>🔗 Step 3: Connecting to Database</h2>";
    
    use Illuminate\Support\Facades\DB;
    
    try {
        $services = DB::table('services')->get();
        echo "<p class='success'>✅ Database connected! Found " . count($services) . " services</p>";
    } catch (Exception $e) {
        echo "<p class='error'>❌ Database connection failed: " . $e->getMessage() . "</p>";
        exit;
    }
    
    // Step 4: Update service images
    echo "<h2>🖼️ Step 4: Updating Service Images</h2>";
    
    $images = [
        'installation' => '/uploads/services/1754239886_installation toiture.jpg',
        'pose' => '/uploads/services/1754239886_installation toiture.jpg',
        'réparation' => '/uploads/services/1754240415_réparation de fuite.jpg',
        'reparation' => '/uploads/services/1754240415_réparation de fuite.jpg',
        'fuite' => '/uploads/services/1754240415_réparation de fuite.jpg',
        'entretien' => '/uploads/services/1754240526_entretien.webp',
        'démoussage' => '/uploads/services/1754240626_démousage.jpg',
        'demoussage' => '/uploads/services/1754240626_démousage.jpg',
        'nettoyage' => '/uploads/services/1754240785_nettoyage.webp'
    ];
    
    $updated = 0;
    $defaultUsed = 0;
    
    foreach ($services as $service) {
        $title = strtolower($service->title);
        $found = false;
        
        foreach ($images as $key => $image) {
            if (strpos($title, $key) !== false) {
                DB::table('services')->where('id', $service->id)->update([
                    'image' => $image,
                    'updated_at' => now()
                ]);
                echo "<p class='success'>✅ {$service->title} → {$image}</p>";
                $updated++;
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            $default = '/uploads/services/1754237525_images.jpg';
            DB::table('services')->where('id', $service->id)->update([
                'image' => $default,
                'updated_at' => now()
            ]);
            echo "<p class='warning'>⚠️ {$service->title} → {$default} (default)</p>";
            $defaultUsed++;
        }
    }
    
    // Step 5: Summary
    echo "<h2>📊 Step 5: Update Summary</h2>";
    echo "<div style='background:#e7f3ff;padding:20px;border-radius:10px;border:2px solid #007bff;'>";
    echo "<h3>🎯 Results:</h3>";
    echo "<p><strong>Total Services:</strong> " . count($services) . "</p>";
    echo "<p><strong>Updated with matching images:</strong> {$updated}</p>";
    echo "<p><strong>Updated with default image:</strong> {$defaultUsed}</p>";
    echo "<p><strong>Success Rate:</strong> " . round(($updated / count($services)) * 100, 1) . "%</p>";
    echo "</div>";
    
    // Step 6: Image verification
    echo "<h2>🔍 Step 6: Image File Verification</h2>";
    $imageFiles = [
        '1754237525_images.jpg',
        '1754239886_installation toiture.jpg',
        '1754240415_réparation de fuite.jpg',
        '1754240526_entretien.webp',
        '1754240626_démousage.jpg',
        '1754240785_nettoyage.webp'
    ];
    
    $uploadsPath = __DIR__ . '/public/uploads/services/';
    echo "<p class='info'>Checking image files in: {$uploadsPath}</p>";
    
    $foundFiles = 0;
    foreach ($imageFiles as $file) {
        $filePath = $uploadsPath . $file;
        if (file_exists($filePath)) {
            $size = filesize($filePath);
            echo "<p class='success'>✅ {$file} (" . round($size/1024, 1) . " KB)</p>";
            $foundFiles++;
        } else {
            echo "<p class='error'>❌ {$file} - NOT FOUND</p>";
        }
    }
    
    // Step 7: Final results
    echo "<h2>🎉 Step 7: Final Results</h2>";
    
    if ($foundFiles == count($imageFiles)) {
        echo "<div style='background:#d4edda;padding:20px;border-radius:10px;border:2px solid #28a745;'>";
        echo "<h3>🎯 SUCCESS!</h3>";
        echo "<p><strong>✅ All services updated successfully!</strong></p>";
        echo "<p><strong>✅ All image files are present!</strong></p>";
        echo "<p><strong>✅ Database connection working!</strong></p>";
        echo "<p>Your website should now display the correct images:</p>";
        echo "<ul>";
        echo "<li><a href='https://bnbatiment.com' target='_blank'>🏠 Homepage</a></li>";
        echo "<li><a href='https://bnbatiment.com/services' target='_blank'>🛠️ Services Page</a></li>";
        echo "</ul>";
        echo "</div>";
    } else {
        echo "<div style='background:#f8d7da;padding:20px;border-radius:10px;border:2px solid #dc3545;'>";
        echo "<h3>⚠️ WARNING!</h3>";
        echo "<p><strong>Services updated but some image files are missing!</strong></p>";
        echo "<p>Please upload the missing image files to: <code>public_html/api/public/uploads/services/</code></p>";
        echo "</div>";
    }
    
    echo "<div style='background:#fff3cd;padding:20px;border-radius:10px;border:2px solid #ffc107;margin-top:20px;'>";
    echo "<p style='color:red;font-weight:bold;'>⚠️ IMPORTANT: Delete this file after use for security!</p>";
    echo "<p>File location: <code>public_html/api/final_update.php</code></p>";
    echo "</div>";
    
} catch (Exception $e) {
    echo "<p class='error'>❌ Error: " . $e->getMessage() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
