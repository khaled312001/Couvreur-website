-- إنشاء قاعدة البيانات لمشروع Couvreur
-- Create Database for Couvreur Project

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS `couvreur_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- استخدام قاعدة البيانات
USE `couvreur_db`;

-- عرض معلومات قاعدة البيانات
SELECT 
    SCHEMA_NAME AS 'Database Name',
    DEFAULT_CHARACTER_SET_NAME AS 'Character Set',
    DEFAULT_COLLATION_NAME AS 'Collation'
FROM INFORMATION_SCHEMA.SCHEMATA 
WHERE SCHEMA_NAME = 'couvreur_db';

-- ملاحظات مهمة:
-- 1. تأكد من تشغيل XAMPP (Apache + MySQL)
-- 2. افتح phpMyAdmin على http://localhost/phpmyadmin
-- 3. انسخ هذا الكود وقم بتنفيذه في SQL tab
-- 4. أو استخدم السكريبت PowerShell المرفق 