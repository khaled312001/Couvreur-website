<?php
/**
 * Test script to verify encoded service image URLs
 */

echo "=== Testing Encoded Service Image URLs ===\n\n";

// Test URLs with URL encoding
$testUrls = [
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754239886_installation%20toiture.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240415_r%C3%A9paration%20de%20fuite.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240526_entretien.webp',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240626_d%C3%A9mousage.jpg',
    'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240785_nettoyage.webp'
];

echo "Testing URL-encoded image URLs:\n\n";

foreach ($testUrls as $url) {
    $filename = basename(urldecode($url));
    echo "Testing: $filename\n";
    echo "URL: $url\n";
    
    // Use cURL to test the URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
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
echo "✅ Working images can be used in the frontend\n";
echo "❌ Non-working images need to be fixed on the server\n\n";

echo "=== Frontend URLs to Test ===\n";
echo "Test these URLs in your browser:\n\n";
foreach ($testUrls as $url) {
    echo "$url\n";
}

echo "\n=== Next Steps ===\n";
echo "1. Test the URLs above in your browser\n";
echo "2. If images work, the frontend should display them correctly\n";
echo "3. If not, check the file paths on the server\n\n";

echo "=== Database Update ===\n";
echo "After confirming images work, update the database:\n";
echo "https://api.bnbatiment.com/final_update.php?password=update2024\n\n";

echo "Script completed!\n";
?>
