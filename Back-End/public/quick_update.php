<?php
/**
 * Quick Service Images Updater
 * Upload this file to: public_html/api/public/quick_update.php
 * Visit: https://api.bnbatiment.com/quick_update.php?password=update2024
 */

$password = $_GET['password'] ?? '';
if ($password !== 'update2024') die('Access denied');

// Load Laravel
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "<h1>Service Images Updater</h1>";

try {
    // Image mapping
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
    
    $services = DB::table('services')->get();
    $updated = 0;
    
    foreach ($services as $service) {
        $title = strtolower($service->title);
        $found = false;
        
        foreach ($images as $key => $image) {
            if (strpos($title, $key) !== false) {
                DB::table('services')->where('id', $service->id)->update([
                    'image' => $image,
                    'updated_at' => now()
                ]);
                echo "<p>✅ {$service->title} → {$image}</p>";
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
            echo "<p>⚠️ {$service->title} → {$default} (default)</p>";
            $updated++;
        }
    }
    
    echo "<h2>✅ Updated {$updated} services!</h2>";
    echo "<p><strong>Delete this file after use!</strong></p>";
    
} catch (Exception $e) {
    echo "<p>❌ Error: " . $e->getMessage() . "</p>";
}
