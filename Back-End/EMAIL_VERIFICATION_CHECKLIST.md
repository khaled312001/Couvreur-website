# قائمة التحقق من إعداد البريد الإلكتروني

## ✅ ما تم إنجازه

1. ✅ تم تعديل `ContactController.php` لإرسال البريد إلى `support@bnbatiment.com`
2. ✅ تم تعديل `ChatController.php` لإرسال البريد إلى `support@bnbatiment.com`
3. ✅ تم تحديث قالب البريد الإلكتروني لعرض جميع المعلومات
4. ✅ تم تحديث إعدادات SMTP في `config/mail.php`
5. ✅ تم إضافة الإشعارات البريدية لجميع أنواع النماذج

## ما يحدث عند إرسال النموذج:

### 1. الصفحة الرئيسية (Home Page)
```
User submits form → API/contact → store() → sendEmailNotification() → Email sent!
```

### 2. صفحة الاتصال (Contact Page)
```
User submits form → API/contact → store() → sendEmailNotification() → Email sent!
```

### 3. الدردشة المباشرة (Chat)
```
User starts chat → API/chat/session → createSession() → sendEmailNotification() → Email sent!
```

## الخطوات التالية على السيرفر

### الخطوة 1: إضافة الإعدادات إلى ملف .env

أضف هذه الأسطر إلى ملف `.env` في مجلد `Back-End` على Hostinger:

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.bnbatiment.com
MAIL_PORT=587
MAIL_USERNAME=support@bnbatiment.com
MAIL_PASSWORD=support@Passord123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="support@bnbatiment.com"
MAIL_FROM_NAME="BN Bâtiment"
```

### الخطوة 2: تشغيل الأوامر على السيرفر

اتصل بسيرفر Hostinger عبر SSH أو استخدم File Manager:

```bash
cd public_html
php artisan config:clear
php artisan config:cache
php artisan cache:clear
```

### الخطوة 3: اختبار الإرسال

1. اذهب إلى https://bnbatiment.com
2. أرسل نموذج اتصال تجريبي
3. تحقق من صندوق البريد support@bnbatiment.com
4. يجب أن تتلقى إشعاراً بريدياً كاملاً

## استكشاف الأخطاء

### إذا لم يتم إرسال البريد

#### 1. تحقق من ملف .env
```bash
cd Back-End
cat .env | grep MAIL
```

يجب أن ترى جميع الإعدادات المطلوبة.

#### 2. تحقق من السجلات
```bash
tail -f storage/logs/laravel.log
```

ابحث عن أخطاء البريد في السجلات.

#### 3. اختبر اتصال SMTP
تأكد من أن حساب البريد الإلكتروني يعمل:
- اذهب إلى https://mail.hostinger.com/
- سجل الدخول بـ support@bnbatiment.com
- كلمة المرور: support@Passord123
- جرب إرسال بريد تجريبي

#### 4. امسح الذاكرة المؤقتة
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan config:cache
```

## معلومات مهمة

### 📧 حساب البريد الإلكتروني
- **البريد**: support@bnbatiment.com
- **كلمة المرور**: support@Passord123
- **Webmail**: https://mail.hostinger.com/
- **SMTP Server**: mail.bnbatiment.com
- **Port**: 587 (TLS)

### 📱 لوحة التحكم
- **Admin Contact Panel**: https://www.bnbatiment.com/admin/contact
- كل رسالة تظهر في لوحة التحكم + بريد الإلكتروني

## الاختلافات بين الأنواع

### نموذج الاتصال العادي
- يرسل البريد فوراً
- يحتوي على: الاسم، البريد، الهاتف، الموضوع، الرسالة
- لا يحتوي على Session ID

### نموذج الدردشة
- يرسل البريد عند بدء جلسة جديدة
- يحتوي على: Session ID + جميع المعلومات
- رابط مباشر للدردشة في لوحة التحكم

## التحقق من النجاح

### علامات النجاح:
1. ✅ الرسالة تظهر في لوحة التحكم
2. ✅ إشعار بريدي يصل إلى support@bnbatiment.com
3. ✅ البريد يحتوي على جميع المعلومات
4. ✅ رابط الإدارة موجود في البريد

### مشاكل محتملة:
- ❌ "Connection refused" → فحص المنفذ 587
- ❌ "Authentication failed" → فحص كلمة المرور
- ❌ "TLS handshake" → تغيير Port إلى 465 و Encryption إلى ssl

## نصيحة أخيرة

بعد تطبيق الإعدادات على السيرفر:
```bash
php artisan config:cache
```

هذا أمر مهم جداً لتفعيل إعدادات البريد!

