# Laravel Backend - Couvreur Project

This is the Laravel backend API for the Couvreur (roofing) website and admin dashboard.

## Features

- **Authentication**: Laravel Sanctum for API authentication
- **Services Management**: CRUD operations for roofing services
- **Blog Management**: Blog posts with categories and publishing
- **Gallery Management**: Image gallery with categories
- **Testimonials**: Customer testimonials management
- **Quote Requests**: Customer quote request handling
- **Contact Messages**: Contact form message management
- **Admin Dashboard**: Full admin interface for content management

## Requirements

- PHP 8.2+
- MySQL 8.0+
- Composer
- Node.js & NPM

## Installation

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   cd Back-End
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your database in `.env`:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=couvreur_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

6. **Create the MySQL database:**
   ```sql
   CREATE DATABASE couvreur_db;
   ```

7. **Run migrations:**
   ```bash
   php artisan migrate
   ```

8. **Seed the database with sample data:**
   ```bash
   php artisan db:seed
   ```

9. **Install and build frontend assets:**
   ```bash
   npm install
   npm run build
   ```

10. **Start the development server:**
    ```bash
    php artisan serve
    ```

## Quick Setup Script

You can use the provided setup script for automatic installation:

```bash
chmod +x setup.sh
./setup.sh
```

## Default Admin Credentials

- **Email:** admin@bnbuilding.com
- **Password:** password

## API Endpoints

### Public Endpoints

#### Authentication
- `POST /api/auth/login` - Login

#### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get service by ID
- `GET /api/services/slug/{slug}` - Get service by slug
- `GET /api/services/category/{category}` - Get services by category
- `GET /api/services/search?query={query}` - Search services

#### Blog
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/{id}` - Get blog post by ID
- `GET /api/blog/slug/{slug}` - Get blog post by slug
- `GET /api/blog/category/{category}` - Get blog posts by category

#### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/{id}` - Get gallery item by ID
- `GET /api/gallery/category/{category}` - Get gallery items by category

#### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/{id}` - Get testimonial by ID

#### Contact & Quotes
- `POST /api/contact` - Submit contact form
- `POST /api/quotes` - Submit quote request

### Protected Endpoints (Require Authentication)

#### Authentication
- `POST /api/auth/logout` - Logout
- `GET /api/auth/user` - Get current user

#### Admin Services
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/{id}` - Update service
- `DELETE /api/admin/services/{id}` - Delete service

#### Admin Blog
- `POST /api/admin/blog` - Create blog post
- `PUT /api/admin/blog/{id}` - Update blog post
- `DELETE /api/admin/blog/{id}` - Delete blog post

#### Admin Gallery
- `POST /api/admin/gallery` - Create gallery item
- `PUT /api/admin/gallery/{id}` - Update gallery item
- `DELETE /api/admin/gallery/{id}` - Delete gallery item

#### Admin Testimonials
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/{id}` - Update testimonial
- `DELETE /api/admin/testimonials/{id}` - Delete testimonial

#### Admin Quotes
- `GET /api/admin/quotes` - Get all quotes
- `GET /api/admin/quotes/{id}` - Get quote by ID
- `PUT /api/admin/quotes/{id}` - Update quote
- `DELETE /api/admin/quotes/{id}` - Delete quote
- `GET /api/admin/quotes/status/{status}` - Get quotes by status
- `GET /api/admin/quotes/urgency/{urgency}` - Get quotes by urgency

#### Admin Contact Messages
- `GET /api/admin/contact` - Get all contact messages
- `GET /api/admin/contact/{id}` - Get contact message by ID
- `PUT /api/admin/contact/{id}` - Update contact message
- `DELETE /api/admin/contact/{id}` - Delete contact message
- `GET /api/admin/contact/status/{status}` - Get messages by status
- `GET /api/admin/contact/unread` - Get unread messages

## Database Structure

### Tables
- `users` - Admin users
- `services` - Roofing services
- `blog_posts` - Blog articles
- `gallery_items` - Gallery images
- `testimonials` - Customer testimonials
- `quotes` - Customer quote requests
- `contact_messages` - Contact form messages

## Frontend Integration

The API is designed to work with the React frontend. Update your frontend API configuration to point to:

```
http://localhost:8000/api
```

## CORS Configuration

CORS is configured to allow requests from any origin. For production, update the CORS configuration in `config/cors.php` to restrict origins.

## Security

- All admin endpoints require authentication via Laravel Sanctum
- Input validation on all endpoints
- CORS protection
- SQL injection protection via Eloquent ORM

## Development

### Running Tests
```bash
php artisan test
```

### Database Reset
```bash
php artisan migrate:fresh --seed
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false` in `.env`
3. Configure your production database
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Set up proper CORS origins
7. Configure your web server (Apache/Nginx)

## Support

For issues or questions, please check the Laravel documentation or create an issue in the repository.
