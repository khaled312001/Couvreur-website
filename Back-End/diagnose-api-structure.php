<?php
/**
 * API Structure Diagnostic File
 * Upload this to: public_html/api/diagnose-api-structure.php
 * Access: https://api.bnbatiment.com/diagnose-api-structure.php
 * 
 * This will help us figure out where files need to be placed
 */

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html><html><head><title>API Structure Diagnostic</title>";
echo "<style>body{font-family:monospace;padding:20px;background:#f5f5f5;}";
echo ".info{background:#fff;padding:15px;margin:10px 0;border-left:4px solid #007cba;}";
echo ".success{background:#d4edda;border-color:#28a745;}";
echo ".error{background:#f8d7da;border-color:#dc3545;}";
echo "pre{background:#f8f9fa;padding:10px;overflow-x:auto;}</style></head><body>";
echo "<h1>🔍 API Subdomain Structure Diagnostic</h1>";

echo "<div class='info'>";
echo "<h2>Current File Location</h2>";
echo "<pre>";
echo "File Path: " . __FILE__ . "\n";
echo "File Directory: " . __DIR__ . "\n";
echo "Document Root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'Not set') . "\n";
echo "Script Name: " . ($_SERVER['SCRIPT_NAME'] ?? 'Not set') . "\n";
echo "Request URI: " . ($_SERVER['REQUEST_URI'] ?? 'Not set') . "\n";
echo "</pre>";
echo "</div>";

echo "<div class='info'>";
echo "<h2>Directory Structure Check</h2>";
$currentDir = __DIR__;
$pathsToCheck = [
    '.',
    '..',
    '../Back-End',
    '../Back-End/public',
    '../../Back-End',
    '../../Back-End/public',
    'Back-End',
    'Back-End/public',
    'public',
];

echo "<pre>";
foreach ($pathsToCheck as $path) {
    $fullPath = $currentDir . '/' . $path;
    $realPath = realpath($fullPath);
    if ($realPath) {
        echo "✅ $path → $realPath\n";
        if (is_file($realPath)) {
            echo "   (file)\n";
        } elseif (is_dir($realPath)) {
            $files = scandir($realPath);
            $fileCount = count(array_filter($files, function($f) { return $f !== '.' && $f !== '..'; }));
            echo "   (directory, $fileCount items)\n";
        }
    } else {
        echo "❌ $path → Does not exist\n";
    }
}
echo "</pre>";
echo "</div>";

echo "<div class='info'>";
echo "<h2>Laravel Entry Point Check</h2>";
echo "<pre>";
$laravelPaths = [
    __DIR__ . '/Back-End/public/index.php',
    __DIR__ . '/../Back-End/public/index.php',
    __DIR__ . '/public/index.php',
    __DIR__ . '/index.php',
];

foreach ($laravelPaths as $path) {
    if (file_exists($path)) {
        echo "✅ Found: $path\n";
        echo "   Size: " . filesize($path) . " bytes\n";
        echo "   Modified: " . date('Y-m-d H:i:s', filemtime($path)) . "\n";
    } else {
        echo "❌ Not found: $path\n";
    }
}
echo "</pre>";
echo "</div>";

echo "<div class='info'>";
echo "<h2>Test Files Check</h2>";
echo "<pre>";
$testFiles = [
    __DIR__ . '/test-cors-simple.php',
    __DIR__ . '/test-cors-headers.php',
    __DIR__ . '/Back-End/public/test-cors-headers.php',
    __DIR__ . '/../Back-End/public/test-cors-headers.php',
];

foreach ($testFiles as $file) {
    if (file_exists($file)) {
        echo "✅ " . basename($file) . " → $file\n";
    } else {
        echo "❌ " . basename($file) . " → Not found\n";
    }
}
echo "</pre>";
echo "</div>";

echo "<div class='info'>";
echo "<h2>Recommended File Locations</h2>";
echo "<pre>";
echo "Based on current structure:\n\n";

$docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
$currentFile = __DIR__;

if ($docRoot && strpos($currentFile, $docRoot) === 0) {
    $relativePath = substr($currentFile, strlen($docRoot));
    echo "📁 Document Root: $docRoot\n";
    echo "📁 Current File Relative: $relativePath\n\n";
    
    echo "✅ Upload test files to:\n";
    echo "   $docRoot/test-cors-simple.php\n";
    echo "   (Same level as this diagnostic file)\n\n";
    
    if (file_exists(__DIR__ . '/Back-End/public/index.php')) {
        echo "✅ Laravel public folder at:\n";
        echo "   " . realpath(__DIR__ . '/Back-End/public') . "\n\n";
        echo "✅ Upload Laravel fixes to:\n";
        echo "   " . realpath(__DIR__ . '/Back-End/public') . "/index.php\n";
        echo "   " . realpath(__DIR__ . '/Back-End/public') . "/.htaccess\n";
    }
}
echo "</pre>";
echo "</div>";

echo "<div class='success'>";
echo "<h2>✅ Next Steps</h2>";
echo "<ol>";
echo "<li>Note the 'Document Root' path above</li>";
echo "<li>Upload test files to that root directory</li>";
echo "<li>If Laravel is in Back-End/public/, upload fixes there</li>";
echo "<li>Test: https://api.bnbatiment.com/test-cors-simple.php</li>";
echo "</ol>";
echo "</div>";

echo "</body></html>";

