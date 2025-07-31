# BN BÂTIMENT - Système de Couverture

## Vue d'ensemble

Ce projet est un système complet de gestion pour une entreprise de couverture, comprenant un backend Laravel et un frontend React. Le système inclut maintenant un système d'authentification complet pour les utilisateurs réguliers.

## Fonctionnalités

### Pour les Utilisateurs Réguliers

#### Authentification
- **Inscription** : Les utilisateurs peuvent créer un compte avec leurs informations personnelles
- **Connexion** : Système de connexion sécurisé avec tokens JWT
- **Profil utilisateur** : Gestion des informations personnelles et changement de mot de passe
- **Déconnexion** : Système de déconnexion sécurisé

#### Gestion des Devis
- **Demande de devis** : Les utilisateurs connectés peuvent demander des devis
- **Suivi des devis** : Consultation de l'état des demandes de devis
- **Historique** : Accès à l'historique complet des devis

#### Messages de Contact
- **Envoi de messages** : Les utilisateurs connectés peuvent envoyer des messages
- **Suivi des messages** : Consultation des réponses de l'administrateur
- **Historique** : Accès à l'historique des messages

### Pour les Administrateurs

#### Dashboard
- Vue d'ensemble des statistiques
- Gestion des utilisateurs
- Suivi des devis et messages

#### Gestion du Contenu
- Services
- Blog
- Galerie
- Témoignages
- Messages de contact
- Devis

## Structure du Projet

### Backend (Laravel)

```
Back-End/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php      # Authentification
│   │   ├── ContactController.php   # Messages de contact
│   │   ├── QuoteController.php     # Devis
│   │   └── ...
│   ├── Models/
│   │   ├── User.php               # Modèle utilisateur
│   │   ├── Quote.php              # Modèle devis
│   │   ├── ContactMessage.php     # Modèle message
│   │   └── ...
│   └── ...
├── database/migrations/
│   ├── create_users_table.php
│   ├── create_quotes_table.php
│   ├── create_contact_messages_table.php
│   └── ...
└── routes/api.php
```

### Frontend (React)

```
Front-End/src/
├── components/
│   ├── Header.jsx                # En-tête avec authentification
│   └── ...
├── context/
│   └── AuthContext.jsx           # Contexte d'authentification
├── pages/
│   ├── Login.jsx                 # Page de connexion
│   ├── Register.jsx              # Page d'inscription
│   ├── Profile.jsx               # Profil utilisateur
│   ├── UserQuotes.jsx            # Devis utilisateur
│   ├── UserMessages.jsx          # Messages utilisateur
│   └── ...
├── api/
│   └── auth.js                   # API d'authentification
└── App.jsx                       # Routes principales
```

## API Endpoints

### Authentification Publique
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur

### Authentification Protégée
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/user` - Informations utilisateur
- `PUT /api/auth/profile` - Mise à jour du profil
- `PUT /api/auth/password` - Changement de mot de passe

### Devis Utilisateur
- `GET /api/user/quotes` - Liste des devis de l'utilisateur
- `GET /api/user/quotes/{id}` - Détails d'un devis
- `POST /api/user/quotes` - Créer un nouveau devis

### Messages Utilisateur
- `GET /api/user/messages` - Liste des messages de l'utilisateur
- `GET /api/user/messages/{id}` - Détails d'un message
- `POST /api/user/messages` - Envoyer un nouveau message

## Installation

### Backend

1. Naviguer vers le dossier Back-End
```bash
cd Back-End
```

2. Installer les dépendances
```bash
composer install
```

3. Configurer l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

4. Configurer la base de données dans `.env`

5. Exécuter les migrations
```bash
php artisan migrate
```

6. Démarrer le serveur
```bash
php artisan serve
```

### Frontend

1. Naviguer vers le dossier Front-End
```bash
cd Front-End
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur de développement
```bash
npm run dev
```

## Utilisation

### Pour les Utilisateurs Réguliers

1. **Inscription** : Accéder à `/register` pour créer un compte
2. **Connexion** : Utiliser `/login` pour se connecter
3. **Profil** : Accéder à `/profile` pour gérer les informations personnelles
4. **Devis** : Accéder à `/quotes` pour voir les demandes de devis
5. **Messages** : Accéder à `/messages` pour voir les messages de contact

### Pour les Administrateurs

1. **Connexion admin** : Accéder à `/admin/login`
2. **Dashboard** : Accéder à `/admin/dashboard`
3. **Gestion** : Utiliser les différentes sections pour gérer le contenu

## Sécurité

- Authentification par tokens JWT avec Laravel Sanctum
- Validation des données côté serveur
- Protection CSRF
- Hachage sécurisé des mots de passe
- Middleware d'authentification pour les routes protégées

## Technologies Utilisées

### Backend
- Laravel 10
- Laravel Sanctum (Authentification)
- MySQL/PostgreSQL
- PHP 8.1+

### Frontend
- React 18
- React Router
- Tailwind CSS
- Axios pour les requêtes API

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. 