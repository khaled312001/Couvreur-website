<?php
/**
 * Service Images Updater Script
 * 
 * This script updates service images in the database to match the uploaded images.
 * 
 * INSTRUCTIONS:
 * 1. Upload this file to: public_html/api/public/update_service_images.php
 * 2. Visit: https://api.bnbatiment.com/update_service_images.php
 * 3. The script will update all service images
 * 4. DELETE this file after use for security
 */

// Prevent direct access without password (simple security)
$password = isset($_GET['password']) ? $_GET['password'] : '';
if ($password !== 'update2024') {
    die('Access denied. Add ?password=update2024 to the URL');
}

// Load Laravel
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Use Laravel's DB connection
use Illuminate\Support\Facades\DB;

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Images Updater</title>
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
        .service-item {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .service-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .service-details {
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
        }
        .success {
            color: #28a745;
            font-weight: bold;
        }
        .warning {
            color: #ffc107;
            font-weight: bold;
        }
        .error {
            color: #dc3545;
            font-weight: bold;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .status-updated {
            background: #d4edda;
            color: #155724;
        }
        .status-default {
            background: #fff3cd;
            color: #856404;
        }
        .summary {
            background: #e7f3ff;
            border: 2px solid #667eea;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .summary h2 {
            color: #667eea;
            margin-bottom: 15px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
        }
        .summary-item {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 8px;
        }
        .summary-number {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
        }
        .summary-label {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }
        .image-preview {
            width: 100%;
            max-width: 300px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            margin-top: 10px;
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
            <h1>🖼️ Service Images Updater</h1>
            <p>Mise à jour automatique des images des services</p>
        </div>
        
        <div class="content">
            <?php
            try {
                // Mapping between service titles and images
                $imageMapping = [
                    // Installation
                    'installation de toiture' => '/uploads/services/1754239886_installation toiture.jpg',
                    'installation toiture' => '/uploads/services/1754239886_installation toiture.jpg',
                    'pose de toiture' => '/uploads/services/1754239886_installation toiture.jpg',
                    'installation' => '/uploads/services/1754239886_installation toiture.jpg',
                    
                    // Réparation
                    'réparation de fuite' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    'reparation de fuite' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    'réparation fuite' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    'réparation' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    'reparation' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    'fuite' => '/uploads/services/1754240415_réparation de fuite.jpg',
                    
                    // Entretien
                    'entretien de toiture' => '/uploads/services/1754240526_entretien.webp',
                    'entretien toiture' => '/uploads/services/1754240526_entretien.webp',
                    'entretien' => '/uploads/services/1754240526_entretien.webp',
                    
                    // Démoussage
                    'démoussage de toiture' => '/uploads/services/1754240626_démousage.jpg',
                    'demoussage de toiture' => '/uploads/services/1754240626_démousage.jpg',
                    'démoussage toiture' => '/uploads/services/1754240626_démousage.jpg',
                    'demoussage toiture' => '/uploads/services/1754240626_démousage.jpg',
                    'démoussage' => '/uploads/services/1754240626_démousage.jpg',
                    'demoussage' => '/uploads/services/1754240626_démousage.jpg',
                    
                    // Nettoyage
                    'nettoyage de toiture' => '/uploads/services/1754240785_nettoyage.webp',
                    'nettoyage toiture' => '/uploads/services/1754240785_nettoyage.webp',
                    'nettoyage' => '/uploads/services/1754240785_nettoyage.webp',
                ];
                
                // Get all services
                $services = DB::table('services')->orderBy('id')->get();
                
                $updated = 0;
                $skipped = 0;
                $results = [];
                
                foreach ($services as $service) {
                    $foundImage = null;
                    $titleLower = mb_strtolower($service->title, 'UTF-8');
                    $matchedKey = '';
                    
                    // Check exact match first
                    if (isset($imageMapping[$service->title])) {
                        $foundImage = $imageMapping[$service->title];
                        $matchedKey = $service->title;
                    } elseif (isset($imageMapping[$titleLower])) {
                        $foundImage = $imageMapping[$titleLower];
                        $matchedKey = $titleLower;
                    } else {
                        // Try partial matches
                        foreach ($imageMapping as $key => $imagePath) {
                            $keyLower = mb_strtolower($key, 'UTF-8');
                            if (stripos($titleLower, $keyLower) !== false || stripos($keyLower, $titleLower) !== false) {
                                $foundImage = $imagePath;
                                $matchedKey = $key;
                                break;
                            }
                        }
                    }
                    
                    if ($foundImage) {
                        // Update the service image
                        DB::table('services')
                            ->where('id', $service->id)
                            ->update([
                                'image' => $foundImage,
                                'updated_at' => now()
                            ]);
                        
                        $results[] = [
                            'id' => $service->id,
                            'title' => $service->title,
                            'old_image' => $service->image,
                            'new_image' => $foundImage,
                            'status' => 'updated',
                            'matched' => $matchedKey
                        ];
                        $updated++;
                    } else {
                        // Use default image if no match found
                        $defaultImage = '/uploads/services/1754237525_images.jpg';
                        DB::table('services')
                            ->where('id', $service->id)
                            ->update([
                                'image' => $defaultImage,
                                'updated_at' => now()
                            ]);
                        
                        $results[] = [
                            'id' => $service->id,
                            'title' => $service->title,
                            'old_image' => $service->image,
                            'new_image' => $defaultImage,
                            'status' => 'default',
                            'matched' => 'default image'
                        ];
                        $skipped++;
                    }
                }
                
                // Display summary
                echo '<div class="summary">';
                echo '<h2>📊 Résumé de la mise à jour</h2>';
                echo '<div class="summary-grid">';
                echo '<div class="summary-item">';
                echo '<div class="summary-number">' . count($services) . '</div>';
                echo '<div class="summary-label">Total Services</div>';
                echo '</div>';
                echo '<div class="summary-item">';
                echo '<div class="summary-number">' . $updated . '</div>';
                echo '<div class="summary-label">Images Correspondantes</div>';
                echo '</div>';
                echo '<div class="summary-item">';
                echo '<div class="summary-number">' . $skipped . '</div>';
                echo '<div class="summary-label">Image Par Défaut</div>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
                
                // Display results
                echo '<h2 style="margin-bottom: 20px; color: #333;">📝 Détails des mises à jour</h2>';
                
                foreach ($results as $result) {
                    echo '<div class="service-item">';
                    echo '<div class="service-title">' . htmlspecialchars($result['title']) . '</div>';
                    
                    $statusClass = $result['status'] === 'updated' ? 'status-updated' : 'status-default';
                    $statusText = $result['status'] === 'updated' ? '✓ Mise à jour' : '⚠ Image par défaut';
                    echo '<span class="status-badge ' . $statusClass . '">' . $statusText . '</span>';
                    
                    echo '<div class="service-details">';
                    
                    echo '<div class="detail-item">';
                    echo '<span class="detail-label">ID Service:</span>';
                    echo '<span class="detail-value">' . $result['id'] . '</span>';
                    echo '</div>';
                    
                    echo '<div class="detail-item">';
                    echo '<span class="detail-label">Correspondance:</span>';
                    echo '<span class="detail-value">' . htmlspecialchars($result['matched']) . '</span>';
                    echo '</div>';
                    
                    echo '<div class="detail-item">';
                    echo '<span class="detail-label">Ancienne image:</span>';
                    echo '<span class="detail-value">' . ($result['old_image'] ?: '<em>Aucune</em>') . '</span>';
                    echo '</div>';
                    
                    echo '<div class="detail-item">';
                    echo '<span class="detail-label">Nouvelle image:</span>';
                    echo '<span class="detail-value success">' . htmlspecialchars($result['new_image']) . '</span>';
                    echo '</div>';
                    
                    echo '</div>';
                    
                    // Show image preview
                    $imageUrl = 'https://api.bnbatiment.com/api' . $result['new_image'];
                    echo '<img src="' . $imageUrl . '" alt="' . htmlspecialchars($result['title']) . '" class="image-preview">';
                    
                    echo '</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="service-item" style="border-left-color: #dc3545;">';
                echo '<div class="service-title error">❌ Erreur</div>';
                echo '<p>' . htmlspecialchars($e->getMessage()) . '</p>';
                echo '</div>';
            }
            ?>
        </div>
        
        <div class="footer">
            <p><strong>⚠️ IMPORTANT:</strong> Pour des raisons de sécurité, supprimez ce fichier après utilisation!</p>
            <p style="margin-top: 10px; color: #666;">Fichier: <code>public_html/api/public/update_service_images.php</code></p>
        </div>
    </div>
</body>
</html>

