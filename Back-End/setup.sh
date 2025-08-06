#!/bin/bash

echo "Setting up Laravel Backend for Couvreur Project..."

# Install PHP dependencies
echo "Installing PHP dependencies..."
composer install

# Copy environment file
echo "Setting up environment file..."
cp .env.example .env

# Generate application key
echo "Generating application key..."
php artisan key:generate

# Create database (you'll need to create the database manually in MySQL)
echo "Please create a MySQL database named 'couvreur_db' before continuing..."
echo "Press Enter when ready..."
read

# Run migrations
echo "Running database migrations..."
php artisan migrate

# Seed the database
echo "Seeding database with sample data..."
php artisan db:seed

# Install and build frontend assets
echo "Installing and building frontend assets..."
npm install
npm run build

echo "Backend setup complete!"
echo ""
echo "Default admin credentials:"
echo "Email: admin@bnbuilding.com"
echo "Password: password"
echo ""
echo "Start the server with: php artisan serve" 