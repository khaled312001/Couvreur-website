# تشخيص مشكلة الإشعارات

## المشكلة الحالية
الإشعارات لا تظهر في القائمة المنسدلة رغم أنها يتم إنشاؤها بشكل صحيح.

## خطوات التشخيص

### 1. فتح Developer Tools
- اضغط F12 في المتصفح
- انتقل إلى تبويب Console
- ابحث عن الرسائل التي تبدأ بـ:
  - `AuthContext:`
  - `getCurrentUser:`
  - `getNotifications:`
  - `apiClient:`
  - `useEffect triggered:`

### 2. اختبار التوثيق
افتح ملف `Front-End/test_auth_debug.html` في المتصفح واتبع الخطوات:

1. اضغط "Test Authentication" لاختبار التوثيق
2. اضغط "Test Notifications" لاختبار الإشعارات
3. إذا كان هناك مشكلة، اضغط "Clear Storage" واعد المحاولة

### 3. فحص البيانات في Console
ابحث عن هذه الرسائل في Console:

```
AuthContext: Checking authentication...
getCurrentUser: token exists: true/false
getCurrentUser: Making request to /auth/user
getCurrentUser: response status: 200/401
getCurrentUser: userData: {...}
useEffect triggered: { isAuthenticated: true/false, userRole: "admin"/undefined }
Starting notification polling
Fetching notifications...
getNotifications: Calling with params: {limit: 10}
apiClient: Making request to: http://localhost:8000/api/admin/notifications
apiClient: Headers: {...}
apiClient: Response status: 200/401
getNotifications: response: {...}
Setting notifications: [...]
Unread count: 5
```

### 4. المشاكل المحتملة وحلولها

#### المشكلة 1: عدم وجود token
**الأعراض:**
```
getCurrentUser: token exists: false
AuthContext: No user data found
```

**الحل:**
- تأكد من تسجيل الدخول بشكل صحيح
- امسح localStorage واعد تسجيل الدخول

#### المشكلة 2: token غير صالح
**الأعراض:**
```
getCurrentUser: response status: 401
```

**الحل:**
- امسح localStorage
- اعد تسجيل الدخول

#### المشكلة 3: المستخدم ليس admin
**الأعراض:**
```
useEffect triggered: { isAuthenticated: true, userRole: "user" }
Not starting notification polling - conditions not met
```

**الحل:**
- تأكد من أن المستخدم لديه دور "admin"

#### المشكلة 4: مشكلة في API الإشعارات
**الأعراض:**
```
apiClient: Response status: 401
getNotifications error: Unauthorized
```

**الحل:**
- تأكد من أن الخادم يعمل
- تأكد من أن مسارات الإشعارات محمية بـ middleware

#### المشكلة 5: استجابة API غير صحيحة
**الأعراض:**
```
getNotifications: response: {error: "..."}
Invalid response format: {...}
```

**الحل:**
- تحقق من الباك إند logs
- تأكد من أن NotificationController يعمل بشكل صحيح

### 5. اختبار الباك إند
```bash
cd Back-End
php test_notifications_with_auth.php
```

### 6. اختبار إنشاء الإشعارات
```bash
cd Back-End
php test_contact_notification.php
```

## البيانات المطلوبة للتشخيص
- حالة التوثيق (isAuthenticated)
- دور المستخدم (user.role)
- عدد الإشعارات (notifications.length)
- عدد الإشعارات غير المقروءة (unreadCount)
- استجابة API الإشعارات

## ملاحظات مهمة
1. تأكد من أن الخادم يعمل على المنفذ 8000
2. تأكد من أن CORS مكون بشكل صحيح
3. تأكد من أن التوثيق يعمل بشكل صحيح
4. تحقق من Console للبحث عن أخطاء JavaScript 