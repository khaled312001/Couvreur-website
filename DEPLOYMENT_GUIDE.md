# دليل نشر مشروع Couvreur

## نظرة عامة
- **الباك إند**: Laravel على Hostinger
- **الفرونت إند**: React/Vite على Vercel  
- **قاعدة البيانات**: MySQL على Hostinger
- **Domain الباك إند**: https://bnbatiment.com

## 1. نشر الباك إند على Hostinger

### أ. إعداد ملف .env
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
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

# إعدادات CORS
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### ب. خطوات النشر
1. ارفع ملفات مجلد `Back-End` إلى `public_html` على Hostinger
2. أنشئ قاعدة بيانات MySQL في لوحة تحكم Hostinger
3. استورد ملف `couvreur_db.sql`
4. شغل الأوامر التالية:
```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan migrate
```

### ج. إعداد CORS
في ملف `config/cors.php`:
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

### أ. اختبار الباك إند
```bash
curl https://bnbatiment.com/api/test
```

### ب. اختبار الفرونت إند
افتح Developer Tools في المتصفح وتحقق من:
1. Network tab - تأكد من أن الطلبات تذهب للباك إند
2. Console - تحقق من عدم وجود أخطاء CORS
3. Application tab - تحقق من localStorage للـ tokens

## 4. استكشاف الأخطاء الشائعة

### مشكلة CORS
**الخطأ**: `Access to fetch at 'https://bnbatiment.com/api' from origin 'https://your-frontend.vercel.app' has been blocked by CORS policy`

**الحل**: 
1. تأكد من إعدادات CORS في الباك إند
2. تأكد من أن domain الفرونت إند مضاف في `allowed_origins`

### مشكلة Authentication
**الخطأ**: `401 Unauthorized`

**الحل**:
1. تحقق من JWT token في localStorage
2. تأكد من أن token صالح
3. تحقق من إعدادات Sanctum في الباك إند

### مشكلة 404 Not Found
**الخطأ**: `404 Not Found` للـ API routes

**الحل**:
1. تأكد من أن `.htaccess` موجود في الباك إند
2. تحقق من أن mod_rewrite مفعل على Hostinger
3. تأكد من أن routes معرفة بشكل صحيح

## 5. مراقبة الأداء

### أ. مراقبة الباك إند
- تحقق من logs في Hostinger
- استخدم Laravel Telescope للتطوير
- راقب استهلاك قاعدة البيانات

### ب. مراقبة الفرونت إند
- استخدم Vercel Analytics
- راقب Core Web Vitals
- تحقق من bundle size

## 6. الأمان

### أ. الباك إند
- تأكد من أن `APP_DEBUG=false` في الإنتاج
- استخدم HTTPS فقط
- قم بتحديث Laravel بانتظام
- استخدم strong passwords لقاعدة البيانات

### ب. الفرونت إند
- لا تخزن معلومات حساسة في localStorage
- استخدم HTTPS فقط
- قم بتحديث dependencies بانتظام

## 7. النسخ الاحتياطي

### أ. قاعدة البيانات
- قم بعمل backup يومي لقاعدة البيانات
- استخدم Hostinger's backup feature
- احتفظ بنسخة محلية من البيانات

### ب. الكود
- استخدم Git للتحكم في الإصدارات
- احتفظ بنسخة من ملفات .env
- وثّق جميع التغييرات

## 8. التحديثات

### عند تحديث الباك إند:
1. ارفع الملفات الجديدة إلى Hostinger
2. شغل `php artisan migrate` إذا كان هناك migrations جديدة
3. امسح cache: `php artisan config:clear && php artisan cache:clear`

### عند تحديث الفرونت إند:
1. ادفع التغييرات إلى GitHub
2. Vercel سيقوم بالبناء تلقائياً
3. تحقق من أن متغيرات البيئة محدثة

## روابط مفيدة
- [Hostinger Documentation](https://www.hostinger.com/help)
- [Vercel Documentation](https://vercel.com/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev) 