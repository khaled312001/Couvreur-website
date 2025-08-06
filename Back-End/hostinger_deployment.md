# تعليمات نشر الباك إند على Hostinger

## 1. إعداد ملف .env على Hostinger

قم بإنشاء ملف `.env` في مجلد الباك إند على Hostinger بالمحتوى التالي:

```env
APP_NAME="Couvreur Project"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://your-domain.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# إعدادات قاعدة البيانات على Hostinger
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

# إعدادات MySQL
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
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@couvreur.fr"
MAIL_FROM_NAME="${APP_NAME}"

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

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

## 2. خطوات النشر على Hostinger

### أ. رفع الملفات
1. ارفع **جميع محتويات** مجلد `Back-End` إلى المجلد `public_html` على Hostinger
2. **لا ترفع مجلد Back-End نفسه** - ارفع فقط الملفات والمجلدات الموجودة بداخله
3. تأكد من أن ملف `index.php` موجود في المجلد الجذر
4. انسخ محتوى `htaccess_for_hostinger.txt` إلى ملف `.htaccess` في المجلد الجذر

### ب. إعداد قاعدة البيانات
1. اذهب إلى لوحة تحكم Hostinger
2. أنشئ قاعدة بيانات MySQL جديدة
3. استورد ملف `couvreur_db.sql`
4. حدث إعدادات قاعدة البيانات في ملف `.env`

### ج. تشغيل الأوامر
قم بتشغيل الأوامر التالية عبر SSH أو Terminal في Hostinger:

```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate
```

## 3. إعداد CORS

أضف إعدادات CORS في ملف `config/cors.php`:

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['https://your-frontend-domain.vercel.app'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## 4. تحديث .htaccess

تأكد من وجود ملف `.htaccess` في المجلد الجذر:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
``` 