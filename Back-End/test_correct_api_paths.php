<?php
/**
 * Final test script to verify all service images with correct API paths
 */

echo "=== Final Test: All Service Images with Correct API Paths ===\n\n";

// All service images with correct API paths
$serviceImages = [
    'Installation de toiture' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754239886_installation%20toiture.jpg',
    'Réparation des fuites' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240415_r%C3%A9paration%20de%20fuite.jpg',
    'Entretien de toiture' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240526_entretien.webp',
    'Démoussage et traitement hydrofuge' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240626_d%C3%A9mousage.jpg',
    'Nettoyage de toiture' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240785_nettoyage.webp',
    'Installation de gouttières' => 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg'
];

echo "Testing all service images with correct API paths:\n\n";

$workingImages = 0;
$totalImages = count($serviceImages);

foreach ($serviceImages as $serviceName => $url) {
    echo "Testing: $serviceName\n";
    echo "URL: $url\n";
    
    // Use cURL to test the URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        echo "❌ Error: $error\n";
    } else {
        switch ($httpCode) {
            case 200:
                echo "✅ SUCCESS: HTTP $httpCode - Image accessible\n";
                $workingImages++;
                break;
            case 404:
                echo "❌ Not Found: HTTP $httpCode\n";
                break;
            case 500:
                echo "❌ Server Error: HTTP $httpCode\n";
                break;
            default:
                echo "⚠️  Warning: HTTP $httpCode\n";
        }
    }
    echo "\n";
}

echo "=== Summary ===\n";
echo "Working images: $workingImages / $totalImages\n";

if ($workingImages === $totalImages) {
    echo "🎉 ALL IMAGES ARE WORKING! The frontend should display them correctly.\n";
} else {
    echo "⚠️  Some images are not working. Check the server configuration.\n";
}

echo "\n=== Corrected Frontend URLs ===\n";
echo "These URLs should work in your browser:\n\n";
foreach ($serviceImages as $serviceName => $url) {
    echo "• $serviceName: $url\n";
}

echo "\n=== Updated Files ===\n";
echo "✅ Front-End/src/utils/imageUtils.js - Updated with correct API paths\n";
echo "✅ Front-End/src/pages/Home.jsx - Updated with correct API paths\n";
echo "✅ Front-End/src/pages/Services/ServiceDetail.jsx - Updated with correct API paths\n";

echo "\n=== Next Steps ===\n";
echo "1. Test the URLs above in your browser\n";
echo "2. If all work, the frontend pages should display images correctly\n";
echo "3. Update the database with correct image paths if needed\n\n";

echo "=== Database Update ===\n";
echo "To update the database with correct paths, run:\n";
echo "https://api.bnbatiment.com/final_update.php?password=update2024\n\n";

echo "Script completed!\n";
?>
