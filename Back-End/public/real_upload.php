<?php
/**
 * Real Image Upload Script
 * This script creates the actual image files from base64 data
 * 
 * Upload this file to: public_html/api/real_upload.php
 * Visit: https://api.bnbatiment.com/real_upload.php?password=update2024
 */

$password = $_GET['password'] ?? '';
if ($password !== 'update2024') die('Access denied');

echo "<h1>🖼️ Real Service Images Upload</h1>";
echo "<style>body{font-family:Arial,sans-serif;margin:20px;} .success{color:green;} .error{color:red;} .warning{color:orange;} .info{color:blue;} pre{background:#f5f5f5;padding:10px;border-radius:5px;}</style>";

// Create upload directory
$uploadDir = __DIR__ . '/public/uploads/services/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

echo "<h2>📁 Creating Images from Base64 Data</h2>";

// Sample images as base64 (you would replace these with actual image data)
$images = [
    '1754237525_images.jpg' => [
        'data' => '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        'description' => 'Default service image'
    ],
    '1754239886_installation toiture.jpg' => [
        'data' => '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        'description' => 'Installation service image'
    ],
    '1754240415_réparation de fuite.jpg' => [
        'data' => '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        'description' => 'Repair service image'
    ],
    '1754240526_entretien.webp' => [
        'data' => 'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA0pWgAAA',
        'description' => 'Maintenance service image'
    ],
    '1754240626_démousage.jpg' => [
        'data' => '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        'description' => 'Demossing service image'
    ],
    '1754240785_nettoyage.webp' => [
        'data' => 'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA0pWgAAA',
        'description' => 'Cleaning service image'
    ]
];

$uploaded = 0;
$failed = 0;

foreach ($images as $filename => $imageData) {
    echo "<h3>📷 Processing: {$filename}</h3>";
    echo "<p class='info'>{$imageData['description']}</p>";
    
    $filePath = $uploadDir . $filename;
    
    // Decode base64 and create image file
    $imageDataDecoded = base64_decode($imageData['data']);
    
    if ($imageDataDecoded !== false) {
        if (file_put_contents($filePath, $imageDataDecoded)) {
            $fileSize = filesize($filePath);
            echo "<p class='success'>✅ Created: {$filename} ({$fileSize} bytes)</p>";
            $uploaded++;
        } else {
            echo "<p class='error'>❌ Failed to write: {$filename}</p>";
            $failed++;
        }
    } else {
        echo "<p class='error'>❌ Failed to decode base64: {$filename}</p>";
        $failed++;
    }
}

echo "<h2>📊 Upload Summary</h2>";
echo "<div style='background:#e7f3ff;padding:20px;border-radius:10px;border:2px solid #007bff;'>";
echo "<h3>📈 Results:</h3>";
echo "<p><strong>Total Images:</strong> " . count($images) . "</p>";
echo "<p><strong>Successfully Created:</strong> {$uploaded}</p>";
echo "<p><strong>Failed:</strong> {$failed}</p>";
echo "<p><strong>Success Rate:</strong> " . round(($uploaded / count($images)) * 100, 1) . "%</p>";
echo "</div>";

echo "<h2>🔗 Image URLs</h2>";
echo "<p>Your images are now available at:</p>";
echo "<ul>";
foreach ($images as $filename => $imageData) {
    $url = "https://api.bnbatiment.com/api/uploads/services/{$filename}";
    echo "<li><a href='{$url}' target='_blank'>{$filename}</a></li>";
}
echo "</ul>";

echo "<h2>✅ Next Steps</h2>";
echo "<div style='background:#d4edda;padding:20px;border-radius:10px;border:2px solid #28a745;'>";
echo "<p><strong>Now run the service update script:</strong></p>";
echo "<p><a href='final_update.php?password=update2024' target='_blank' style='background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;'>🚀 Update Services</a></p>";
echo "</div>";

echo "<div style='background:#f8d7da;padding:20px;border-radius:10px;border:2px solid #dc3545;margin-top:20px;'>";
echo "<p style='color:red;font-weight:bold;'>⚠️ IMPORTANT: Delete this file after use for security!</p>";
echo "</div>";
