# تعليمات إعادة نشر الموقع مع إصلاح عرض المقالات

## ✅ التغييرات المنجزة

1. ✅ تثبيت مكتبة `markdown-to-jsx`
2. ✅ تحديث `Front-End/src/pages/BlogDetail.jsx` لعرض Markdown بشكل صحيح
3. ✅ استبدال `\n` literals بفواصل أسطر حقيقية

## خطوات إعادة النشر على Vercel

### 1. Build المشروع محلياً (اختياري للتحقق):

```bash
cd Front-End
npm run build
```

### 2. رفع التغييرات على GitHub:

```bash
cd "F:\Couvreur project"
git add .
git commit -m "Fix blog post Markdown rendering with markdown-to-jsx"
git push origin main
```

### 3. Vercel سيعيد النشر تلقائياً

إذا لم يكن تلقائياً:
- اذهب إلى https://vercel.com
- اضغط على Project Settings > Deployments
- اضغط "Redeploy"

## التحقق من العمل

1. افتح https://www.bnbatiment.com/blog
2. افتح أي مقال
3. يجب أن يظهر المحتوى منسق بشكل صحيح:
   - ✅ العناوين: h1, h2, h3
   - ✅ النصوص العريضة: **text**
   - ✅ القوائم النقطية والمرقمة
   - ✅ الروابط
   - ✅ الفقرات بشكل صحيح

## التغييرات في BlogDetail.jsx

```jsx
// إضافة import
import Markdown from 'markdown-to-jsx';

// استخدام Markdown component
<Markdown
  options={{
    overrides: {
      h1: { component: 'h1', props: { style: { fontSize: '2rem', fontWeight: '700' } } },
      h2: { component: 'h2', props: { style: { fontSize: '1.75rem', fontWeight: '700' } } },
      // ... إلخ
    }
  }}
>
  {post.content.replace(/\\n/g, '\n')}
</Markdown>
```

## إذا واجهت مشاكل

### مشكلة: المحتوى ما زال يظهر بـ \n

**الحل:** تأكد من أن قاعدة البيانات تحتوي على فواصل أسطر حقيقية، وليس `\n` literals:

```bash
# SSH إلى Hostinger
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html

# تشغيل البذور مرة أخرى
php artisan db:seed --class=BlogPostSeeder --force
```

### مشكلة: Vercel لا يعيد النشر

**الحل:** 
1. اذهب إلى Vercel Dashboard
2. Project Settings > Deployments
3. اضغط "Redeploy" يدوياً

## النتيجة النهائية

بعد إعادة النشر، ستظهر المقالات بشكل منظم:
- ✅ العناوين كبيرة ومنسقة
- ✅ النصوص العريضة بارزة
- ✅ القوائم منسقة
- ✅ الروابط ملونة
- ✅ الفقرات بمسافات صحيحة

---

**ملاحظة:** يجب re-deploy على Vercel لرؤية التغييرات.

