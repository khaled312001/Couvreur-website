# 🚀 نشر مسار Cloudinary Upload إلى السيرفر

## المشكلة
الخطأ 1: `The route api/cloudinary/upload could not be found.`  
الخطأ 2: `Method Illuminate\Http\UploadedFile::storeOnCloudinary does not exist.`

السبب: ملف `Back-End/routes/api.php` على السيرفر لا يحتوي على المسار الجديد.

## الحل السريع

### 1. رفع ملف routes/api.php إلى السيرفر

#### Option A: عبر File Manager (الأسهل)

1. اذهب إلى https://hpanel.hostinger.com/
2. اختر الموقع bnbatiment.com
3. File Manager
4. افتح `domains/bnbatiment.com/public_html/Back-End/routes/`
5. ارفع ملف `api.php` الجديد من المشروع المحلي

#### Option B: عبر SCP

```powershell
# من PowerShell
scp -P 65002 "Back-End/routes/api.php" u696043789@212.85.28.110:domains/bnbatiment.com/public_html/Back-End/routes/api.php
```

#### Option C: عبر SSH

```bash
# اتصال SSH
ssh -p 65002 u696043789@212.85.28.110

# انتقل إلى المجلد
cd domains/bnbatiment.com/public_html/Back-End/routes

# انسخ محتوى api.php من المشروع المحلي
nano api.php
# الصق المحتوى الجديد
```

### 2. مسح الكاش على السيرفر

```bash
cd domains/bnbatiment.com/public_html/Back-End
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
```

### 3. التحقق من المسار

```bash
# اختبر المسار
curl -X POST https://api.bnbatiment.com/api/cloudinary/upload
```

يجب أن يرجع رد وليس 404.

### 4. إعادة تشغيل PHP-FPM (اختياري)

```bash
sudo systemctl restart php8.1-fpm
```

## الملفات المطلوبة للرفع

### 1. app/Http/Controllers/Api/CloudinaryUploadController.php
**المهم جداً:** استخدم النسخة المحدثة التي تستخدم SDK مباشرة بدلاً من الـ macro.

### 2. routes/api.php
يجب أن يحتوي على السطور التالية:

```php
// Handle preflight OPTIONS for Cloudinary uploads
Route::options('/cloudinary/upload', function () {
    return response('', 200, [
        'Access-Control-Allow-Origin' => request()->header('Origin') ?? '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN',
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Max-Age' => '86400',
    ]);
});

// Cloudinary upload routes
Route::post('/cloudinary/upload', [CloudinaryUploadController::class, 'upload']);
Route::delete('/cloudinary/upload', [CloudinaryUploadController::class, 'destroy']);
```

### 2. app/Http/Controllers/Api/CloudinaryUploadController.php
يجب أن يكون موجوداً في السيرفر.

### 3. config/cloudinary.php
يجب أن يكون موجوداً في السيرفر.

### 4. config/filesystems.php
يجب أن يحتوي على إعدادات Cloudinary disk:
```php
'cloudinary' => [
    'driver' => 'cloudinary',
    'api_key' => env('CLOUDINARY_API_KEY'),
    'api_secret' => env('CLOUDINARY_API_SECRET'),
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
],
```

### 5. .env file
يجب أن يحتوي على:
```
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
```

### 6. vendor/cloudinary-labs/
**تأكد من تثبيت الحزمة:** يجب تشغيل `composer install` على السيرفر

## التحقق من نجاح التثبيت

### 1. اختبر من المتصفح:
```
https://api.bnbatiment.com/api/cloudinary/upload
```

يجب أن يرجع رد (لا خطأ 404).

### 2. اختبر من واجهة الإدارة:
1. اذهب إلى https://www.bnbatiment.com/admin/services
2. اضغط على "Ajouter un service"
3. حاول رفع صورة
4. يجب أن يعمل بدون خطأ

## إذا استمر الخطأ 404

### 1. تحقق من الملفات:
```bash
ls -la routes/api.php
ls -la app/Http/Controllers/Api/CloudinaryUploadController.php
```

### 2. تحقق من الـ logs:
```bash
tail -f storage/logs/laravel.log
```

### 3. مسح الكاش من جديد:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
rm -rf bootstrap/cache/*
php artisan config:cache
php artisan route:cache
```

### 4. تحقق من ملف .env:
```bash
cat .env | grep CLOUDINARY
```

يجب أن يحتوي على:
```
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
```

## ملاحظات مهمة

- ⚠️ تأكد من أن ملف `api.php` يحتوي على جميع المسارات اللازمة
- ⚠️ تأكد من أن CloudinaryUploadController موجود
- ⚠️ لا تنس مسح الكاش بعد الرفع
- ⚠️ امسح كاش المتصفح (Ctrl+Shift+Delete)
- ⚠️ أعد تحميل الصفحة بعد التغييرات

## الأوامر الكاملة (نسخ واللصق)

```bash
# 1. SSH
ssh -p 65002 u696043789@212.85.28.110

# 2. الانتقال إلى المجلد
cd domains/bnbatiment.com/public_html/Back-End

# 3. تحديث الحزم (مهم جداً!)
composer install --no-dev

# 4. مسح الكاش
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
rm -rf bootstrap/cache/*

# 5. إعادة بناء الكاش
php artisan config:cache
php artisan route:cache

# 6. التحقق من المسار
curl -X OPTIONS https://api.bnbatiment.com/api/cloudinary/upload

# 7. الخروج
exit
```

## ✅ التحقق النهائي

بعد تنفيذ الأوامر أعلاه:

1. افتح https://www.bnbatiment.com/admin/services في متصفح جديد
2. اضغط على "Ajouter un service"
3. ارفع صورة اختبارية
4. يجب أن يعمل بدون أي خطأ!

---

إذا استمرت المشكلة، تحقق من:
- صلاحيات الملفات (644 للملفات، 755 للمجلدات)
- وجود جميع المكتبات المطلوبة (Cloudinary Laravel)
- ملف composer.json يحتوي على `cloudinary-labs/cloudinary-laravel`

