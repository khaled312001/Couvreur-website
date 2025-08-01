-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2025 at 09:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `couvreur_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` longtext DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `is_published` tinyint(1) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `readTime` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `content`, `excerpt`, `author`, `category`, `image`, `slug`, `is_published`, `published_at`, `readTime`, `created_at`, `updated_at`) VALUES
(1, 'Comment choisir le bon type de toiture', 'Guide complet pour choisir le type de toiture adapté à votre maison et votre budget. Découvrez les différents matériaux disponibles et leurs avantages respectifs.', 'Découvrez les différents types de toitures et leurs avantages respectifs.', 'BN BUILDING', 'Conseils', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'comment-choisir-le-bon-type-de-toiture', 1, '2025-07-27 12:40:19', NULL, '2025-08-01 12:40:19', '2025-08-01 12:40:19'),
(2, 'L\'importance de l\'isolation thermique', 'L\'isolation thermique de votre toiture peut réduire significativement vos factures d\'énergie. Découvrez pourquoi c\'est essentiel pour votre confort et vos économies.', 'Pourquoi l\'isolation thermique est essentielle pour votre confort et vos économies.', 'BN BUILDING', 'Isolation', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'importance-isolation-thermique', 1, '2025-07-22 12:40:19', NULL, '2025-08-01 12:40:19', '2025-08-01 12:40:19'),
(3, 'Entretien préventif de votre toiture', 'Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses. Les bonnes pratiques pour maintenir votre toiture en excellent état.', 'Les bonnes pratiques pour maintenir votre toiture en excellent état.', 'BN BUILDING', 'Entretien', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'entretien-preventif-toiture', 1, '2025-07-17 12:40:19', NULL, '2025-08-01 12:40:19', '2025-08-01 12:40:19'),
(4, 'L\'importance de l\'entretien préventif', 'L\'entretien préventif de votre toiture est crucial pour éviter les problèmes coûteux. Découvrez pourquoi un entretien régulier peut vous faire économiser des milliers d\'euros à long terme.\\n\\nUn entretien préventif bien planifié permet de détecter les problèmes avant qu\'ils ne deviennent graves. Les inspections régulières, le nettoyage des gouttières et la vérification de l\'étanchéité sont des gestes simples qui préservent votre investissement.\\n\\nLes signes à surveiller incluent les tuiles cassées, les fuites d\'eau, la mousse sur le toit et les joints dégradés. Une intervention rapide peut éviter des dégâts plus importants.', 'Découvrez pourquoi l\'entretien préventif est essentiel pour préserver votre toiture et éviter les réparations coûteuses.', 'BN BUILDING', 'Entretien', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'importance-entretien-preventif', 1, '2025-07-12 12:40:19', '5 min', '2025-08-01 12:40:19', '2025-08-01 12:40:19'),
(5, 'Test', 'Test content', 'Test excerpt', 'BN BUILDING', 'Test', 'data:image/jpeg;base64,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', 'test', 1, '2025-08-01 14:00:46', '5 min', '2025-08-01 13:32:48', '2025-08-01 14:00:46'),
(6, 'L\'importance de l\'isolation thermique', 'L\'isolation thermique de votre toiture peut réduire significativement vos factures d\'énergie. Découvrez pourquoi c\'est essentiel pour votre confort et vos économies.', 'Pourquoi l\'isolation thermique est essentielle pour votre confort et vos économies.', 'BN BUILDING', 'Isolation', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'importance-isolation-thermique-1', 1, '2025-07-22 13:32:48', NULL, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(7, 'Entretien préventif de votre toiture', 'Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses. Les bonnes pratiques pour maintenir votre toiture en excellent état.', 'Les bonnes pratiques pour maintenir votre toiture en excellent état.', 'BN BUILDING', 'Entretien', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'entretien-preventif-toiture-1', 1, '2025-07-17 13:32:48', NULL, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(8, 'L\'importance de l\'entretien préventif', 'L\'entretien préventif de votre toiture est crucial pour éviter les problèmes coûteux. Découvrez pourquoi un entretien régulier peut vous faire économiser des milliers d\'euros à long terme.\\n\\nUn entretien préventif bien planifié permet de détecter les problèmes avant qu\'ils ne deviennent graves. Les inspections régulières, le nettoyage des gouttières et la vérification de l\'étanchéité sont des gestes simples qui préservent votre investissement.\\n\\nLes signes à surveiller incluent les tuiles cassées, les fuites d\'eau, la mousse sur le toit et les joints dégradés. Une intervention rapide peut éviter des dégâts plus importants.', 'Découvrez pourquoi l\'entretien préventif est essentiel pour préserver votre toiture et éviter les réparations coûteuses.', 'BN BUILDING', 'Entretien', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', 'importance-entretien-preventif-1', 1, '2025-07-12 13:32:48', '5 min', '2025-08-01 13:32:48', '2025-08-01 13:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-settings_appearance', 'a:7:{s:5:\"theme\";s:5:\"light\";s:13:\"primary_color\";s:7:\"#e01074\";s:15:\"secondary_color\";s:7:\"#10B981\";s:8:\"language\";s:2:\"fr\";s:8:\"timezone\";s:12:\"Europe/Paris\";s:11:\"date_format\";s:5:\"d/m/Y\";s:11:\"time_format\";s:3:\"H:i\";}', 1754070992),
('laravel-cache-settings_company', 'a:8:{s:12:\"company_name\";s:12:\"BN BÂTIMENT\";s:19:\"company_description\";s:67:\"Entreprise spécialisée dans la charpente, couverture et zinguerie\";s:5:\"siret\";s:14:\"12345678901234\";s:10:\"vat_number\";s:13:\"FR12345678901\";s:12:\"founded_year\";s:4:\"2010\";s:15:\"employees_count\";s:2:\"25\";s:8:\"services\";a:4:{i:0;s:9:\"Charpente\";i:1;s:10:\"Couverture\";i:2;s:9:\"Zinguerie\";i:3;s:11:\"Rénovation\";}s:14:\"certifications\";a:3:{i:0;s:8:\"Qualibat\";i:1;s:3:\"RGE\";i:2;s:8:\"ISO 9001\";}}', 1754070796),
('laravel-cache-settings_email', 'a:8:{s:9:\"smtp_host\";s:14:\"smtp.gmail.com\";s:9:\"smtp_port\";i:587;s:13:\"smtp_username\";s:21:\"contact@bnbuilding.fr\";s:13:\"smtp_password\";s:0:\"\";s:15:\"smtp_encryption\";s:3:\"tls\";s:9:\"from_name\";s:12:\"BN BÂTIMENT\";s:10:\"from_email\";s:21:\"contact@bnbuilding.fr\";s:8:\"reply_to\";s:21:\"contact@bnbuilding.fr\";}', 1754070796),
('laravel-cache-settings_general', 'a:8:{s:9:\"site_name\";s:12:\"BN BÂTIMENT\";s:16:\"site_description\";s:48:\"Entreprise de charpente, couverture et zinguerie\";s:13:\"contact_email\";s:21:\"contact@bnbuilding.fr\";s:13:\"contact_phone\";s:17:\"+33 1 23 45 67 89\";s:7:\"address\";s:39:\"123 Rue de la Construction, 75001 Paris\";s:13:\"working_hours\";s:28:\"Lun-Ven: 8h-18h, Sam: 9h-17h\";s:8:\"timezone\";s:12:\"Europe/Paris\";s:8:\"language\";s:2:\"fr\";}', 1754070890),
('laravel-cache-settings_notifications', 'a:12:{s:19:\"email_notifications\";b:1;s:17:\"sms_notifications\";b:1;s:12:\"quote_alerts\";b:1;s:18:\"testimonial_alerts\";b:1;s:11:\"blog_alerts\";b:0;s:14:\"contact_alerts\";b:1;s:24:\"user_registration_alerts\";b:1;s:11:\"quoteAlerts\";b:1;s:17:\"testimonialAlerts\";b:1;s:10:\"blogAlerts\";b:1;s:16:\"smsNotifications\";b:1;s:18:\"emailNotifications\";b:1;}', 1754070918),
('laravel-cache-settings_security', 'a:6:{s:15:\"two_factor_auth\";b:0;s:15:\"session_timeout\";i:30;s:15:\"password_expiry\";i:90;s:14:\"login_attempts\";i:5;s:19:\"password_min_length\";i:8;s:23:\"require_strong_password\";b:1;}', 1754070796),
('laravel-cache-settings_social', 'a:5:{s:8:\"facebook\";s:31:\"https://facebook.com/bnbatiment\";s:7:\"twitter\";s:30:\"https://twitter.com/bnbatiment\";s:8:\"linkedin\";s:39:\"https://linkedin.com/company/bnbatiment\";s:9:\"instagram\";s:32:\"https://instagram.com/bnbatiment\";s:7:\"youtube\";s:30:\"https://youtube.com/bnbatiment\";}', 1754070796);

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `admin_response` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `admin_response`, `created_at`, `updated_at`) VALUES
(1, 'Laurence Martin', 'laurence.martin@email.fr', '0123456789', 'Demande de renseignements', 'Bonjour, je souhaite des informations sur vos services de couverture. Pouvez-vous me rappeler ?', 'unread', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(2, 'Thomas Bernard', 'thomas.bernard@email.fr', '0987654321', 'Devis gratuit', 'Bonjour, j\'aimerais un devis gratuit pour la réparation de ma toiture. Merci de me contacter.', 'unread', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(3, 'Nathalie Durand', 'nathalie.durand@email.fr', '0555666777', 'Question technique', 'J\'ai une question technique concernant l\'isolation de ma toiture. Pouvez-vous me conseiller ?', 'unread', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items`
--

CREATE TABLE `gallery_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery_items`
--

INSERT INTO `gallery_items` (`id`, `title`, `description`, `image`, `category`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Toiture traditionnelle en tuiles', 'Installation complète d\'une toiture traditionnelle en tuiles terre cuite', 'data:image/jpeg;base64,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', 'Couverture', 1, 1, '2025-08-01 11:57:04', '2025-08-01 12:36:52'),
(2, 'Charpente en bois massif', 'Construction d\'une charpente traditionnelle en bois massif', 'gallery/wooden-frame-1.jpg', 'Charpente', 2, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(3, 'Zinguerie en zinc', 'Installation de zinguerie complète en zinc', 'gallery/zinc-work-1.jpg', 'Zinguerie', 3, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(4, 'Toiture moderne', 'Toiture moderne avec matériaux innovants', 'gallery/modern-roof-1.jpg', 'Couverture', 4, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(5, 'Rénovation complète', 'Rénovation complète d\'une toiture ancienne', 'gallery/renovation-1.jpg', 'Rénovation', 5, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(6, 'Entretien préventif', 'Service d\'entretien préventif sur toiture', 'gallery/maintenance-1.jpg', 'Maintenance', 6, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(7, 'Rénovation Toiture Tuiles', 'Rénovation complète d\'une toiture en tuiles avec isolation thermique', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop', 'Charpente', 1, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(8, 'Installation Zinc', 'Installation de zinguerie en zinc avec système d\'évacuation', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', 'Zinguerie', 2, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(9, 'Réparation Gouttières', 'Réparation et remplacement de gouttières endommagées', 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 3, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(10, 'Isolation Thermique', 'Isolation thermique de toiture avec matériaux performants', 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 4, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(11, 'Charpente Traditionnelle', 'Construction de charpente traditionnelle en bois massif', 'https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 5, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(12, 'Couverture Ardoise', 'Installation de couverture en ardoise naturelle', 'https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 6, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(13, 'Zinguerie Étanchéité', 'Travaux d\'étanchéité et zinguerie complète', 'https://images.unsplash.com/photo-1581578731548-11f23fd1e3c6d?w=800&h=600&fit=crop', 'Zinguerie', 7, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(14, 'Rénovation Complète', 'Rénovation complète de toiture avec tous les travaux', 'https://images.unsplash.com/photo-1581578731548-12f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 8, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(15, 'Installation Velux', 'Installation de fenêtres de toit Velux', 'https://images.unsplash.com/photo-1581578731548-13f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 9, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(16, 'Nettoyage Toiture', 'Nettoyage professionnel de toiture et traitement', 'https://images.unsplash.com/photo-1581578731548-14f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 10, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(17, 'Réparation Fuite', 'Réparation urgente de fuite de toiture', 'https://images.unsplash.com/photo-1581578731548-15f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 11, 1, '2025-08-01 12:27:57', '2025-08-01 12:27:57'),
(19, 'Rénovation Toiture Tuiles', 'Rénovation complète d\'une toiture en tuiles avec isolation thermique', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop', 'Charpente', 1, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(20, 'Installation Zinc', 'Installation de zinguerie en zinc avec système d\'évacuation', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', 'Zinguerie', 2, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(21, 'Réparation Gouttières', 'Réparation et remplacement de gouttières endommagées', 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 3, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(22, 'Isolation Thermique', 'Isolation thermique de toiture avec matériaux performants', 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 4, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(23, 'Charpente Traditionnelle', 'Construction de charpente traditionnelle en bois massif', 'https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 5, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(24, 'Couverture Ardoise', 'Installation de couverture en ardoise naturelle', 'https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 6, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(25, 'Zinguerie Étanchéité', 'Travaux d\'étanchéité et zinguerie complète', 'https://images.unsplash.com/photo-1581578731548-11f23fd1e3c6d?w=800&h=600&fit=crop', 'Zinguerie', 7, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(26, 'Rénovation Complète', 'Rénovation complète de toiture avec tous les travaux', 'https://images.unsplash.com/photo-1581578731548-12f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 8, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(27, 'Installation Velux', 'Installation de fenêtres de toit Velux', 'https://images.unsplash.com/photo-1581578731548-13f23fd1e3c6d?w=800&h=600&fit=crop', 'Charpente', 9, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(28, 'Nettoyage Toiture', 'Nettoyage professionnel de toiture et traitement', 'https://images.unsplash.com/photo-1581578731548-14f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 10, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(29, 'Réparation Fuite', 'Réparation urgente de fuite de toiture', 'https://images.unsplash.com/photo-1581578731548-15f23fd1e3c6d?w=800&h=600&fit=crop', 'Couverture', 11, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_08_01_151240_add_read_time_to_blog_posts_table', 1),
(2, '2025_08_01_151819_update_blog_posts_image_column', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth-token', '62020532ace8ed691373c44d37c4a13b74e4c949954a07c6429c4b6ad989cbb3', '[\"*\"]', '2025-08-01 11:53:03', NULL, '2025-08-01 10:33:34', '2025-08-01 11:53:03'),
(2, 'App\\Models\\User', 2, 'auth-token', 'f2f85fef4f14fb192bacf4a4d534bc1d8304700a0d242bf2736f9b79da2fd395', '[\"*\"]', '2025-08-01 11:59:40', NULL, '2025-08-01 11:56:36', '2025-08-01 11:59:40'),
(3, 'App\\Models\\User', 2, 'auth-token', 'dbb6799a2f8537483cc3b8d4cdf086eafd5542c872a94e4783e3db4508cb04d1', '[\"*\"]', '2025-08-01 12:03:57', NULL, '2025-08-01 12:02:20', '2025-08-01 12:03:57'),
(4, 'App\\Models\\User', 2, 'auth-token', '537506527b0dbbeb52a70254a860273d73d348d52aebd90d853e8177a0ca6070', '[\"*\"]', '2025-08-01 13:20:36', NULL, '2025-08-01 12:04:23', '2025-08-01 13:20:36'),
(5, 'App\\Models\\User', 2, 'auth-token', 'd80ef40ec31340ca179678a513141166def8cc4b870d596aac0198f4668ef94a', '[\"*\"]', '2025-08-01 13:42:41', NULL, '2025-08-01 13:34:57', '2025-08-01 13:42:41'),
(6, 'App\\Models\\User', 2, 'auth-token', '3d813e10b645c3cf02a0a3b86c52555689afad31862dfa9b8f9ac0ebd102fe11', '[\"*\"]', '2025-08-01 13:56:39', NULL, '2025-08-01 13:43:04', '2025-08-01 13:56:39'),
(7, 'App\\Models\\User', 2, 'auth-token', 'c599921834a93cf33809f4c59c4039ee30f02c4888c3ecef488b793510448f6f', '[\"*\"]', '2025-08-01 14:07:17', NULL, '2025-08-01 13:56:41', '2025-08-01 14:07:17'),
(9, 'App\\Models\\User', 2, 'auth-token', '603e7347a2931fbc16fb21734ef58057850a933d03b0a1e3ce5189da9dfb3a7e', '[\"*\"]', '2025-08-01 16:41:55', NULL, '2025-08-01 14:23:05', '2025-08-01 16:41:55');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `service_type` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `urgency` enum('normal','urgent','très_urgent') DEFAULT 'normal',
  `status` enum('pending','approved','rejected','completed') DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `name`, `email`, `phone`, `address`, `service_type`, `description`, `urgency`, `status`, `admin_notes`, `created_at`, `updated_at`) VALUES
(1, 'François Petit', 'francois.petit@email.fr', '0123456789', '45 Rue de la Paix, 75001 Paris', 'Couverture Traditionnelle', 'Bonjour, je souhaite un devis pour la rénovation complète de ma toiture en tuiles. Surface approximative : 120m².', 'normal', 'pending', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(2, 'Isabelle Rousseau', 'isabelle.rousseau@email.fr', '0987654321', '78 Avenue Victor Hugo, 69000 Lyon', 'Zinguerie', 'J\'ai besoin d\'un devis pour remplacer ma zinguerie complète. La maison fait environ 150m².', 'urgent', 'pending', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(3, 'Marc Dubois', 'marc.dubois@email.fr', '0555666777', '123 Boulevard de la République, 13000 Marseille', 'Charpente Bois', 'Devis pour construction d\'une charpente en bois pour extension de maison. Surface : 80m².', 'normal', 'pending', NULL, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(4, 'Jean Dupont', 'jean.dupont@email.com', '06 12 34 56 78', '123 Rue de la Paix, 75001 Paris', 'Charpente', 'Rénovation complète de la charpente d\'une maison ancienne. Travaux de renforcement et remplacement des éléments dégradés.', 'urgent', 'approved', 'Client très satisfait du devis. Travaux prévus pour le mois prochain.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(5, 'Marie Martin', 'marie.martin@email.com', '06 98 76 54 32', '456 Avenue des Champs, 69000 Lyon', 'Couverture', 'Remplacement de la toiture en tuiles. Surface de 120m². Demande de devis pour matériaux et main d\'œuvre.', 'normal', 'approved', 'Devis accepté. Début des travaux dans 2 semaines.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(6, 'Pierre Durand', 'pierre.durand@email.com', '06 11 22 33 44', '789 Boulevard Central, 13000 Marseille', 'Zinguerie', 'Installation de gouttières et descentes d\'eau. Maison de plain-pied avec garage.', 'urgent', 'approved', 'Urgent - fuites importantes. Intervention prévue cette semaine.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(7, 'Sophie Bernard', 'sophie.bernard@email.com', '06 55 66 77 88', '321 Rue du Commerce, 44000 Nantes', 'Maintenance', 'Entretien annuel de la toiture. Vérification des tuiles et nettoyage des gouttières.', 'normal', 'pending', 'Devis en cours de préparation.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(8, 'Lucas Petit', 'lucas.petit@email.com', '06 99 88 77 66', '654 Chemin des Oliviers, 06000 Nice', 'Installation', 'Installation d\'une nouvelle charpente pour extension. Surface de 80m².', 'normal', 'pending', 'Devis envoyé, en attente de réponse client.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(9, 'Emma Roux', 'emma.roux@email.com', '06 44 33 22 11', '987 Avenue Victor Hugo, 31000 Toulouse', 'Réparation', 'Réparation d\'une fuite dans la toiture. Tuiles cassées à remplacer.', 'urgent', 'pending', 'Client contacté, rendez-vous prévu.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(10, 'Thomas Moreau', 'thomas.moreau@email.com', '06 77 88 99 00', '147 Rue de la République, 21000 Dijon', 'Charpente', 'Construction d\'une charpente pour nouvelle maison. Plans fournis.', 'normal', 'approved', 'Projet validé. Début des travaux en septembre.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(11, 'Julie Leroy', 'julie.leroy@email.com', '06 33 44 55 66', '258 Place du Marché, 35000 Rennes', 'Couverture', 'Rénovation complète toiture. Changement de tuiles et isolation.', 'normal', 'rejected', 'Client a choisi un autre prestataire.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(12, 'Nicolas Girard', 'nicolas.girard@email.com', '06 22 33 44 55', '369 Rue des Fleurs, 59000 Lille', 'Zinguerie', 'Installation de chéneaux et descentes d\'eau. Bâtiment commercial.', 'urgent', 'approved', 'Projet commercial important. Travaux en cours.', '2025-08-01 14:30:25', '2025-08-01 14:30:25'),
(13, 'Camille Dubois', 'camille.dubois@email.com', '06 88 99 00 11', '741 Avenue Jean Jaurès, 67000 Strasbourg', 'Maintenance', 'Contrat d\'entretien annuel pour copropriété. 5 bâtiments.', 'normal', 'pending', 'Devis en cours pour contrat d\'entretien.', '2025-08-01 14:30:25', '2025-08-01 14:30:25');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `long_description` text NOT NULL,
  `icon` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `price_range` varchar(255) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`features`)),
  `sub_services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sub_services`)),
  `materials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`materials`)),
  `advantages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`advantages`)),
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `long_description`, `icon`, `slug`, `category`, `duration`, `price_range`, `features`, `sub_services`, `materials`, `advantages`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Couverture Traditionnelle', 'Installation et réparation de toitures traditionnelles', 'Service complet de couverture traditionnelle incluant l\'installation, la réparation et l\'entretien des toitures en tuiles, ardoises et autres matériaux traditionnels.', 'roof-icon', 'couverture-traditionnelle', 'Couverture', '2-4 semaines', '5000-15000€', '[\"Installation complète\", \"Réparation\", \"Entretien\", \"Garantie 10 ans\"]', '[\"Pose de tuiles\", \"Pose d\'ardoises\", \"Réparation de fuites\", \"Remplacement de tuiles\"]', '[\"Tuiles terre cuite\", \"Ardoises naturelles\", \"Lattes bois\", \"Clous cuivre\"]', '[\"Durabilité\", \"Esthétique traditionnelle\", \"Isolation thermique\", \"Résistance aux intempéries\"]', NULL, 1, 1, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(2, 'Charpente Bois', 'Construction et réparation de charpentes en bois', 'Fabrication et installation de charpentes en bois massif, réparation et renforcement des structures existantes.', 'wood-icon', 'charpente-bois', 'Charpente', '3-6 semaines', '8000-25000€', '[\"Conception sur mesure\", \"Fabrication\", \"Installation\", \"Garantie 15 ans\"]', '[\"Charpente traditionnelle\", \"Charpente moderne\", \"Renforcement\", \"Restauration\"]', '[\"Bois massif\", \"Fermettes\", \"Poutres\", \"Connecteurs\"]', '[\"Solidité\", \"Esthétique\", \"Durabilité\", \"Écologique\"]', NULL, 1, 2, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(3, 'Zinguerie', 'Installation et réparation de zinguerie', 'Pose et réparation de tous types de zinguerie pour assurer l\'étanchéité et l\'évacuation des eaux pluviales.', 'zinc-icon', 'zinguerie', 'Zinguerie', '1-2 semaines', '2000-8000€', '[\"Pose complète\", \"Réparation\", \"Entretien\", \"Garantie 5 ans\"]', '[\"Gouttières\", \"Descentes\", \"Chéneaux\", \"Solin\"]', '[\"Zinc\", \"Aluminium\", \"PVC\", \"Cuivre\"]', '[\"Étanchéité\", \"Durabilité\", \"Esthétique\", \"Facilité d\'entretien\"]', NULL, 1, 3, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(4, 'Installation Électrique', 'Installation électrique pour toitures', 'Installation de systèmes électriques pour toitures incluant l\'éclairage, les prises et les systèmes de sécurité.', 'electric-icon', 'installation-electrique', 'Électricité', '1-3 semaines', '3000-12000€', '[\"Installation complète\", \"Mise aux normes\", \"Maintenance\", \"Garantie 5 ans\"]', '[\"Éclairage\", \"Prises\", \"Systèmes de sécurité\", \"Mise aux normes\"]', '[\"Câbles\", \"Interrupteurs\", \"Prises\", \"Tableaux électriques\"]', '[\"Sécurité\", \"Conformité\", \"Fiabilité\", \"Maintenance facile\"]', NULL, 1, 4, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(5, 'Maintenance Préventive', 'Entretien préventif des toitures', 'Service d\'entretien préventif pour maintenir l\'état optimal de votre toiture et éviter les réparations coûteuses.', 'maintenance-icon', 'maintenance-preventive', 'Maintenance', '1 jour - 1 semaine', '500-3000€', '[\"Inspection complète\", \"Nettoyage\", \"Petites réparations\", \"Rapport détaillé\"]', '[\"Inspection\", \"Nettoyage\", \"Petites réparations\", \"Conseils\"]', '[\"Outils d\'inspection\", \"Produits de nettoyage\", \"Matériaux de réparation\"]', '[\"Prévention\", \"Économies\", \"Durabilité\", \"Tranquillité\"]', NULL, 1, 5, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(6, 'Réparation d\'Urgence', 'Réparation rapide des dommages', 'Service d\'urgence pour réparer rapidement les dommages causés par les intempéries ou autres événements.', 'emergency-icon', 'reparation-urgence', 'Réparation', '1-3 jours', '1000-8000€', '[\"Intervention rapide\", \"Diagnostic\", \"Réparation\", \"Garantie\"]', '[\"Réparation de fuites\", \"Remplacement de tuiles\", \"Réparation de gouttières\", \"Sécurisation\"]', '[\"Matériaux de réparation\", \"Outils\", \"Équipements de sécurité\"]', '[\"Rapidité\", \"Efficacité\", \"Sécurité\", \"Fiabilité\"]', NULL, 1, 6, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(7, 'Extras et Finitions', 'Services complémentaires', 'Services additionnels pour compléter vos travaux de toiture avec des finitions de qualité.', 'finishing-icon', 'extras-finitions', 'Finitions', 'Variable', '500-5000€', '[\"Finitions\", \"Détails\", \"Personnalisation\", \"Qualité\"]', '[\"Finitions\", \"Détails architecturaux\", \"Personnalisation\", \"Décoration\"]', '[\"Matériaux de finition\", \"Outils\", \"Accessoires\"]', '[\"Esthétique\", \"Personnalisation\", \"Qualité\", \"Valeur ajoutée\"]', NULL, 1, 7, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(8, 'Installation', 'Installation complète de toitures neuves', 'Installation complète de toitures pour constructions neuves. Nous prenons en charge l\'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.', '🔨', 'installation', 'Construction', '3-12 semaines', 'À partir de 25 000€', '[\"Installation compl\\u00e8te de charpente\",\"Pose de couverture\",\"Installation de zinguerie\",\"Isolation thermique\",\"Fen\\u00eatres de toit\",\"Finitions int\\u00e9rieures\"]', '[{\"name\":\"Installation Compl\\u00e8te\",\"description\":\"Charpente + Couverture + Zinguerie\",\"price\":\"\\u00c0 partir de 25 000\\u20ac\",\"duration\":\"6-12 semaines\"},{\"name\":\"Installation Partielle\",\"description\":\"Couverture + Zinguerie\",\"price\":\"\\u00c0 partir de 15 000\\u20ac\",\"duration\":\"3-6 semaines\"}]', '[\"Bois\",\"Tuiles\",\"Zinc\",\"Isolants\",\"Accessoires\"]', '[\"Installation compl\\u00e8te\",\"Coordination des corps d\'\\u00e9tat\",\"Respect des d\\u00e9lais\",\"Garantie d\\u00e9cennale\",\"Suivi de chantier\",\"R\\u00e9ception des travaux\"]', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 1, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(9, 'Réparation', 'Réparation et dépannage de toitures', 'Service de réparation et dépannage pour tous types de problèmes de toiture. Intervention rapide pour résoudre les fuites, les dégâts et les problèmes d\'étanchéité.', '🔧', 'reparation', 'Maintenance', '1 jour - 1 semaine', 'À partir de 500€', '[\"R\\u00e9paration de fuites\",\"Remplacement de tuiles\",\"R\\u00e9paration de goutti\\u00e8res\",\"Raccordements d\'urgence\",\"Diagnostic de probl\\u00e8mes\",\"Intervention rapide\"]', '[{\"name\":\"R\\u00e9paration d\'Urgence\",\"description\":\"Intervention rapide pour fuites\",\"price\":\"\\u00c0 partir de 500\\u20ac\",\"duration\":\"1 jour\"},{\"name\":\"R\\u00e9paration Standard\",\"description\":\"R\\u00e9parations programm\\u00e9es\",\"price\":\"\\u00c0 partir de 1 000\\u20ac\",\"duration\":\"2-5 jours\"}]', '[\"Tuiles de remplacement\",\"Zinc\",\"Mastics\",\"Accessoires\"]', '[\"Intervention d\'urgence\",\"Diagnostic gratuit\",\"R\\u00e9paration garantie\",\"Prix transparents\",\"\\u00c9quipe disponible\",\"Service 7j\\/7\"]', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 1, 2, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(10, 'Entretien', 'Entretien et maintenance préventive', 'Service de maintenance préventive pour prolonger la durée de vie de votre toiture. Inspections régulières, nettoyage et entretien pour éviter les problèmes futurs.', '🛠️', 'entretien', 'Entretien', '1-3 jours', 'À partir de 300€', '[\"Inspection annuelle\",\"Nettoyage des goutti\\u00e8res\",\"V\\u00e9rification de l\'\\u00e9tanch\\u00e9it\\u00e9\",\"Entretien des accessoires\",\"Rapport d\\u00e9taill\\u00e9\",\"Conseils personnalis\\u00e9s\"]', '[{\"name\":\"Entretien Annuel\",\"description\":\"Inspection compl\\u00e8te et nettoyage\",\"price\":\"\\u00c0 partir de 300\\u20ac\",\"duration\":\"1 jour\"},{\"name\":\"Entretien Bisannuel\",\"description\":\"Entretien deux fois par an\",\"price\":\"\\u00c0 partir de 500\\u20ac\",\"duration\":\"2 jours\"}]', '[\"Produits de nettoyage\",\"Accessoires de remplacement\"]', '[\"Pr\\u00e9vention des probl\\u00e8mes\",\"Prolongation de la dur\\u00e9e de vie\",\"\\u00c9conomies \\u00e0 long terme\",\"Tranquillit\\u00e9 d\'esprit\",\"Service personnalis\\u00e9\",\"Garantie de satisfaction\"]', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 1, 3, '2025-08-01 13:32:48', '2025-08-01 13:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `location`, `content`, `rating`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(2, 'Jean Martin', 'Lyon', 'Service de zinguerie impeccable. Intervention rapide et travail soigné. Très satisfait du résultat.', 5, NULL, 1, 2, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(3, 'Sophie Bernard', 'Marseille', 'Rénovation complète de notre toiture. L\'équipe a respecté les délais et le budget. Travail de qualité.', 5, NULL, 1, 3, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(4, 'Pierre Durand', 'Toulouse', 'Entretien préventif régulier. Équipe sérieuse et professionnelle. Je recommande leurs services.', 5, NULL, 1, 4, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(5, 'Claire Moreau', 'Bordeaux', 'Installation d\'une charpente en bois. Travail remarquable et respect de l\'esthétique traditionnelle.', 5, NULL, 1, 5, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(6, 'Michel Leroy', 'Nantes', 'Réparation d\'urgence suite à une tempête. Intervention rapide et efficace. Service client exceptionnel.', 5, NULL, 1, 6, '2025-08-01 11:57:04', '2025-08-01 11:57:04'),
(7, 'Marie Dubois', 'Lyon', 'Excellent service ! L\'équipe a été professionnelle du début à la fin. Notre nouvelle toiture est magnifique et l\'installation s\'est déroulée parfaitement.', 5, NULL, 1, 1, '2025-08-01 11:46:15', '2025-08-01 11:46:15'),
(8, 'Pierre Martin', 'Marseille', 'Intervention rapide et efficace pour réparer une fuite urgente. Prix honnêtes et travail de qualité. Je recommande vivement !', 5, NULL, 1, 2, '2025-08-01 11:46:15', '2025-08-01 11:46:15'),
(9, 'Sophie Bernard', 'Toulouse', 'Service d\'entretien annuel impeccable. L\'équipe est ponctuelle, professionnelle et donne de bons conseils pour maintenir notre toiture.', 5, NULL, 1, 3, '2025-08-01 11:46:15', '2025-08-01 11:46:15'),
(10, 'Marie Dubois', 'Lyon', 'Excellent service ! L\'équipe a été professionnelle du début à la fin. Notre nouvelle toiture est magnifique et l\'installation s\'est déroulée parfaitement.', 5, NULL, 1, 1, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(11, 'Pierre Martin', 'Marseille', 'Intervention rapide et efficace pour réparer une fuite urgente. Prix honnêtes et travail de qualité. Je recommande vivement !', 5, NULL, 1, 2, '2025-08-01 13:32:48', '2025-08-01 13:32:48'),
(12, 'Sophie Bernard', 'Toulouse', 'Service d\'entretien annuel impeccable. L\'équipe est ponctuelle, professionnelle et donne de bons conseils pour maintenir notre toiture.', 5, NULL, 1, 3, '2025-08-01 13:32:48', '2025-08-01 13:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `address`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Admin', 'admin@bnbuilding.fr', '+33 1 23 45 67 89', '123 Rue de la Construction, 75001 Paris, France', 'admin', NULL, '$2y$12$Y3vpUQo1nNhZbiBOaDTJ/.OHe9H6nDWzwI4dzdDMKMGEJdS82.xxe', NULL, '2025-08-01 10:24:13', '2025-08-01 10:24:13'),
(3, 'Admin', 'admin@bnbuilding.com', NULL, NULL, 'user', NULL, '$2y$12$phJD5CX6uJ9rjPyrW7CTIe4I3xQ/rSzjVVOx33IRY4TqTuSDA8Azy', NULL, '2025-08-01 13:32:48', '2025-08-01 13:32:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_blog_posts_slug` (`slug`),
  ADD KEY `idx_blog_posts_is_published` (`is_published`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contact_messages_status` (`status`),
  ADD KEY `idx_contact_messages_email` (`email`);

--
-- Indexes for table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_gallery_items_category` (`category`),
  ADD KEY `idx_gallery_items_is_active` (`is_active`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_quotes_status` (`status`),
  ADD KEY `idx_quotes_urgency` (`urgency`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_services_slug` (`slug`),
  ADD KEY `idx_services_category` (`category`),
  ADD KEY `idx_services_is_active` (`is_active`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_testimonials_is_active` (`is_active`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gallery_items`
--
ALTER TABLE `gallery_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
