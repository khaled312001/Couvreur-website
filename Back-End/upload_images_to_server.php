<?php
/**
 * Script to upload service images to Hostinger server
 * Run this script locally to upload images to the server
 */

echo "=== Uploading Service Images to Hostinger Server ===\n\n";

// Server details
$serverUrl = 'https://api.bnbatiment.com';
$uploadEndpoint = '/api/upload-service-image';

// Local images directory
$imagesDir = __DIR__ . '/public/uploads/services/';

// Image files to upload
$imageFiles = [
    '1754237525_images.jpg',
    '1754239886_installation toiture.jpg', 
    '1754240415_réparation de fuite.jpg',
    '1754240526_entretien.webp',
    '1754240626_démousage.jpg',
    '1754240785_nettoyage.webp'
];

echo "Checking local images...\n";
foreach ($imageFiles as $imageFile) {
    $filePath = $imagesDir . $imageFile;
    if (file_exists($filePath)) {
        $size = filesize($filePath);
        echo "✓ Found: $imageFile ($size bytes)\n";
    } else {
        echo "✗ Missing: $imageFile\n";
    }
}

echo "\n=== Upload Instructions ===\n";
echo "To upload images to the server, you need to:\n\n";
echo "1. Access your Hostinger File Manager\n";
echo "2. Navigate to: public_html/api/public/uploads/services/\n";
echo "3. Upload these 6 image files:\n\n";

foreach ($imageFiles as $imageFile) {
    echo "   - $imageFile\n";
}

echo "\n4. After uploading, test the images:\n";
foreach ($imageFiles as $imageFile) {
    echo "   https://api.bnbatiment.com/api/uploads/services/$imageFile\n";
}

echo "\n=== Alternative: Direct Upload Script ===\n";
echo "If you want to upload via FTP/SFTP, use these commands:\n\n";
echo "FTP Host: ftp.bnbatiment.com\n";
echo "Username: [your FTP username]\n";
echo "Password: [your FTP password]\n";
echo "Remote Directory: /public_html/api/public/uploads/services/\n\n";

echo "=== Manual Upload Steps ===\n";
echo "1. Login to Hostinger Control Panel\n";
echo "2. Go to File Manager\n";
echo "3. Navigate to: public_html/api/public/uploads/services/\n";
echo "4. Upload all 6 image files from: F:\\Couvreur project\\Back-End\\public\\uploads\\services\\\n";
echo "5. Verify upload by visiting the URLs above\n\n";

echo "=== Testing Upload ===\n";
echo "After uploading, run this command to test:\n";
echo "curl -I \"https://api.bnbatiment.com/api/uploads/services/1754240626_démousage.jpg\"\n\n";

echo "Expected response: HTTP/1.1 200 OK\n";
echo "If you get 404 or 500, the upload didn't work properly.\n\n";

echo "=== Database Update ===\n";
echo "After images are uploaded, run the database update:\n";
echo "https://api.bnbatiment.com/final_update.php?password=update2024\n\n";

echo "=== Complete Process ===\n";
echo "1. Upload images to server ✓\n";
echo "2. Update database with image paths ✓\n";
echo "3. Test frontend pages ✓\n\n";

echo "Script completed!\n";
?>
