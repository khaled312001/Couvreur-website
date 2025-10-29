<?php
/**
 * Environment Configuration Updater
 * 
 * This script updates the .env file on the server with the correct database credentials.
 * 
 * INSTRUCTIONS:
 * 1. Upload this file to: public_html/api/update_env.php
 * 2. Visit: https://api.bnbatiment.com/update_env.php?password=update2024
 * 3. The script will update the .env file
 * 4. DELETE this file after use for security
 */

// Prevent direct access without password (simple security)
$password = isset($_GET['password']) ? $_GET['password'] : '';
if ($password !== 'update2024') {
    die('Access denied. Add ?password=update2024 to the URL');
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environment Configuration Updater</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .config-item {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .config-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .config-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
        }
        .detail-item {
            display: flex;
            flex-direction: column;
        }
        .detail-label {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 5px;
            font-weight: 600;
        }
        .detail-value {
            font-size: 0.95rem;
            color: #333;
            word-break: break-all;
            font-family: monospace;
            background: #e9ecef;
            padding: 5px 10px;
            border-radius: 4px;
        }
        .success {
            color: #28a745;
            font-weight: bold;
        }
        .error {
            color: #dc3545;
            font-weight: bold;
        }
        .warning {
            color: #ffc107;
            font-weight: bold;
        }
        .code-block {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            font-family: monospace;
            font-size: 0.9rem;
            overflow-x: auto;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #dee2e6;
        }
        .btn-danger {
            background: #dc3545;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚙️ Environment Configuration Updater</h1>
            <p>Mise à jour de la configuration de base de données</p>
        </div>
        
        <div class="content">
            <?php
            try {
                // Define the new .env content
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

                // Path to .env file
                $envPath = __DIR__ . '/.env';
                $backupPath = __DIR__ . '/.env.backup.' . date('Y-m-d-H-i-s');
                
                echo '<div class="config-item">';
                echo '<div class="config-title">📋 Configuration de base de données</div>';
                echo '<div class="config-details">';
                
                echo '<div class="detail-item">';
                echo '<span class="detail-label">Host:</span>';
                echo '<span class="detail-value">auth-db2000.hstgr.io</span>';
                echo '</div>';
                
                echo '<div class="detail-item">';
                echo '<span class="detail-label">Port:</span>';
                echo '<span class="detail-value">3306</span>';
                echo '</div>';
                
                echo '<div class="detail-item">';
                echo '<span class="detail-label">Database:</span>';
                echo '<span class="detail-value">u696043789_bnbatiment</span>';
                echo '</div>';
                
                echo '<div class="detail-item">';
                echo '<span class="detail-label">Username:</span>';
                echo '<span class="detail-value">u696043789_bnbatiment</span>';
                echo '</div>';
                
                echo '</div>';
                echo '</div>';
                
                // Check if .env file exists
                if (file_exists($envPath)) {
                    // Create backup
                    if (copy($envPath, $backupPath)) {
                        echo '<div class="config-item">';
                        echo '<div class="config-title success">✅ Sauvegarde créée</div>';
                        echo '<p>Fichier de sauvegarde: <code>' . basename($backupPath) . '</code></p>';
                        echo '</div>';
                    }
                    
                    // Update .env file
                    if (file_put_contents($envPath, $envContent)) {
                        echo '<div class="config-item">';
                        echo '<div class="config-title success">✅ Fichier .env mis à jour</div>';
                        echo '<p>La configuration de base de données a été mise à jour avec succès.</p>';
                        echo '</div>';
                        
                        // Test database connection
                        echo '<div class="config-item">';
                        echo '<div class="config-title">🔍 Test de connexion à la base de données</div>';
                        
                        try {
                            $pdo = new PDO(
                                "mysql:host=auth-db2000.hstgr.io;port=3306;dbname=u696043789_bnbatiment;charset=utf8mb4",
                                "u696043789_bnbatiment",
                                "support@Passord123",
                                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                            );
                            
                            echo '<p class="success">✅ Connexion à la base de données réussie!</p>';
                            
                            // Test a simple query
                            $stmt = $pdo->query("SELECT COUNT(*) as count FROM services");
                            $result = $stmt->fetch();
                            echo '<p>Nombre de services dans la base: <strong>' . $result['count'] . '</strong></p>';
                            
                        } catch (PDOException $e) {
                            echo '<p class="error">❌ Erreur de connexion: ' . htmlspecialchars($e->getMessage()) . '</p>';
                        }
                        
                        echo '</div>';
                        
                    } else {
                        echo '<div class="config-item">';
                        echo '<div class="config-title error">❌ Erreur lors de la mise à jour</div>';
                        echo '<p>Impossible d\'écrire dans le fichier .env. Vérifiez les permissions.</p>';
                        echo '</div>';
                    }
                    
                } else {
                    // Create new .env file
                    if (file_put_contents($envPath, $envContent)) {
                        echo '<div class="config-item">';
                        echo '<div class="config-title success">✅ Nouveau fichier .env créé</div>';
                        echo '<p>Le fichier .env a été créé avec la configuration de base de données.</p>';
                        echo '</div>';
                    } else {
                        echo '<div class="config-item">';
                        echo '<div class="config-title error">❌ Erreur lors de la création</div>';
                        echo '<p>Impossible de créer le fichier .env. Vérifiez les permissions.</p>';
                        echo '</div>';
                    }
                }
                
                // Show current configuration
                echo '<div class="config-item">';
                echo '<div class="config-title">📄 Configuration actuelle</div>';
                echo '<div class="code-block">';
                echo htmlspecialchars($envContent);
                echo '</div>';
                echo '</div>';
                
            } catch (Exception $e) {
                echo '<div class="config-item" style="border-left-color: #dc3545;">';
                echo '<div class="config-title error">❌ Erreur</div>';
                echo '<p>' . htmlspecialchars($e->getMessage()) . '</p>';
                echo '</div>';
            }
            ?>
        </div>
        
        <div class="footer">
            <p><strong>⚠️ IMPORTANT:</strong> Pour des raisons de sécurité, supprimez ce fichier après utilisation!</p>
            <p style="margin-top: 10px; color: #666;">Fichier: <code>public_html/api/update_env.php</code></p>
        </div>
    </div>
</body>
</html>
