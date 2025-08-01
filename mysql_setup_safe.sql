-- =====================================================
-- Configuration MySQL pour Couvreur Project (Version Sécurisée)
-- Base de données: couvreur_db
-- Charset: utf8mb4
-- Collation: utf8mb4_unicode_ci
-- Engine: InnoDB
-- =====================================================

-- Créer la base de données (si elle n'existe pas)
CREATE DATABASE IF NOT EXISTS couvreur_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE couvreur_db;

-- =====================================================
-- Suppression des tables existantes (si elles existent)
-- =====================================================

DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cache;
DROP TABLE IF EXISTS jobs;

-- =====================================================
-- Table: users (Utilisateurs)
-- =====================================================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: password_reset_tokens (Jetons de réinitialisation)
-- =====================================================
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: sessions (Sessions utilisateur)
-- =====================================================
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    INDEX sessions_user_id_index (user_id),
    INDEX sessions_last_activity_index (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: services (Services)
-- =====================================================
CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    icon VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    price_range VARCHAR(255) NOT NULL,
    features JSON NOT NULL,
    sub_services JSON NOT NULL,
    materials JSON NOT NULL,
    advantages JSON NOT NULL,
    image VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_services_slug (slug),
    INDEX idx_services_category (category),
    INDEX idx_services_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: blog_posts (Articles de blog)
-- =====================================================
CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_blog_posts_slug (slug),
    INDEX idx_blog_posts_is_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: gallery_items (Éléments de galerie)
-- =====================================================
CREATE TABLE gallery_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_gallery_items_category (category),
    INDEX idx_gallery_items_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: testimonials (Témoignages)
-- =====================================================
CREATE TABLE testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    image VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_testimonials_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: quotes (Devis)
-- =====================================================
CREATE TABLE quotes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency ENUM('normal', 'urgent', 'très_urgent') DEFAULT 'normal',
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    admin_notes TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_quotes_status (status),
    INDEX idx_quotes_urgency (urgency)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: contact_messages (Messages de contact)
-- =====================================================
CREATE TABLE contact_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    admin_response TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_contact_messages_status (status),
    INDEX idx_contact_messages_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: cache (Cache)
-- =====================================================
CREATE TABLE cache (
    `key` VARCHAR(255) PRIMARY KEY,
    `value` MEDIUMTEXT NOT NULL,
    expiration INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: jobs (Tâches en arrière-plan)
-- =====================================================
CREATE TABLE jobs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload LONGTEXT NOT NULL,
    attempts TINYINT UNSIGNED NOT NULL,
    reserved_at INT UNSIGNED NULL,
    available_at INT UNSIGNED NOT NULL,
    created_at INT UNSIGNED NOT NULL,
    INDEX jobs_queue_index (queue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Insertion des données d'exemple
-- =====================================================

-- Insertion d'un utilisateur administrateur
INSERT INTO users (name, email, phone, address, role, password, created_at, updated_at) VALUES
('Admin Couvreur', 'admin@couvreur.fr', '0123456789', '123 Rue de la Toiture, 75001 Paris', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());

-- Insertion des services
INSERT INTO services (title, description, long_description, icon, slug, category, duration, price_range, features, sub_services, materials, advantages, is_active, sort_order, created_at, updated_at) VALUES
('Couverture Traditionnelle', 'Installation et réparation de toitures traditionnelles', 'Service complet de couverture traditionnelle incluant l\'installation, la réparation et l\'entretien des toitures en tuiles, ardoises et autres matériaux traditionnels.', 'roof-icon', 'couverture-traditionnelle', 'Couverture', '2-4 semaines', '5000-15000€', '["Installation complète", "Réparation", "Entretien", "Garantie 10 ans"]', '["Pose de tuiles", "Pose d\'ardoises", "Réparation de fuites", "Remplacement de tuiles"]', '["Tuiles terre cuite", "Ardoises naturelles", "Lattes bois", "Clous cuivre"]', '["Durabilité", "Esthétique traditionnelle", "Isolation thermique", "Résistance aux intempéries"]', TRUE, 1, NOW(), NOW()),

('Charpente Bois', 'Construction et réparation de charpentes en bois', 'Fabrication et installation de charpentes en bois massif, réparation et renforcement des structures existantes.', 'wood-icon', 'charpente-bois', 'Charpente', '3-6 semaines', '8000-25000€', '["Conception sur mesure", "Fabrication", "Installation", "Garantie 15 ans"]', '["Charpente traditionnelle", "Charpente moderne", "Renforcement", "Restauration"]', '["Bois massif", "Fermettes", "Poutres", "Connecteurs"]', '["Solidité", "Esthétique", "Durabilité", "Écologique"]', TRUE, 2, NOW(), NOW()),

('Zinguerie', 'Installation et réparation de zinguerie', 'Pose et réparation de tous types de zinguerie pour assurer l\'étanchéité et l\'évacuation des eaux pluviales.', 'zinc-icon', 'zinguerie', 'Zinguerie', '1-2 semaines', '2000-8000€', '["Pose complète", "Réparation", "Entretien", "Garantie 5 ans"]', '["Gouttières", "Descentes", "Chéneaux", "Solin"]', '["Zinc", "Aluminium", "PVC", "Cuivre"]', '["Étanchéité", "Durabilité", "Esthétique", "Facilité d\'entretien"]', TRUE, 3, NOW(), NOW()),

('Installation Électrique', 'Installation électrique pour toitures', 'Installation de systèmes électriques pour toitures incluant l\'éclairage, les prises et les systèmes de sécurité.', 'electric-icon', 'installation-electrique', 'Électricité', '1-3 semaines', '3000-12000€', '["Installation complète", "Mise aux normes", "Maintenance", "Garantie 5 ans"]', '["Éclairage", "Prises", "Systèmes de sécurité", "Mise aux normes"]', '["Câbles", "Interrupteurs", "Prises", "Tableaux électriques"]', '["Sécurité", "Conformité", "Fiabilité", "Maintenance facile"]', TRUE, 4, NOW(), NOW()),

('Maintenance Préventive', 'Entretien préventif des toitures', 'Service d\'entretien préventif pour maintenir l\'état optimal de votre toiture et éviter les réparations coûteuses.', 'maintenance-icon', 'maintenance-preventive', 'Maintenance', '1 jour - 1 semaine', '500-3000€', '["Inspection complète", "Nettoyage", "Petites réparations", "Rapport détaillé"]', '["Inspection", "Nettoyage", "Petites réparations", "Conseils"]', '["Outils d\'inspection", "Produits de nettoyage", "Matériaux de réparation"]', '["Prévention", "Économies", "Durabilité", "Tranquillité"]', TRUE, 5, NOW(), NOW()),

('Réparation d\'Urgence', 'Réparation rapide des dommages', 'Service d\'urgence pour réparer rapidement les dommages causés par les intempéries ou autres événements.', 'emergency-icon', 'reparation-urgence', 'Réparation', '1-3 jours', '1000-8000€', '["Intervention rapide", "Diagnostic", "Réparation", "Garantie"]', '["Réparation de fuites", "Remplacement de tuiles", "Réparation de gouttières", "Sécurisation"]', '["Matériaux de réparation", "Outils", "Équipements de sécurité"]', '["Rapidité", "Efficacité", "Sécurité", "Fiabilité"]', TRUE, 6, NOW(), NOW()),

('Extras et Finitions', 'Services complémentaires', 'Services additionnels pour compléter vos travaux de toiture avec des finitions de qualité.', 'finishing-icon', 'extras-finitions', 'Finitions', 'Variable', '500-5000€', '["Finitions", "Détails", "Personnalisation", "Qualité"]', '["Finitions", "Détails architecturaux", "Personnalisation", "Décoration"]', '["Matériaux de finition", "Outils", "Accessoires"]', '["Esthétique", "Personnalisation", "Qualité", "Valeur ajoutée"]', TRUE, 7, NOW(), NOW());

-- Insertion des articles de blog
INSERT INTO blog_posts (title, content, excerpt, author, category, slug, is_published, published_at, created_at, updated_at) VALUES
('Comment choisir le bon matériau de couverture', 'Un guide complet pour choisir le matériau de couverture idéal selon votre région, votre budget et vos préférences esthétiques...', 'Découvrez les critères essentiels pour choisir le bon matériau de couverture pour votre maison.', 'Expert Couvreur', 'Conseils', 'choisir-materiau-couverture', TRUE, NOW(), NOW(), NOW()),

('L\'importance de l\'entretien préventif', 'L\'entretien préventif de votre toiture peut vous faire économiser des milliers d\'euros en évitant les réparations majeures...', 'Pourquoi l\'entretien préventif est crucial pour la longévité de votre toiture.', 'Expert Couvreur', 'Maintenance', 'importance-entretien-preventif', TRUE, NOW(), NOW(), NOW()),

('Les tendances 2024 en matière de toiture', 'Découvrez les nouvelles tendances en matière de toiture écologique et durable pour 2024...', 'Les innovations et tendances qui façonnent l\'avenir de la toiture.', 'Expert Couvreur', 'Tendances', 'tendances-2024-toiture', TRUE, NOW(), NOW(), NOW()),

('Guide complet de la zinguerie', 'Tout ce que vous devez savoir sur la zinguerie : types, installation, entretien et réparation...', 'Un guide détaillé pour comprendre et entretenir votre zinguerie.', 'Expert Couvreur', 'Zinguerie', 'guide-complet-zinguerie', TRUE, NOW(), NOW(), NOW()),

('Les avantages de la charpente en bois', 'Pourquoi choisir une charpente en bois ? Découvrez tous les avantages de ce matériau traditionnel...', 'Les nombreux avantages de la charpente en bois pour votre maison.', 'Expert Couvreur', 'Charpente', 'avantages-charpente-bois', TRUE, NOW(), NOW(), NOW());

-- Insertion des éléments de galerie
INSERT INTO gallery_items (title, description, image, category, sort_order, is_active, created_at, updated_at) VALUES
('Toiture traditionnelle en tuiles', 'Installation complète d\'une toiture traditionnelle en tuiles terre cuite', 'gallery/traditional-roof-1.jpg', 'Couverture', 1, TRUE, NOW(), NOW()),
('Charpente en bois massif', 'Construction d\'une charpente traditionnelle en bois massif', 'gallery/wooden-frame-1.jpg', 'Charpente', 2, TRUE, NOW(), NOW()),
('Zinguerie en zinc', 'Installation de zinguerie complète en zinc', 'gallery/zinc-work-1.jpg', 'Zinguerie', 3, TRUE, NOW(), NOW()),
('Toiture moderne', 'Toiture moderne avec matériaux innovants', 'gallery/modern-roof-1.jpg', 'Couverture', 4, TRUE, NOW(), NOW()),
('Rénovation complète', 'Rénovation complète d\'une toiture ancienne', 'gallery/renovation-1.jpg', 'Rénovation', 5, TRUE, NOW(), NOW()),
('Entretien préventif', 'Service d\'entretien préventif sur toiture', 'gallery/maintenance-1.jpg', 'Maintenance', 6, TRUE, NOW(), NOW());

-- Insertion des témoignages
INSERT INTO testimonials (name, location, content, rating, is_active, sort_order, created_at, updated_at) VALUES
('Marie Dubois', 'Paris 16ème', 'Excellent travail de couverture. L\'équipe a été professionnelle et le résultat est magnifique. Je recommande vivement !', 5, TRUE, 1, NOW(), NOW()),
('Jean Martin', 'Lyon', 'Service de zinguerie impeccable. Intervention rapide et travail soigné. Très satisfait du résultat.', 5, TRUE, 2, NOW(), NOW()),
('Sophie Bernard', 'Marseille', 'Rénovation complète de notre toiture. L\'équipe a respecté les délais et le budget. Travail de qualité.', 5, TRUE, 3, NOW(), NOW()),
('Pierre Durand', 'Toulouse', 'Entretien préventif régulier. Équipe sérieuse et professionnelle. Je recommande leurs services.', 5, TRUE, 4, NOW(), NOW()),
('Claire Moreau', 'Bordeaux', 'Installation d\'une charpente en bois. Travail remarquable et respect de l\'esthétique traditionnelle.', 5, TRUE, 5, NOW(), NOW()),
('Michel Leroy', 'Nantes', 'Réparation d\'urgence suite à une tempête. Intervention rapide et efficace. Service client exceptionnel.', 5, TRUE, 6, NOW(), NOW());

-- Insertion de quelques devis d'exemple
INSERT INTO quotes (name, email, phone, address, service_type, description, urgency, status, created_at, updated_at) VALUES
('François Petit', 'francois.petit@email.fr', '0123456789', '45 Rue de la Paix, 75001 Paris', 'Couverture Traditionnelle', 'Bonjour, je souhaite un devis pour la rénovation complète de ma toiture en tuiles. Surface approximative : 120m².', 'normal', 'pending', NOW(), NOW()),
('Isabelle Rousseau', 'isabelle.rousseau@email.fr', '0987654321', '78 Avenue Victor Hugo, 69000 Lyon', 'Zinguerie', 'J\'ai besoin d\'un devis pour remplacer ma zinguerie complète. La maison fait environ 150m².', 'urgent', 'pending', NOW(), NOW()),
('Marc Dubois', 'marc.dubois@email.fr', '0555666777', '123 Boulevard de la République, 13000 Marseille', 'Charpente Bois', 'Devis pour construction d\'une charpente en bois pour extension de maison. Surface : 80m².', 'normal', 'pending', NOW(), NOW());

-- Insertion de quelques messages de contact
INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at, updated_at) VALUES
('Laurence Martin', 'laurence.martin@email.fr', '0123456789', 'Demande de renseignements', 'Bonjour, je souhaite des informations sur vos services de couverture. Pouvez-vous me rappeler ?', 'unread', NOW(), NOW()),
('Thomas Bernard', 'thomas.bernard@email.fr', '0987654321', 'Devis gratuit', 'Bonjour, j\'aimerais un devis gratuit pour la réparation de ma toiture. Merci de me contacter.', 'unread', NOW(), NOW()),
('Nathalie Durand', 'nathalie.durand@email.fr', '0555666777', 'Question technique', 'J\'ai une question technique concernant l\'isolation de ma toiture. Pouvez-vous me conseiller ?', 'unread', NOW(), NOW());

-- =====================================================
-- Vérification finale
-- =====================================================
SELECT 'Base de données couvreur_db configurée avec succès!' AS Status;
SELECT COUNT(*) AS 'Nombre de tables' FROM information_schema.tables WHERE table_schema = 'couvreur_db';
SELECT 'Configuration MySQL sécurisée terminée!' AS Message; 