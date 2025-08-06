<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nouveau message de contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #3b82f6;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f8fafc;
            padding: 20px;
            border: 1px solid #e2e8f0;
        }
        .message-box {
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin: 15px 0;
        }
        .contact-info {
            background-color: #f1f5f9;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouveau message de contact</h1>
        <p>BN Bâtiment - Couverture & Zinguerie</p>
    </div>
    
    <div class="content">
        <h2>Bonjour,</h2>
        <p>Un nouveau message de contact a été reçu sur votre site web.</p>
        
        <div class="contact-info">
            <h3>Informations du contact :</h3>
            <p><strong>Nom :</strong> {{ $name }}</p>
            <p><strong>Email :</strong> {{ $email }}</p>
            <p><strong>Session ID :</strong> {{ $session_id }}</p>
        </div>
        
        <div class="message-box">
            <h3>Message :</h3>
            <p>{{ $userMessage }}</p>
        </div>
        
        <p>Pour répondre à ce client, cliquez sur le bouton ci-dessous :</p>
        
        <a href="{{ $admin_url }}" class="button">Répondre au client</a>
        
        <p>Ou copiez ce lien dans votre navigateur :</p>
        <p style="word-break: break-all; color: #3b82f6;">{{ $admin_url }}</p>
    </div>
    
    <div class="footer">
        <p>Cet email a été envoyé automatiquement par le système de contact de BN Bâtiment.</p>
        <p>© {{ date('Y') }} BN Bâtiment - Tous droits réservés</p>
    </div>
</body>
</html> 