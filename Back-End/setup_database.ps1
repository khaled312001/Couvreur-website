# سكريبت إعداد قاعدة البيانات - مشروع Couvreur
# PowerShell Script for Database Setup

Write-Host "=== إعداد قاعدة البيانات - مشروع Couvreur ===" -ForegroundColor Green
Write-Host ""

# التحقق من وجود Composer
Write-Host "التحقق من Composer..." -ForegroundColor Yellow
if (!(Get-Command composer -ErrorAction SilentlyContinue)) {
    Write-Host "خطأ: Composer غير مثبت أو غير موجود في PATH" -ForegroundColor Red
    Write-Host "يرجى تثبيت Composer من https://getcomposer.org/" -ForegroundColor Red
    exit 1
}

# التحقق من وجود PHP
Write-Host "التحقق من PHP..." -ForegroundColor Yellow
if (!(Get-Command php -ErrorAction SilentlyContinue)) {
    Write-Host "خطأ: PHP غير مثبت أو غير موجود في PATH" -ForegroundColor Red
    Write-Host "يرجى تثبيت PHP أو إضافته إلى PATH" -ForegroundColor Red
    exit 1
}

# إنشاء ملف .env إذا لم يكن موجوداً
Write-Host "إنشاء ملف .env..." -ForegroundColor Yellow
$envContent = @"
APP_NAME="Couvreur Project"
APP_ENV=local
APP_KEY=base64:your-app-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

# إعدادات قاعدة البيانات MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=couvreur_db
DB_USERNAME=root
DB_PASSWORD=

# إعدادات MySQL إضافية
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@couvreur.fr"
MAIL_FROM_NAME="`${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="`${APP_NAME}"
VITE_PUSHER_APP_KEY="`${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="`${PUSHER_HOST}"
VITE_PUSHER_PORT="`${PUSHER_PORT}"
VITE_PUSHER_SCHEME="`${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="`${PUSHER_APP_CLUSTER}"
"@

if (!(Test-Path ".env")) {
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "تم إنشاء ملف .env بنجاح" -ForegroundColor Green
} else {
    Write-Host "ملف .env موجود بالفعل" -ForegroundColor Yellow
}

# تثبيت التبعيات
Write-Host "تثبيت التبعيات..." -ForegroundColor Yellow
composer install

# إنشاء مفتاح التطبيق
Write-Host "إنشاء مفتاح التطبيق..." -ForegroundColor Yellow
php artisan key:generate

# تشغيل الهجرات
Write-Host "تشغيل الهجرات..." -ForegroundColor Yellow
php artisan migrate

# تشغيل البذور
Write-Host "تشغيل البذور..." -ForegroundColor Yellow
php artisan db:seed

Write-Host ""
Write-Host "=== تم إعداد قاعدة البيانات بنجاح! ===" -ForegroundColor Green
Write-Host ""
Write-Host "بيانات تسجيل الدخول الافتراضية:" -ForegroundColor Cyan
Write-Host "البريد الإلكتروني: admin@couvreur.fr" -ForegroundColor White
Write-Host "كلمة المرور: password" -ForegroundColor White
Write-Host ""
Write-Host "لتشغيل الخادم، استخدم الأمر:" -ForegroundColor Yellow
Write-Host "php artisan serve" -ForegroundColor White
Write-Host ""
Write-Host "ثم افتح المتصفح على: http://localhost:8000" -ForegroundColor Yellow 