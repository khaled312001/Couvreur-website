<?php

// Database connection details for Hostinger
    $host = 'srv448.hstgr.io';
$port = '3306';
$dbname = 'u696043789_bnbatiment';
$username = 'u696043789_bnbatiment';
$password = 'support@Passord123';

try {
    // Connect to database
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "✓ Connected to database successfully!\n\n";
    
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
    $stmt = $pdo->query("SELECT * FROM services ORDER BY id");
    $services = $stmt->fetchAll();
    
    echo "Total services found: " . count($services) . "\n\n";
    
    $updated = 0;
    $skipped = 0;
    
    foreach ($services as $service) {
        echo "Processing: " . $service['title'] . "\n";
        echo "Current image: " . ($service['image'] ?: 'None') . "\n";
        
        // Try to find matching image
        $foundImage = null;
        $titleLower = mb_strtolower($service['title'], 'UTF-8');
        
        // Check exact match first
        if (isset($imageMapping[$service['title']])) {
            $foundImage = $imageMapping[$service['title']];
        } elseif (isset($imageMapping[$titleLower])) {
            $foundImage = $imageMapping[$titleLower];
        } else {
            // Try partial matches
            foreach ($imageMapping as $key => $imagePath) {
                $keyLower = mb_strtolower($key, 'UTF-8');
                if (stripos($titleLower, $keyLower) !== false || stripos($keyLower, $titleLower) !== false) {
                    $foundImage = $imagePath;
                    echo "  → Matched with: $key\n";
                    break;
                }
            }
        }
        
        if ($foundImage) {
            // Update the service image
            $updateStmt = $pdo->prepare("UPDATE services SET image = ?, updated_at = NOW() WHERE id = ?");
            $updateStmt->execute([$foundImage, $service['id']]);
            echo "✓ Updated with: " . $foundImage . "\n";
            $updated++;
        } else {
            // Use default image if no match found
            $defaultImage = '/uploads/services/1754237525_images.jpg';
            $updateStmt = $pdo->prepare("UPDATE services SET image = ?, updated_at = NOW() WHERE id = ?");
            $updateStmt->execute([$defaultImage, $service['id']]);
            echo "⚠ No match found, using default image\n";
            $skipped++;
        }
        
        echo "---\n";
    }
    
    echo "\n=================================\n";
    echo "Update Summary:\n";
    echo "=================================\n";
    echo "Total services: " . count($services) . "\n";
    echo "Updated with matching images: $updated\n";
    echo "Updated with default image: $skipped\n";
    echo "=================================\n\n";
    
    // Show final results
    echo "Final service list:\n";
    echo "=================================\n";
    
    $stmt = $pdo->query("SELECT id, title, image, category FROM services ORDER BY id");
    $services = $stmt->fetchAll();
    
    foreach ($services as $service) {
        echo "\nID: " . $service['id'] . "\n";
        echo "Title: " . $service['title'] . "\n";
        echo "Category: " . ($service['category'] ?: 'N/A') . "\n";
        echo "Image: " . $service['image'] . "\n";
        
        // Verify image file exists
        $imagePath = __DIR__ . '/public' . $service['image'];
        if (file_exists($imagePath)) {
            echo "✓ Image file exists locally\n";
        } else {
            echo "✗ Image file NOT found locally: $imagePath\n";
        }
        echo "---\n";
    }
    
    echo "\n✓ All done! Images have been updated in the database.\n";
    echo "\nNote: Make sure the image files are uploaded to the server at:\n";
    echo "  → /public_html/api/public/uploads/services/\n\n";
    
} catch (PDOException $e) {
    echo "✗ Database connection failed!\n";
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nPlease verify:\n";
    echo "  1. Database credentials are correct\n";
    echo "  2. Remote MySQL access is enabled in Hostinger\n";
    echo "  3. Your IP address is whitelisted for remote access\n";
    exit(1);
}

