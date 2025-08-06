<?php
// Safe test file without complex headers
echo "Testing PHP...<br>";
echo "PHP Version: " . PHP_VERSION . "<br>";
echo "Server: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "<br>";
echo "Time: " . date('Y-m-d H:i:s') . "<br>";

// Check if we can create JSON
$test_data = ['status' => 'working', 'time' => date('Y-m-d H:i:s')];
echo "JSON Test: " . json_encode($test_data) . "<br>";

// Check Laravel files
$files_to_check = ['bootstrap/app.php', 'vendor/autoload.php', 'routes/api.php'];
echo "<h3>Laravel Files Check:</h3>";
foreach ($files_to_check as $file) {
    $exists = file_exists($file) ? "EXISTS" : "MISSING";
    echo "$file: $exists<br>";
}
?> 