<?php
/**
 * ملف اختبار للباك إند
 * ضع هذا الملف في المجلد الجذر على Hostinger
 */

// اختبار الاتصال بقاعدة البيانات
echo "<h2>اختبار قاعدة البيانات</h2>";
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=u696043789_bnbatiment;charset=utf8mb4",
        "u696043789_bnbatiment",
        "support@Passord123"
    );
    echo "✅ الاتصال بقاعدة البيانات نجح<br>";
    
    // اختبار جدول الخدمات
    $stmt = $pdo->query("SELECT COUNT(*) FROM services");
    $count = $stmt->fetchColumn();
    echo "✅ جدول الخدمات موجود - عدد السجلات: $count<br>";
    
    // اختبار جدول المدونة
    $stmt = $pdo->query("SELECT COUNT(*) FROM blog_posts");
    $count = $stmt->fetchColumn();
    echo "✅ جدول المدونة موجود - عدد السجلات: $count<br>";
    
    // اختبار جدول المعرض
    $stmt = $pdo->query("SELECT COUNT(*) FROM gallery_items");
    $count = $stmt->fetchColumn();
    echo "✅ جدول المعرض موجود - عدد السجلات: $count<br>";
    
    // اختبار جدول التوصيات
    $stmt = $pdo->query("SELECT COUNT(*) FROM testimonials");
    $count = $stmt->fetchColumn();
    echo "✅ جدول التوصيات موجود - عدد السجلات: $count<br>";
    
} catch (PDOException $e) {
    echo "❌ خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage() . "<br>";
}

echo "<hr>";

// اختبار Laravel
echo "<h2>اختبار Laravel</h2>";
if (file_exists('vendor/autoload.php')) {
    echo "✅ ملف autoload.php موجود<br>";
    
    if (file_exists('bootstrap/app.php')) {
        echo "✅ ملف bootstrap/app.php موجود<br>";
        
        if (file_exists('.env')) {
            echo "✅ ملف .env موجود<br>";
        } else {
            echo "❌ ملف .env غير موجود<br>";
        }
        
        if (file_exists('storage/logs/laravel.log')) {
            echo "✅ مجلد storage/logs موجود<br>";
        } else {
            echo "❌ مجلد storage/logs غير موجود<br>";
        }
        
    } else {
        echo "❌ ملف bootstrap/app.php غير موجود<br>";
    }
} else {
    echo "❌ ملف autoload.php غير موجود<br>";
}

echo "<hr>";

// اختبار الـ API routes
echo "<h2>اختبار API Routes</h2>";
echo "<p>جرب هذه الروابط:</p>";
echo "<ul>";
echo "<li><a href='/api/services' target='_blank'>/api/services</a></li>";
echo "<li><a href='/api/blog' target='_blank'>/api/blog</a></li>";
echo "<li><a href='/api/gallery' target='_blank'>/api/gallery</a></li>";
echo "<li><a href='/api/testimonials' target='_blank'>/api/testimonials</a></li>";
echo "</ul>";

echo "<hr>";

// اختبار ملف .htaccess
echo "<h2>اختبار ملف .htaccess</h2>";
if (file_exists('.htaccess')) {
    echo "✅ ملف .htaccess موجود<br>";
    $htaccess = file_get_contents('.htaccess');
    if (strpos($htaccess, 'RewriteEngine On') !== false) {
        echo "✅ RewriteEngine مفعل<br>";
    } else {
        echo "❌ RewriteEngine غير مفعل<br>";
    }
} else {
    echo "❌ ملف .htaccess غير موجود<br>";
}

echo "<hr>";

// اختبار ملف index.php
echo "<h2>اختبار ملف index.php</h2>";
if (file_exists('index.php')) {
    echo "✅ ملف index.php موجود<br>";
} else {
    echo "❌ ملف index.php غير موجود<br>";
}

echo "<hr>";

// معلومات النظام
echo "<h2>معلومات النظام</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Current Directory: " . getcwd() . "<br>";
?> 