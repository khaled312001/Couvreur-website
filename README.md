# Couvreur Project

A complete roofing company website with both frontend and backend components.

## Project Structure

```
Couvreur project/
├── Back-End/          # Laravel PHP Backend
├── Front-End/         # React.js Frontend
├── database_setup.sql # Database setup script
└── README.md         # This file
```

## Backend (Laravel)

The backend is built with Laravel and provides RESTful API endpoints for:

- User authentication and management
- Blog posts management
- Gallery management
- Services management
- Testimonials management
- Contact messages
- Quotes management
- Notifications system

### Backend Setup

1. Navigate to the Back-End directory:
   ```bash
   cd Back-End
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your database in the `.env` file

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Seed the database:
   ```bash
   php artisan db:seed
   ```

7. Generate application key:
   ```bash
   php artisan key:generate
   ```

8. Start the development server:
   ```bash
   php artisan serve
   ```

## Frontend (React)

The frontend is built with React.js and includes:

- Modern, responsive design
- Multi-language support (French, Arabic)
- Admin dashboard
- User authentication
- Service pages
- Blog system
- Gallery
- Contact forms
- Payment integration

### Frontend Setup

1. Navigate to the Front-End directory:
   ```bash
   cd Front-End
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

The project includes several SQL setup files:

- `database_setup.sql` - Main database setup
- `mysql_setup.sql` - MySQL specific setup
- `mysql_setup_safe.sql` - Safe MySQL setup

## Environment Configuration

Make sure to configure the following environment variables:

### Backend (.env)
```
APP_NAME=Couvreur
APP_ENV=local
APP_KEY=your-app-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=couvreur_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Frontend
Create a `.env` file in the Front-End directory:
```
VITE_API_URL=http://localhost:8000/api
```

## Features

### Backend Features
- RESTful API endpoints
- User authentication with Sanctum
- File upload handling
- Database migrations and seeders
- Admin user management
- Blog post management
- Gallery management
- Service management
- Testimonial management
- Quote management
- Contact message handling
- Notification system

### Frontend Features
- Responsive design
- Multi-language support (French/Arabic)
- Admin dashboard
- User authentication
- Service pages
- Blog system
- Gallery
- Contact forms
- Payment integration
- Modern UI/UX

## Technologies Used

### Backend
- Laravel 10
- PHP 8+
- MySQL
- Sanctum for authentication
- RESTful API

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios for API calls
- React Hook Form
- React Query

## Development

### Running Both Servers

1. Start the backend server:
   ```bash
   cd Back-End
   php artisan serve
   ```

2. Start the frontend server (in a new terminal):
   ```bash
   cd Front-End
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## Deployment

### Backend Deployment
1. Set up a web server (Apache/Nginx)
2. Configure PHP and MySQL
3. Upload the Back-End directory
4. Run `composer install --optimize-autoloader --no-dev`
5. Set up environment variables
6. Run migrations

### Frontend Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure the API URL in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. 