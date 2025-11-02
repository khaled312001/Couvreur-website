# Fix CORS Error for Blog Admin - إصلاح خطأ CORS لإضافة المقالات

## المشكلة
عند محاولة إضافة مقالة جديدة من لوحة التحكم على `https://www.bnbatiment.com/admin/blog`، يظهر الخطأ:
```
Access to fetch at 'https://api.bnbatiment.com/api/admin/blog' from origin 'https://www.bnbatiment.com' has been blocked by CORS policy
```

## الحل المطبق

### 1. تحديث `Back-End/public/index.php`
- ✅ تحسين معالجة Origin header
- ✅ إضافة fallback للـ Referer إذا لم يكن Origin متوفراً
- ✅ معالجة أفضل لطلبات OPTIONS preflight
- ✅ إضافة `https://www.bnbatiment.com` و `https://bnbatiment.com` في allowed origins

### 2. تحديث `Back-End/routes/api.php`
- ✅ تحسين route OPTIONS لمعالجة CORS بشكل صحيح
- ✅ إضافة جميع allowed origins

### 3. تحديث `Back-End/app/Http/Controllers/Api/BlogController.php`
- ✅ إضافة CORS headers في method `store()` لضمان إرسالها في جميع الاستجابات

### 4. تحديث `Back-End/app/Http/Middleware/CorsMiddleware.php`
- ✅ إضافة `https://www.bnbatiment.com` و `https://bnbatiment.com`
- ✅ إصلاح bug في set Access-Control-Allow-Origin header

## الخطوات التالية

1. **رفع الملفات المحدثة إلى الخادم:**
   ```
   Back-End/public/index.php
   Back-End/routes/api.php
   Back-End/app/Http/Controllers/Api/BlogController.php
   Back-End/app/Http/Middleware/CorsMiddleware.php
   ```

2. **Clear Laravel Cache (اختياري):**
   ```bash
   php artisan config:clear
   php artisan route:clear
   php artisan cache:clear
   ```

3. **اختبار CORS:**
   - افتح `https://www.bnbatiment.com/admin/blog`
   - حاول إضافة مقالة جديدة
   - يجب أن تعمل بدون أخطاء CORS

## التحقق من الإصلاح

يمكنك اختبار CORS باستخدام:
```bash
curl -X OPTIONS https://api.bnbatiment.com/api/admin/blog \
  -H "Origin: https://www.bnbatiment.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

يجب أن ترى headers:
```
Access-Control-Allow-Origin: https://www.bnbatiment.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN
```

## ملاحظات

- الـ CORS middleware مسجل بالفعل في `bootstrap/app.php`
- جميع طلبات OPTIONS يتم معالجتها قبل Laravel في `public/index.php`
- CORS headers يتم إضافتها في 3 أماكن:
  1. `public/index.php` - قبل Laravel
  2. `CorsMiddleware.php` - في Laravel middleware
  3. `BlogController.php` - في الـ controller نفسه (للتأكيد)

## الملفات المحدثة

1. ✅ `Back-End/public/index.php`
2. ✅ `Back-End/routes/api.php`
3. ✅ `Back-End/app/Http/Controllers/Api/BlogController.php`
4. ✅ `Back-End/app/Http/Middleware/CorsMiddleware.php`

---

**تاريخ الإصلاح:** 2025
**الحالة:** ✅ تم إصلاح CORS لـ Blog Admin

