# Email Configuration Setup for Hostinger

## Overview
This document explains how to configure email notifications for contact messages on the Hostinger hosting platform.

## Email Account Details
- **Email Address**: support@bnbatiment.com
- **Password**: support@Passord123
- **SMTP Host**: mail.bnbatiment.com
- **SMTP Port**: 587 (TLS) or 465 (SSL)
- **SMTP Username**: support@bnbatiment.com
- **SMTP Password**: support@Passord123

## Configuration Steps

### 1. Configure .env File

Add the following configuration to your `.env` file in the `Back-End` directory:

```env
# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=mail.bnbatiment.com
MAIL_PORT=587
MAIL_USERNAME=support@bnbatiment.com
MAIL_PASSWORD=support@Passord123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=support@bnbatiment.com
MAIL_FROM_NAME="BN Bâtiment"

# Default Mailer
MAIL_MAILER=smtp
```

### 2. Clear Configuration Cache

After updating the `.env` file, run these commands:

```bash
cd Back-End
php artisan config:clear
php artisan config:cache
```

### 3. Test Email Configuration

You can test the email configuration by submitting a contact form or sending a chat message. The system will:

1. Store the contact message in the database
2. Create a notification
3. Send an email to `support@bnbatiment.com`

## What Was Changed

### Updated Files:
1. **Back-End/app/Http/Controllers/Api/ContactController.php**
   - Changed recipient email from `khaledahmedhaggay@gmail.com` to `support@bnbatiment.com`
   - Updated sender email to `support@bnbatiment.com`

2. **Back-End/app/Http/Controllers/Api/ChatController.php**
   - Changed recipient email from `khaledahmedhaggay@gmail.com` to `support@bnbatiment.com`
   - Updated sender email to `support@bnbatiment.com`
   - Added support for phone and subject fields in email notifications

3. **Back-End/resources/views/emails/new_contact.blade.php**
   - Updated email template to conditionally display phone and subject fields
   - Made session_id display conditional

4. **Back-End/config/mail.php**
   - Updated SMTP configuration to use Hostinger mail server
   - Changed default encryption to TLS
   - Updated default from address to support@bnbatiment.com

## How It Works

When a new contact message is received:

1. **Contact Form Submission** (Back-End/app/Http/Controllers/Api/ContactController.php)
   - Stores the contact message in database
   - Creates a notification
   - Sends email notification to `support@bnbatiment.com`

2. **Chat Message** (Back-End/app/Http/Controllers/Api/ChatController.php)
   - Creates a chat session
   - Stores contact message
   - Sends email notification to `support@bnbatiment.com`

## Email Content

The email notification includes:
- Contact name
- Contact email
- Contact phone (if provided)
- Message subject
- Message content
- Session ID (for chat messages)
- Link to admin panel to respond

## Troubleshooting

### Emails Not Sending?

1. **Check .env Configuration**
   - Verify all email settings are correct
   - Ensure password doesn't have extra spaces

2. **Check Laravel Logs**
   ```bash
   tail -f storage/logs/laravel.log
   ```

3. **Test SMTP Connection**
   - Log into https://mail.hostinger.com/
   - Verify the email account exists and password is correct
   - Try sending a test email from the webmail interface

4. **Clear Cache**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan config:cache
   ```

### Common Issues

**Issue**: "Connection refused"
- **Solution**: Check that SMTP port 587 is not blocked by firewall

**Issue**: "Authentication failed"
- **Solution**: Verify username and password are correct
- **Solution**: Ensure email account exists on Hostinger

**Issue**: "TLS handshake failed"
- **Solution**: Try changing port to 465 and encryption to `ssl`

## Security Notes

- Never commit `.env` file to version control
- Keep email passwords secure
- Use strong passwords for email accounts
- Consider using environment-specific email addresses for testing

## Access Admin Contact Panel

- URL: https://www.bnbatiment.com/admin/contact
- You'll receive an email for each new contact message
- Email includes a direct link to respond to the customer

## Testing

To test the email notifications:

1. Go to https://bnbatiment.com
2. Submit a contact form or start a chat
3. Check `support@bnbatiment.com` inbox for the notification
4. Verify all contact information is included in the email

## Support

If you encounter issues:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify SMTP settings in `.env`
3. Test email account login on mail.hostinger.com
4. Clear Laravel cache and try again

