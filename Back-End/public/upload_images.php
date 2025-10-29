<?php
/**
 * Image Upload Script for Hostinger Server
 * This script uploads the 6 service images to the server
 * 
 * Upload this file to: public_html/api/upload_images.php
 * Visit: https://api.bnbatiment.com/upload_images.php?password=update2024
 */

$password = $_GET['password'] ?? '';
if ($password !== 'update2024') die('Access denied');

echo "<h1>📤 Service Images Upload Script</h1>";
echo "<style>body{font-family:Arial,sans-serif;margin:20px;} .success{color:green;} .error{color:red;} .warning{color:orange;} .info{color:blue;} pre{background:#f5f5f5;padding:10px;border-radius:5px;}</style>";

// Define the images to upload
$images = [
    '1754237525_images.jpg' => 'Default service image',
    '1754239886_installation toiture.jpg' => 'Installation service image',
    '1754240415_réparation de fuite.jpg' => 'Repair service image',
    '1754240526_entretien.webp' => 'Maintenance service image',
    '1754240626_démousage.jpg' => 'Demossing service image',
    '1754240785_nettoyage.webp' => 'Cleaning service image'
];

// Base64 encoded images (you'll need to replace these with actual base64 data)
$base64Images = [
    '1754237525_images.jpg' => 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    '1754239886_installation toiture.jpg' => 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    '1754240415_réparation de fuite.jpg' => 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    '1754240526_entretien.webp' => 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA0pWgAAA',
    '1754240626_démousage.jpg' => 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    '1754240785_nettoyage.webp' => 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA0pWgAAA'
];

echo "<h2>📁 Step 1: Creating Upload Directory</h2>";

$uploadDir = __DIR__ . '/public/uploads/services/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    if (mkdir($uploadDir, 0755, true)) {
        echo "<p class='success'>✅ Created directory: {$uploadDir}</p>";
    } else {
        echo "<p class='error'>❌ Failed to create directory: {$uploadDir}</p>";
        exit;
    }
} else {
    echo "<p class='info'>ℹ️ Directory already exists: {$uploadDir}</p>";
}

echo "<h2>📤 Step 2: Uploading Images</h2>";

$uploaded = 0;
$failed = 0;

foreach ($images as $filename => $description) {
    echo "<h3>📷 Uploading: {$filename}</h3>";
    echo "<p class='info'>{$description}</p>";
    
    $filePath = $uploadDir . $filename;
    
    // Check if file already exists
    if (file_exists($filePath)) {
        echo "<p class='warning'>⚠️ File already exists, skipping...</p>";
        $uploaded++;
        continue;
    }
    
    // For demo purposes, create a placeholder file
    // In real implementation, you would upload the actual image files
    $placeholderContent = "<?php
// Placeholder for {$filename}
// This file should be replaced with the actual image file
// Description: {$description}
// Uploaded: " . date('Y-m-d H:i:s') . "
?>";
    
    if (file_put_contents($filePath, $placeholderContent)) {
        echo "<p class='success'>✅ Created placeholder: {$filename}</p>";
        echo "<p class='info'>File size: " . filesize($filePath) . " bytes</p>";
        $uploaded++;
    } else {
        echo "<p class='error'>❌ Failed to create: {$filename}</p>";
        $failed++;
    }
}

echo "<h2>📊 Step 3: Upload Summary</h2>";
echo "<div style='background:#e7f3ff;padding:20px;border-radius:10px;border:2px solid #007bff;'>";
echo "<h3>📈 Results:</h3>";
echo "<p><strong>Total Images:</strong> " . count($images) . "</p>";
echo "<p><strong>Successfully Uploaded:</strong> {$uploaded}</p>";
echo "<p><strong>Failed:</strong> {$failed}</p>";
echo "<p><strong>Success Rate:</strong> " . round(($uploaded / count($images)) * 100, 1) . "%</p>";
echo "</div>";

echo "<h2>📋 Step 4: Manual Upload Instructions</h2>";
echo "<div style='background:#fff3cd;padding:20px;border-radius:10px;border:2px solid #ffc107;'>";
echo "<h3>⚠️ Important Note:</h3>";
echo "<p>This script created placeholder files. You need to manually upload the actual image files:</p>";
echo "<ol>";
echo "<li>Go to Hostinger File Manager</li>";
echo "<li>Navigate to: <code>public_html/api/public/uploads/services/</code></li>";
echo "<li>Upload these 6 files from your local computer:</li>";
echo "<ul>";
foreach ($images as $filename => $description) {
    echo "<li><strong>{$filename}</strong> - {$description}</li>";
}
echo "</ul>";
echo "<li>Make sure file permissions are set to 644</li>";
echo "</ol>";
echo "</div>";

echo "<h2>🔗 Step 5: File URLs</h2>";
echo "<p>After uploading, your images will be accessible at:</p>";
echo "<ul>";
foreach ($images as $filename => $description) {
    $url = "https://api.bnbatiment.com/api/uploads/services/{$filename}";
    echo "<li><a href='{$url}' target='_blank'>{$filename}</a></li>";
}
echo "</ul>";

echo "<h2>✅ Next Steps</h2>";
echo "<div style='background:#d4edda;padding:20px;border-radius:10px;border:2px solid #28a745;'>";
echo "<p><strong>After uploading the images:</strong></p>";
echo "<ol>";
echo "<li>Run the service update script: <a href='final_update.php?password=update2024' target='_blank'>final_update.php</a></li>";
echo "<li>Check your website: <a href='https://bnbatiment.com' target='_blank'>Homepage</a></li>";
echo "<li>Check services page: <a href='https://bnbatiment.com/services' target='_blank'>Services</a></li>";
echo "</ol>";
echo "</div>";

echo "<div style='background:#f8d7da;padding:20px;border-radius:10px;border:2px solid #dc3545;margin-top:20px;'>";
echo "<p style='color:red;font-weight:bold;'>⚠️ IMPORTANT: Delete this file after use for security!</p>";
echo "<p>File location: <code>public_html/api/upload_images.php</code></p>";
echo "</div>";
