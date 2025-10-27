# 🚀 نشر إصلاح CORS إلى السيرفر

## الملفات التي يجب رفعها

### 1. رفع هذه الملفات المعدلة:
```
Back-End/app/Http/Middleware/CorsMiddleware.php
Back-End/config/cors.php
```

### 2. بعد رفع الملفات، شغل هذه الأوامر على السيرفر:

```bash
cd ~/domains/bnbatiment.com/public_html
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:cache
```

### 3. إعادة تشغيل PHP-FPM:

```bash
# عبر SSH
sudo systemctl restart php8.1-fpm

# أو عبر Hostinger Panel
# Go to PHP Configuration → Restart PHP
```

## طريقة الرفع

### Option 1: File Manager (أسهل)
1. اذهب إلى https://hpanel.hostinger.com/
2. اختر الموقع bnbatiment.com
3. File Manager
4. افتح `Back-End/app/Http/Middleware/`
5. ارفع `CorsMiddleware.php` الجديد
6. افتح `Back-End/config/`
7. ارفع `cors.php` الجديد

### Option 2: FTP
- استخدم FileZilla أو أي عميل FTP
- اربط بـ Hostinger
- ارفع الملفات إلى `/public_html/Back-End/`

### Option 3: Git (إذا كنت تستخدم Git)
```bash
git add .
git commit -m "Fix CORS issue"
git push
```

## التحقق من النجاح

### 1. اختبر الرابط:
```
https://api.bnbatiment.com/api/test-email
```

يجب أن يرجع:
```json
{
  "success": true,
  "message": "Test email sent successfully to support@bnbatiment.com"
}
```

### 2. اختبر النموذج:
- اذهب إلى https://www.bnbatiment.com
- أرسل نموذج تجريبي
- يجب أن يعمل بدون أخطاء!

## إذا استمر الخطأ 404

تحقق من:
1. **الملفات موجودة**: تأكد من رفع الملفات بشكل صحيح
2. **الصلاحيات صحيحة**: ملفات PHP يجب أن تكون 644
3. **لا يوجد أخطاء PHP**: راجع `storage/logs/laravel.log`

```bash
tail -f storage/logs/laravel.log
```

## إذا استمر خطأ CORS

تحقق من الـ headers في Network Tab:
- يجب أن يوجد `Access-Control-Allow-Origin`
- يجب أن تكون القيمة `https://www.bnbatiment.com`

إذا لم تكن موجودة:
```bash
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

## ملاحظات

- ⚠️ لا تنسى تشغيل `php artisan config:cache` بعد رفع الملفات
- ⚠️ امسح كاش المتصفح (Ctrl+Shift+Delete)
- ⚠️ أعد تحميل الصفحة بعد التغييرات

