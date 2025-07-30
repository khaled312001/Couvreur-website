# 🏗️ Site Web Couvreur - BN BÂTIMENT

Site web professionnel pour une entreprise de couverture, charpente et zinguerie basé sur React et Laravel.

## 📋 Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Déploiement](#déploiement)
- [Contribution](#contribution)
- [Licence](#licence)

## 🎯 Description

BN BÂTIMENT est un site web moderne et responsive pour une entreprise spécialisée dans les travaux de couverture, charpente et zinguerie. Le projet comprend un frontend React avec une interface utilisateur moderne et un backend Laravel pour la gestion des données.

### Services proposés :
- **Charpente** : Construction et rénovation de charpentes traditionnelles et modernes
- **Couverture** : Installation et réparation de tous types de couvertures
- **Zinguerie** : Travaux de zinguerie et d'étanchéité
- **Entretien** : Services de maintenance préventive et curative

## ✨ Fonctionnalités

### Frontend (React)
- 🏠 **Page d'accueil** avec slider dynamique et présentation des services
- 📄 **Pages de services** détaillées (Réparation, Installation, Maintenance, Extras)
- 📞 **Page de contact** avec formulaire de devis
- 📝 **Blog** avec articles et conseils
- 🖼️ **Galerie** de réalisations avec filtres
- ⭐ **Témoignages clients** avec système de notation
- 📍 **Zones d'intervention** avec carte interactive
- 💰 **Tarifs** transparents et détaillés
- 🌐 **Support multilingue** (Français, Arabe)
- 📱 **Design responsive** pour tous les appareils

### Backend (Laravel)
- 🔐 **Système d'authentification** sécurisé
- 📊 **Panel d'administration** complet
- 📝 **Gestion de contenu** (Services, Blog, Galerie, Témoignages)
- 📋 **Gestion des devis** et demandes
- 🗄️ **Base de données** optimisée
- 🔄 **API RESTful** pour le frontend
- 📧 **Système d'emails** automatisé

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation SPA
- **Axios** - Client HTTP
- **React Hook Form** - Gestion des formulaires
- **Framer Motion** - Animations

### Backend
- **Laravel 11** - Framework PHP
- **MySQL** - Base de données
- **Eloquent ORM** - Gestion des données
- **Sanctum** - Authentification API
- **Mail** - Système d'emails
- **Queue** - Traitement asynchrone

### Outils de développement
- **Git** - Contrôle de version
- **ESLint** - Linting JavaScript
- **Prettier** - Formatage de code
- **PHPUnit** - Tests unitaires

## 📁 Structure du projet

```
Couvreur-website/
├── Front-End/                 # Application React
│   ├── public/               # Fichiers statiques
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── Admin/       # Pages d'administration
│   │   │   └── Services/    # Pages de services
│   │   ├── api/             # Services API
│   │   ├── context/         # Contextes React
│   │   ├── hooks/           # Hooks personnalisés
│   │   ├── i18n/            # Internationalisation
│   │   ├── layouts/         # Layouts de pages
│   │   └── styles/          # Fichiers CSS
│   ├── package.json
│   └── vite.config.js
├── Back-End/                 # Application Laravel
│   ├── app/
│   │   ├── Http/            # Contrôleurs et Middleware
│   │   ├── Models/          # Modèles Eloquent
│   │   └── Services/        # Services métier
│   ├── database/            # Migrations et Seeders
│   ├── routes/              # Définition des routes
│   ├── config/              # Configuration
│   └── composer.json
└── README.md
```

## 🚀 Installation

### Prérequis
- **Node.js** (version 18 ou supérieure)
- **PHP** (version 8.1 ou supérieure)
- **Composer** (gestionnaire de dépendances PHP)
- **MySQL** (version 8.0 ou supérieure)
- **Git**

### Installation du Frontend

```bash
# Cloner le repository
git clone https://github.com/khaled312001/Couvreur-website.git
cd Couvreur-website/Front-End

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

### Installation du Backend

```bash
# Aller dans le dossier backend
cd ../Back-End

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=couvreur_db
# DB_USERNAME=root
# DB_PASSWORD=

# Exécuter les migrations
php artisan migrate

# Lancer le serveur
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

## ⚙️ Configuration

### Variables d'environnement Frontend

Créer un fichier `.env` dans le dossier `Front-End/` :

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="BN BÂTIMENT"
```

### Variables d'environnement Backend

Configurer le fichier `.env` dans le dossier `Back-End/` :

```env
APP_NAME="BN BÂTIMENT"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=couvreur_db
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="contact@bnbatiment.fr"
MAIL_FROM_NAME="${APP_NAME}"
```

## 📖 Utilisation

### Développement

```bash
# Frontend - Mode développement
cd Front-End
npm run dev

# Backend - Mode développement
cd Back-End
php artisan serve
```

### Production

```bash
# Frontend - Build de production
cd Front-End
npm run build

# Backend - Optimisation
cd Back-End
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Commandes utiles

```bash
# Nettoyer le cache
php artisan cache:clear

# Redémarrer les migrations
php artisan migrate:fresh

# Générer des données de test
php artisan db:seed

# Lancer les tests
php artisan test
npm test
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/user` - Informations utilisateur

### Services
- `GET /api/services` - Liste des services
- `GET /api/services/{id}` - Détails d'un service
- `POST /api/services` - Créer un service
- `PUT /api/services/{id}` - Modifier un service
- `DELETE /api/services/{id}` - Supprimer un service

### Blog
- `GET /api/blog` - Liste des articles
- `GET /api/blog/{slug}` - Détails d'un article
- `POST /api/blog` - Créer un article
- `PUT /api/blog/{id}` - Modifier un article
- `DELETE /api/blog/{id}` - Supprimer un article

### Galerie
- `GET /api/gallery` - Liste des images
- `POST /api/gallery` - Ajouter une image
- `DELETE /api/gallery/{id}` - Supprimer une image

### Témoignages
- `GET /api/testimonials` - Liste des témoignages
- `POST /api/testimonials` - Ajouter un témoignage
- `PUT /api/testimonials/{id}` - Modifier un témoignage
- `DELETE /api/testimonials/{id}` - Supprimer un témoignage

### Devis
- `POST /api/quotes` - Créer un devis
- `GET /api/quotes` - Liste des devis (admin)
- `PUT /api/quotes/{id}` - Modifier un devis

## 🚀 Déploiement

### Frontend (Vercel/Netlify)

```bash
# Build de production
npm run build

# Déployer le dossier dist/
```

### Backend (Heroku/DigitalOcean)

```bash
# Configurer les variables d'environnement
# Déployer avec Git
git push heroku main
```

### Base de données

```bash
# Migration en production
php artisan migrate --force

# Optimisation
php artisan config:cache
php artisan route:cache
```

## 🤝 Contribution

1. **Fork** le projet
2. Créer une **branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

### Standards de code

- Suivre les conventions PSR-12 pour PHP
- Utiliser ESLint et Prettier pour JavaScript
- Écrire des tests pour les nouvelles fonctionnalités
- Documenter le code avec des commentaires

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :

- **Email** : contact@bnbatiment.fr
- **Téléphone** : 07 80 32 64 27
- **Horaires** : Lundi - Samedi : 7h00 - 20h

## 🙏 Remerciements

- **React** - Pour le framework frontend
- **Laravel** - Pour le framework backend
- **Tailwind CSS** - Pour le framework CSS
- **Vite** - Pour l'outil de build
- **GitHub** - Pour l'hébergement du code

---

**BN BÂTIMENT** - Spécialiste en charpente, couverture et zinguerie depuis plus de 15 ans. 