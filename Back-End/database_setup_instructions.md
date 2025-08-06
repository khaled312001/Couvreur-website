# تعليمات إعداد قاعدة البيانات - مشروع Couvreur

## الخطوات المطلوبة:

### 1. إنشاء ملف .env
قم بإنشاء ملف `.env` في مجلد `Back-End` وانسخ المحتوى التالي:

```env
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

### 2. إنشاء قاعدة البيانات
1. افتح phpMyAdmin (http://localhost/phpmyadmin)
2. أنشئ قاعدة بيانات جديدة باسم `couvreur_db`
3. تأكد من أن الترميز هو `utf8mb4_unicode_ci`

### 3. تشغيل الأوامر في Terminal
افتح Terminal في مجلد `Back-End` وقم بتشغيل الأوامر التالية:

```bash
# تثبيت التبعيات
composer install

# إنشاء مفتاح التطبيق
php artisan key:generate

# تشغيل الهجرات (Migrations)
php artisan migrate

# تشغيل البذور (Seeders)
php artisan db:seed

# تشغيل الخادم
php artisan serve
```

### 4. التحقق من الإعدادات
بعد تشغيل الأوامر، تأكد من:
- إنشاء جميع الجداول في قاعدة البيانات
- وجود بيانات تجريبية في الجداول
- عمل الخادم على http://localhost:8000

### 5. بيانات تسجيل الدخول الافتراضية
- البريد الإلكتروني: `admin@couvreur.fr`
- كلمة المرور: `password`
- الدور: `admin`

## ملاحظات مهمة:
- تأكد من تشغيل XAMPP (Apache + MySQL)
- تأكد من أن منفذ 3306 متاح لـ MySQL
- إذا كان لديك كلمة مرور لـ MySQL، أضفها في `DB_PASSWORD` 