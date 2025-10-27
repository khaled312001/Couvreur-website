# حل مشاكل عدم إرسال البريد الإلكتروني

## 🔍 تشخيص المشكلة

### الخطوة 1: اختبار الإعدادات البريدية

افتح الرابط التالي لاختبار إرسال البريد:

```
https://bnbatiment.com/api/test-email
```

هذا الرابط سيعرض:
- ✅ نجاح الإرسال
- ❌ خطأ الإرسال مع تفاصيل الخطأ
- إعدادات البريد الحالية

### الخطوة 2: فحص ملف .env

تأكد من أن ملف `.env` في مجلد `Back-End` يحتوي على:

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

**⚠️ مهم جداً**: لا تنسى وضع علامات اقتباس حول كلمة المرور إذا كانت تحتوي على رموز خاصة مثل `@`.

### الخطوة 3: مسح الذاكرة المؤقتة

بعد تحديث ملف `.env`، قم بتشغيل:

```bash
cd Back-End
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

### الخطوة 4: فحص السجلات

عند إرسال نموذج، تحقق من السجلات:

```bash
tail -f storage/logs/laravel.log
```

ابحث عن:
- ✅ "Email notification sent successfully"
- ❌ "Failed to send email notification"

## 🔧 الحلول الشائعة

### المشكلة 1: "Connection refused"

**السبب**: المنفذ 587 مغلق

**الحل**:
1. جرب تغيير المنفذ إلى 465:
```env
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
```

2. أو جرب المنفذ 25:
```env
MAIL_PORT=25
MAIL_ENCRYPTION=tls
```

### المشكلة 2: "Authentication failed"

**السبب**: كلمة المرور أو اسم المستخدم غير صحيح

**الحل**:
1. تأكد من صحة كلمة المرور في `.env`
2. لا تضع مسافات إضافية
3. جرب تسجيل الدخول على webmail:
   - https://mail.hostinger.com/
   - support@bnbatiment.com
   - كلمة المرور: support@Passord123

### المشكلة 3: "TLS handshake failed"

**السبب**: مشكلة في التشفير

**الحل**: غير إلى SSL
```env
MAIL_ENCRYPTION=ssl
MAIL_PORT=465
```

### المشكلة 4: البريد يذهب إلى SPAM

**الحل**:
1. أضف DNS records لـ SPF و DKIM
2. تحدث مع دعم Hostinger

## 📝 سجلات مهمة

للبحث في السجلات:

```bash
# البحث عن محاولات إرسال البريد
grep -i "email notification" storage/logs/laravel.log

# البحث عن أخطاء البريد
grep -i "failed to send email" storage/logs/laravel.log

# عرض آخر 50 سطر
tail -50 storage/logs/laravel.log
```

## ✅ قائمة التحقق النهائية

- [ ] ملف `.env` موجود في مجلد `Back-End`
- [ ] جميع إعدادات MAIL_ موجودة في `.env`
- [ ] كلمة المرور بدون مسافات إضافية
- [ ] قمت بتشغيل `php artisan config:clear && php artisan config:cache`
- [ ] اخترت الرابط https://bnbatiment.com/api/test-email
- [ ] اختبرت تسجيل الدخول على webmail
- [ ] فحصت سجلات Laravel

## 🚨 إذا كان كل شيء يعمل ولكن لا يصل البريد

قد تكون المشكلة في:
1. **SPAM Filter**: تحقق من مجلد SPAM
2. **Firewall**: بعض الـ Firewalls تحجب SMTP
3. **Hostinger Settings**: قد تحتاج إلى تفعيل SMTP من لوحة التحكم

اتصل بدعم Hostinger وأخبرهم:
- حساب البريد: support@bnbatiment.com
- المنفذ المستخدم: 587
- التشفير: TLS

## 📞 الدعم

إذا استمرت المشكلة، أرسل:
1. مخرجات https://bnbatiment.com/api/test-email
2. آخر 20 سطر من storage/logs/laravel.log
3. محتوى `.env` (بدون كلمة المرور!)

