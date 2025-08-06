# حل مشكلة أخطاء 404 في API

## المشكلة
الفرونت إند يحصل على أخطاء 404 عند محاولة الاتصال بالباك إند:
- `GET https://bnbatiment.com/api/services 404 (Not Found)`
- `GET https://bnbatiment.com/api/blog 404 (Not Found)`
- `GET https://bnbatiment.com/api/gallery 404 (Not Found)`
- `GET https://bnbatiment.com/api/testimonials 404 (Not Found)`

## الحلول

### 1. تحقق من الباك إند أولاً

ارفع ملف `test_api.php` إلى المجلد الجذر على Hostinger وافتحه:
```
https://bnbatiment.com/test_api.php
```

### 2. تأكد من وجود الملفات الأساسية

في مجلد `public_html` على Hostinger يجب أن يكون لديك:

```
public_html/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env
├── .htaccess
├── artisan
├── composer.json
├── index.php
└── test_api.php
```

### 3. تحقق من ملف .htaccess

تأكد من وجود ملف `.htaccess` في المجلد الجذر بالمحتوى:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### 4. تحقق من ملف index.php

تأكد من وجود ملف `index.php` في المجلد الجذر بالمحتوى:

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
```

### 5. تحقق من ملف .env

تأكد من وجود ملف `.env` بالمحتوى الصحيح:

```env
APP_NAME="Couvreur Project"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://bnbatiment.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u696043789_bnbatiment
DB_USERNAME=u696043789_bnbatiment
DB_PASSWORD=support@Passord123
```

### 6. شغل الأوامر المطلوبة

في Terminal على Hostinger:

```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate
```

### 7. تحقق من صلاحيات الملفات

```bash
chmod 755 storage/
chmod 755 bootstrap/cache/
chmod 644 .env
```

### 8. اختبار API Routes

بعد تطبيق الحلول أعلاه، اختبر:

```bash
curl https://bnbatiment.com/api/services
curl https://bnbatiment.com/api/blog
curl https://bnbatiment.com/api/gallery
curl https://bnbatiment.com/api/testimonials
```

### 9. تحقق من Logs

افتح ملف `storage/logs/laravel.log` لمعرفة الأخطاء التفصيلية.

### 10. إذا استمرت المشكلة

1. تأكد من أن mod_rewrite مفعل على Hostinger
2. تحقق من إعدادات PHP في لوحة تحكم Hostinger
3. تأكد من أن قاعدة البيانات موجودة ومستوردة
4. تحقق من أن جميع Controllers موجودة في `app/Http/Controllers/Api/`

## روابط مفيدة للاختبار

- `https://bnbatiment.com/test_api.php` - اختبار شامل
- `https://bnbatiment.com/api/services` - اختبار API الخدمات
- `https://bnbatiment.com/api/blog` - اختبار API المدونة
- `https://bnbatiment.com/api/gallery` - اختبار API المعرض
- `https://bnbatiment.com/api/testimonials` - اختبار API التوصيات 