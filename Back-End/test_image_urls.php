<?php
/**
 * Test script to verify service images are accessible
 */

echo "=== Testing Service Images Accessibility ===\n\n";

// Test URLs with corrected paths
$testUrls = [
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754239886_installation toiture.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240415_réparation de fuite.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240526_entretien.webp',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240626_démousage.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240785_nettoyage.webp'
];

echo "Testing corrected image URLs:\n\n";

foreach ($testUrls as $url) {
    echo "Testing: " . basename($url) . "\n";
    echo "URL: $url\n";
    
    // Use cURL to test the URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        echo "❌ Error: $error\n";
    } else {
        switch ($httpCode) {
            case 200:
                echo "✅ Success: HTTP $httpCode - Image accessible\n";
                break;
            case 404:
                echo "❌ Not Found: HTTP $httpCode - Image not found\n";
                break;
            case 500:
                echo "❌ Server Error: HTTP $httpCode - Server error\n";
                break;
            default:
                echo "⚠️  Warning: HTTP $httpCode - Unexpected response\n";
        }
    }
    echo "\n";
}

echo "=== Summary ===\n";
echo "If all images show ✅ Success, the paths are correct.\n";
echo "If any show ❌ errors, check the file paths on the server.\n\n";

echo "=== Alternative Test URLs ===\n";
echo "You can also test these URLs directly in your browser:\n\n";
foreach ($testUrls as $url) {
    echo "$url\n";
}

echo "\n=== Next Steps ===\n";
echo "1. If images are accessible, update the database with correct paths\n";
echo "2. Run: https://api.bnbatiment.com/final_update.php?password=update2024\n";
echo "3. Test the frontend pages\n\n";

echo "Script completed!\n";
?>
