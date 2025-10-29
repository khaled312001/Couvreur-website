<?php
/**
 * Quick Environment Updater
 * Upload this file to: public_html/api/quick_env.php
 * Visit: https://api.bnbatiment.com/quick_env.php?password=update2024
 */

$password = $_GET['password'] ?? '';
if ($password !== 'update2024') die('Access denied');

echo "<h1>Environment Configuration Updater</h1>";

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
DB_HOST=auth-db2000.hstgr.io
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

try {
    // Create backup
    if (file_exists($envPath)) {
        $backupPath = $envPath . '.backup.' . date('Y-m-d-H-i-s');
        copy($envPath, $backupPath);
        echo "<p>✅ Backup created: " . basename($backupPath) . "</p>";
    }
    
    // Update .env file
    if (file_put_contents($envPath, $envContent)) {
        echo "<p>✅ .env file updated successfully!</p>";
        
        // Test database connection
        try {
            $pdo = new PDO(
                "mysql:host=auth-db2000.hstgr.io;port=3306;dbname=u696043789_bnbatiment;charset=utf8mb4",
                "u696043789_bnbatiment",
                "support@Passord123",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            
            echo "<p>✅ Database connection successful!</p>";
            
            // Test query
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM services");
            $result = $stmt->fetch();
            echo "<p>📊 Services in database: <strong>{$result['count']}</strong></p>";
            
        } catch (PDOException $e) {
            echo "<p>❌ Database connection failed: " . $e->getMessage() . "</p>";
        }
        
    } else {
        echo "<p>❌ Failed to update .env file. Check permissions.</p>";
    }
    
    echo "<h2>Configuration Updated:</h2>";
    echo "<pre style='background:#f5f5f5;padding:10px;border-radius:5px;'>";
    echo htmlspecialchars($envContent);
    echo "</pre>";
    
    echo "<p><strong>⚠️ Delete this file after use!</strong></p>";
    
} catch (Exception $e) {
    echo "<p>❌ Error: " . $e->getMessage() . "</p>";
}
