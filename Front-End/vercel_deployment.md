# تعليمات نشر الفرونت إند على Vercel

## 1. إعداد متغيرات البيئة في Vercel

### أ. إنشاء ملف .env.local للبيئة المحلية
```env
REACT_APP_API_URL=https://bnbatiment.com/api
```

### ب. إعداد متغيرات البيئة في Vercel
1. اذهب إلى لوحة تحكم Vercel
2. اختر مشروعك
3. اذهب إلى Settings > Environment Variables
4. أضف المتغير التالي:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://bnbatiment.com/api`
   - **Environment**: Production, Preview, Development

## 2. تحديث apiClient.js

قم بتحديث ملف `src/api/apiClient.js` ليستخدم متغير البيئة:

```javascript
// تحديد URL الباك إند حسب البيئة
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }
  // ... باقي الكود
}
```

## 3. إعداد ملف vercel.json (اختياري)

إذا كنت تريد إعدادات خاصة، أنشئ ملف `vercel.json` في مجلد الفرونت إند:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://bnbatiment.com"
        }
      ]
    }
  ]
}
```

## 4. خطوات النشر على Vercel

### أ. ربط GitHub Repository
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط على "New Project"
3. اختر GitHub repository الخاص بك
4. اختر مجلد `Front-End` كـ Root Directory

### ب. إعدادات البناء
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### ج. متغيرات البيئة
أضف المتغيرات التالية في Vercel:
- `REACT_APP_API_URL`: `https://bnbatiment.com/api`

## 5. تحديث CORS في الباك إند

تأكد من تحديث إعدادات CORS في الباك إند (`config/cors.php`):

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://your-frontend-domain.vercel.app',
        'http://localhost:3000', // للتطوير المحلي
        'http://localhost:5173'  // للتطوير المحلي مع Vite
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## 6. اختبار الاتصال

بعد النشر، تأكد من أن الفرونت إند يتصل بالباك إند بشكل صحيح:

1. افتح Developer Tools في المتصفح
2. اذهب إلى Network tab
3. تأكد من أن الطلبات تذهب إلى `https://bnbatiment.com/api`
4. تحقق من عدم وجود أخطاء CORS

## 7. استكشاف الأخطاء

### مشاكل شائعة:
1. **CORS Errors**: تأكد من إعدادات CORS في الباك إند
2. **404 Errors**: تأكد من أن API routes تعمل على الباك إند
3. **Authentication Issues**: تأكد من أن JWT tokens تعمل بشكل صحيح

### للتحقق من الاتصال:
```javascript
// في console المتصفح
fetch('https://bnbatiment.com/api/test')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
``` 