# Quick Email Setup Guide

## What Was Configured

✅ **Email notifications are now automatically sent to `support@bnbatiment.com`** when:
- A contact form is submitted
- A chat session is started

## Files Modified

1. **ContactController.php** - Updated recipient and sender emails
2. **ChatController.php** - Updated recipient and sender emails, added phone/subject support
3. **mail.php config** - Updated SMTP settings for Hostinger
4. **new_contact.blade.php** - Enhanced email template with phone and subject fields

## Required Action

You need to create/update the `.env` file in the `Back-End` directory with these settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.bnbatiment.com
MAIL_PORT=587
MAIL_USERNAME=support@bnbatiment.com
MAIL_PASSWORD=support@Passord123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="support@bnbatiment.com"
MAIL_FROM_NAME="BN Bâtiment"
```

## After Updating .env

Run these commands in the `Back-End` directory:

```bash
php artisan config:clear
php artisan config:cache
```

## Testing

1. Go to https://bnbatiment.com
2. Submit a contact form or start a chat
3. Check `support@bnbatiment.com` email inbox
4. You should receive a notification with all contact details

## Email Details

- **Recipient**: support@bnbatiment.com
- **Password**: support@Passord123
- **SMTP**: mail.bnbatiment.com:587
- **Webmail**: https://mail.hostinger.com/

See `EMAIL_SETUP_HOSTINGER.md` for detailed documentation.

