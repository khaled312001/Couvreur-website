<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BN BÂTIMENT - Charpente - Couverture - Zinguerie</title>
    <meta name="description" content="BN BÂTIMENT - Spécialiste en charpente, couverture et zinguerie. Intervention 24h/24, 7j/7. Devis gratuit.">
    <meta name="keywords" content="charpente, couverture, zinguerie, toiture, réparation, installation, BN BÂTIMENT">
    <meta name="author" content="BN BÂTIMENT">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://bnbatiment.com/">
    <meta property="og:title" content="BN BÂTIMENT - Charpente - Couverture - Zinguerie">
    <meta property="og:description" content="Spécialiste en charpente, couverture et zinguerie. Intervention 24h/24, 7j/7. Devis gratuit.">
    <meta property="og:image" content="/logo.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://bnbatiment.com/">
    <meta property="twitter:title" content="BN BÂTIMENT - Charpente - Couverture - Zinguerie">
    <meta property="twitter:description" content="Spécialiste en charpente, couverture et zinguerie. Intervention 24h/24, 7j/7. Devis gratuit.">
    <meta property="twitter:image" content="/logo.png">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .logo {
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            font-weight: 300;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 2rem;
            line-height: 1.6;
            opacity: 0.8;
        }

        .services {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .service-tag {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
        }

        .service-tag:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
            margin: 1rem;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
        }

        .contact-info {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-item {
            margin: 0.5rem 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .contact-item a {
            color: #ff6b6b;
            text-decoration: none;
            font-weight: 600;
        }

        .contact-item a:hover {
            text-decoration: underline;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }

        .particle:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 60%;
            right: 10%;
            animation-delay: 2s;
        }

        .particle:nth-child(3) {
            width: 40px;
            height: 40px;
            top: 40%;
            left: 50%;
            animation-delay: 4s;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }

        @media (max-width: 768px) {
            .container {
                margin: 1rem;
                padding: 1.5rem;
            }

            h1 {
                font-size: 2rem;
            }

            .subtitle {
                font-size: 1rem;
            }

            .services {
                gap: 0.5rem;
            }

            .service-tag {
                font-size: 0.8rem;
                padding: 0.4rem 0.8rem;
            }
        }
    </style>
</head>
<body>
    <!-- Animated Background Particles -->
    <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div class="container">
        <div class="logo">🏗️</div>
        
        <h1>BN BÂTIMENT</h1>
        <div class="subtitle">Charpente - Couverture - Zinguerie</div>
        
        <div class="description">
            Spécialiste en charpente, couverture et zinguerie. Nous intervenons pour tous types de projets : neuf, rénovation et entretien. Intervention 24h/24, 7j/7.
        </div>

        <div class="services">
            <div class="service-tag">🏗️ Charpente</div>
            <div class="service-tag">🏠 Couverture</div>
            <div class="service-tag">🔧 Zinguerie</div>
            <div class="service-tag">🧹 Démoussage</div>
            <div class="service-tag">🏠 Isolation</div>
            <div class="service-tag">🔧 Réparation</div>
        </div>

        <a href="Front-End/" class="cta-button">
            Accéder au Site Web
        </a>

        <div class="contact-info">
            <div class="contact-item">
                📞 <a href="tel:0780326427">+33 780326427</a>
            </div>
            <div class="contact-item">
                📧 <a href="mailto:support@bnbatiment.com">support@bnbatiment.com</a>
            </div>
            <div class="contact-item">
                ⏰ Intervention 24h/24 - 7j/7
            </div>
        </div>
    </div>

    <script>
        // Auto-redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'Front-End/';
        }, 5000);

        // Add click event to redirect immediately
        document.querySelector('.cta-button').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'Front-End/';
        });

        // Add loading animation to button on click
        document.querySelector('.cta-button').addEventListener('click', function() {
            this.innerHTML = 'Chargement... <span class="loading"></span>';
        });
    </script>
</body>
</html> 