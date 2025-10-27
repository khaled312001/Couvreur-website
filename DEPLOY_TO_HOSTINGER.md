# كيفية تحديث قاعدة البيانات على Hostinger لـ BN BÂTIMENT

## الطريقة 1: رفع الملفات عبر SCP (الأسهل)

### 1. من جهازك المحلي Windows:

```powershell
# انسخ الملف المحدث من Back-End/database/seeders/
scp -P 65002 "Back-End/database/seeders/BlogPostSeeder.php" u696043789@212.85.28.110:domains/bnbatiment.com/public_html/database/seeders/
```

### 2. ثم SSH وتنفيذ الأمر:

```bash
ssh -p 65002 u696043789@212.85.28.110

# بعد دخول SSH:
cd domains/bnbatiment.com/public_html

# تشغيل البذور:
php artisan db:seed --class=BlogPostSeeder --force
```

---

## الطريقة 2: نقل المحتوى مباشرة عبر SSH

### 1. اتصال SSH:

```bash
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html
```

### 2. إنشاء الملف مباشرة:

```bash
# افتح المحرر:
nano database/seeders/BlogPostSeeder.php
# أو
vi database/seeders/BlogPostSeeder.php
```

### 3. انسخ محتوى الملف من الملف الموجود في المشروع

---

## الطريقة 3: استخدام Git Repository (مُوصى به)

### 1. تحويل المسار إلى Git repository:

```bash
cd domains/bnbatiment.com/public_html
git init
git remote add origin [YOUR_GIT_REPO_URL]
git pull origin main
```

### 2. ثم حدّث من GitHub/GitLab:

```bash
git pull origin main
php artisan db:seed --class=BlogPostSeeder --force
```

---

## الطريقة 4: تنفيذ البذور مباشرة دون رفع ملف

### عبر SSH مباشرة:

```bash
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html

# تنفيذ الأمر مباشرة:
php artisan tinker

# ثم في Tinker:
use App\Models\BlogPost;
BlogPost::truncate();

# ثم انسخ محتوى المصفوفة $posts من BlogPostSeeder
# أو استخدم DB::table بدلاً من ذلك
```

---

## الحل الأسرع والأسهل ⚡

### 1. ارفع ملف البذور فقط:

```bash
# من PowerShell على ويندوز:
cd "F:\Couvreur project"

# انسخ الملف عبر SCP:
scp -P 65002 -r "Back-End/database/seeders/BlogPostSeeder.php" u696043789@212.85.28.110:~/domains/bnbatiment.com/public_html/database/seeders/BlogPostSeeder.php
```

### 2. اتصال SSH وتنفيذ:

```bash
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html
php artisan db:seed --class=BlogPostSeeder --force
```

---

## ملاحظات مهمة:

1. **نسخ احتياطي أولاً:**
```bash
mysqldump -u u696043789_bnbatiment -p u696043789_bnbatiment > backup_$(date +%Y%m%d_%H%M%S).sql
```

2. **التحقق من الاتصال بقاعدة البيانات:**
```bash
php artisan migrate:status
```

3. **إذا كانت مشكلة في كلمة مرور MySQL:**
```bash
# تحقق من ملف .env:
cat .env | grep DB_
```

---

## الأوامر الكاملة:

```bash
# 1. SSH
ssh -p 65002 u696043789@212.85.28.110

# 2. الانتقال للمسار
cd domains/bnbatiment.com/public_html

# 3. النسخ الاحتياطي (اختياري)
mysqldump -u u696043789_bnbatiment -p u696043789_bnbatiment > backup_before_seed.sql

# 4. تنفيذ البذور
php artisan db:seed --class=BlogPostSeeder --force

# 5. التحقق
php artisan tinker --execute="echo count(App\Models\BlogPost::all()) . ' posts';"
```

