# دليل نشر مشروع Couvreur - إعدادات محددة

## معلومات المشروع:
- **Domain**: https://bnbatiment.com
- **Database**: u696043789_bnbatiment
- **Username**: u696043789_bnbatiment
- **Password**: support@Passord123

## 1. نشر الباك إند على Hostinger

### أ. رفع الملفات
1. ارفع **جميع محتويات** مجلد `Back-End` إلى `public_html` على Hostinger
2. انسخ محتوى `htaccess_for_hostinger.txt` إلى `.htaccess`
3. انسخ محتوى `index_for_hostinger.php` إلى `index.php`

### ب. إنشاء ملف .env
```env
APP_NAME="Couvreur Project"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://bnbatiment.com

# إعدادات قاعدة البيانات
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u696043789_bnbatiment
DB_USERNAME=u696043789_bnbatiment
DB_PASSWORD=support@Passord123

# إعدادات أخرى...
LOG_CHANNEL=stack
LOG_LEVEL=error
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### ج. إعداد قاعدة البيانات
1. اذهب إلى لوحة تحكم Hostinger
2. MySQL Databases > Create Database
3. Database Name: `u696043789_bnbatiment`
4. استورد ملف `couvreur_db.sql`

### د. تشغيل الأوامر
```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate
```

## 2. نشر الفرونت إند على Vercel

### أ. إعداد متغيرات البيئة
في Vercel Dashboard > Settings > Environment Variables:
- **Name**: `REACT_APP_API_URL`
- **Value**: `https://bnbatiment.com/api`
- **Environment**: Production, Preview, Development

### ب. إعدادات البناء
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `Front-End`

### ج. ربط GitHub Repository
1. اذهب إلى [vercel.com](https://vercel.com)
2. New Project > Import Git Repository
3. اختر repository الخاص بك
4. عيّن Root Directory إلى `Front-End`

## 3. اختبار الاتصال

### اختبار الباك إند:
```bash
curl https://bnbatiment.com/api/test
```

### اختبار الفرونت إند:
1. افتح Developer Tools في المتصفح
2. Network tab - تحقق من أن الطلبات تذهب إلى `https://bnbatiment.com/api`
3. Console - تحقق من عدم وجود أخطاء CORS

## 4. إعدادات CORS

في ملف `config/cors.php` في الباك إند:
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://your-frontend-domain.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173'
    ],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

## 5. استكشاف الأخطاء

### مشكلة CORS:
- تأكد من إعدادات CORS في الباك إند
- تأكد من أن domain الفرونت إند مضاف في `allowed_origins`

### مشكلة قاعدة البيانات:
- تحقق من إعدادات قاعدة البيانات في `.env`
- تأكد من أن قاعدة البيانات موجودة
- تحقق من صلاحيات المستخدم

### مشكلة Authentication:
- تحقق من JWT token في localStorage
- تأكد من إعدادات Sanctum في الباك إند

## 6. روابط مفيدة
- [Hostinger Control Panel](https://bnbatiment.com)
- [Vercel Dashboard](https://vercel.com)
- [API Documentation](https://bnbatiment.com/api)

## 7. الأمان
- تأكد من أن `APP_DEBUG=false` في الإنتاج
- استخدم HTTPS فقط
- قم بتحديث Laravel بانتظام
- استخدم strong passwords

## 8. النسخ الاحتياطي
- قم بعمل backup يومي لقاعدة البيانات
- احتفظ بنسخة من ملفات .env
- وثّق جميع التغييرات 