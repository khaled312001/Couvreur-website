import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url, image, type = 'website', city, service, isCityPage = false, isServicePage = false, includeFAQ = false }) => {
  // Get the preferred canonical domain (non-www) - consistent across all pages
  const getBaseUrl = () => {
    // Always use the preferred domain (non-www) for consistency
    // Both www and non-www domains are served, but canonical URLs use non-www
    return 'https://bnbatiment.com';
  };

  // Get current page domain for images and other dynamic content
  const getCurrentBaseUrl = () => {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      return `${protocol}//${hostname}`;
    }
    return 'https://bnbatiment.com';
  };

  const baseUrl = getBaseUrl(); // Preferred canonical domain
  const currentBaseUrl = getCurrentBaseUrl(); // Current page domain for images
  
  // Normalize URL - remove trailing slashes (except for root) and ensure consistent format
  const normalizeUrl = (urlPath) => {
    if (!urlPath || urlPath === '/' || urlPath === '') return '/';
    // Remove trailing slash for all non-root paths
    return urlPath.replace(/\/+$/, '') || '/';
  };
  
  // Get the canonical URL - use provided url prop, or derive from current location
  const getCanonicalUrl = () => {
    if (url) {
      // Use provided URL (normalized)
      const normalizedPath = normalizeUrl(url);
      return url.startsWith('http') ? url : `${baseUrl}${normalizedPath}`;
    }
    
    // If no URL provided, use current location (fallback)
    if (typeof window !== 'undefined') {
      const path = normalizeUrl(window.location.pathname);
      const search = window.location.search; // Keep query params for canonical if needed
      return `${baseUrl}${path}${search}`;
    }
    
    // Final fallback
    return `${baseUrl}/`;
  };
  
  // Ensure image URL is absolute for social media sharing (use current domain)
  const absoluteImageUrl = image && !image.startsWith('http') ? `${currentBaseUrl}${image}` : image;
  // Canonical URL always uses preferred domain (non-www) for consistency
  const absoluteUrl = getCanonicalUrl();

  // Enhanced title and description for city-specific pages - COUVREUR FIRST
  const enhancedTitle = isCityPage && city ? 
    `Couvreur ${city} | ${title} | BN BÂTIMENT - Couvreur Professionnel ${city}` : 
    title;
  
  const enhancedDescription = isCityPage && city ? 
    `Couvreur professionnel à ${city}. BN BÂTIMENT, votre couvreur expert à ${city}. Couvreur spécialisé en installation de toiture, réparation des fuites, entretien, démoussage et nettoyage. Devis gratuit et intervention rapide 24h/24. Plus de 200 clients satisfaits. Votre couvreur de confiance à ${city}.` : 
    description;

  // Enhanced keywords for city-specific pages
  const enhancedKeywords = isCityPage && city ? 
    `${keywords}, couvreur ${city}, installation toiture ${city}, réparation fuites ${city}, entretien toiture ${city}, démoussage toiture ${city}, nettoyage toiture ${city}, couvreur professionnel ${city}, devis gratuit ${city}, intervention rapide ${city}` : 
    keywords;

  return (
    <Helmet>
      {/* Basic Meta Tags - Enhanced for French SEO */}
      <title>{enhancedTitle}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content="BN BÂTIMENT - Expert Couvreur Lyon" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Enhanced Language and Region for France */}
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content={city || "Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble"} />
      <meta name="geo.position" content="45.7578;4.8320" />
      <meta name="ICBM" content="45.7578, 4.8320" />
      
      {/* French-specific meta tags */}
      <meta name="geo.country" content="France" />
      <meta name="geo.region" content="FR-69" />
      <meta name="distribution" content="France" />
      <meta name="coverage" content="France" />
      <meta name="target" content="France" />
      
      {/* Open Graph Meta Tags - Enhanced for French Social Media */}
      <meta property="og:title" content={enhancedTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="BN BÂTIMENT - Expert Installation Réparation Entretien Toiture" />
      <meta property="og:site_name" content="BN BÂTIMENT" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Facebook Specific */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:pages" content="your-facebook-page-id" />
      
      {/* Twitter Card Meta Tags - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={enhancedTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content="BN BÂTIMENT - Expert Installation Réparation Entretien Toiture" />
      <meta name="twitter:site" content="@bnbatiment" />
      <meta name="twitter:creator" content="@bnbatiment" />
      
      {/* WhatsApp and Mobile Optimization */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="BN BÂTIMENT" />
      
      {/* Additional SEO Meta Tags for BN BÂTIMENT */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* BN BÂTIMENT Business Information */}
      <meta name="company" content="BN BÂTIMENT - Couvreur Expert" />
      <meta name="business.name" content="BN BÂTIMENT" />
      <meta name="business.type" content="Couvreur Professionnel" />
      <meta name="contact.phone" content="+33780326427" />
      <meta name="contact.email" content="contact@bnbatiment.com" />
      <meta name="website.url" content="https://bnbatiment.com" />
      
      {/* Enhanced French SEO Tags for BN BÂTIMENT */}
      <meta name="revisit-after" content="7 days" />
      <meta name="classification" content="Couvreur, Toiture, Charpente, Zinguerie, Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble" />
      <meta name="category" content="Construction, Couverture, Toiture, Rénovation" />
      <meta name="copyright" content="BN BÂTIMENT 2024" />
      <meta name="reply-to" content="contact@bnbatiment.com" />
      <meta name="owner" content="BN BÂTIMENT" />
      <meta name="url" content={absoluteUrl} />
      <meta name="identifier-URL" content={absoluteUrl} />
      <link rel="publisher" href="https://bnbatiment.com" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={absoluteUrl} />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Note: LocalBusiness and Organization schemas are defined in index.html to avoid duplication */}
      {/* Only FAQ and Breadcrumb schemas are added per page here */}
      
      {/* FAQ Structured Data - French Specific - Only include when explicitly requested */}
      {includeFAQ && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Qu'est-ce qu'un couvreur ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Un couvreur est un professionnel du bâtiment spécialisé dans la couverture, c'est-à-dire la pose, la réparation et l'entretien des toitures. Le couvreur professionnel travaille dans une entreprise de couverture qui assure l'étanchéité des toits et la protection des bâtiments contre les intempéries. Le couvreur met en place les échafaudages et les dispositifs de sécurité, fixe les liteaux, pose les tuiles, ardoises, zinc ou métal, installe les gouttières et réalise l'isolation thermique de la toiture."
                }
              },
              {
                "@type": "Question",
                "name": "Quels services propose le couvreur professionnel BN BÂTIMENT ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BN BÂTIMENT, entreprise de couverture, propose l'installation de toiture (pose de tuiles, ardoises, zinc, métal), la réparation des fuites, l'entretien de toiture, le démoussage et traitement hydrofuge, le nettoyage de toiture, l'installation de gouttières, la charpente et la zinguerie."
                }
              },
              {
                "@type": "Question",
                "name": "Qu'est-ce qu'une entreprise de couverture ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Une entreprise de couverture est une société spécialisée dans les travaux de couverture et de toiture. BN BÂTIMENT est une entreprise de couverture qui emploie des couvreurs professionnels qualifiés pour l'installation, la réparation et l'entretien de toitures."
                }
              },
              {
                "@type": "Question",
                "name": "Dans quelles villes intervient votre couvreur professionnel ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Notre entreprise de couverture intervient sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble et toute la région Rhône-Alpes et la France dans un rayon de 100km autour de Lyon."
                }
              },
              {
                "@type": "Question",
                "name": "Le couvreur propose-t-il des devis gratuits ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, notre couvreur professionnel propose des devis gratuits et détaillés pour tous les services de couverture et toiture."
                }
              },
              {
                "@type": "Question",
                "name": "Le couvreur intervient-il en urgence ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, notre entreprise de couverture intervient 24h/24 et 7j/7 pour les urgences de toiture, notamment les fuites, avec un couvreur disponible immédiatement."
                }
              },
              {
                "@type": "Question",
                "name": "Quel est le diplôme d'un couvreur professionnel ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Les couvreurs professionnels de BN BÂTIMENT sont titulaires du CAP Couvreur (Certificat d'Aptitude Professionnelle) ou diplômes équivalents. Ils sont des ouvriers professionnels du bâtiment spécialisés dans l'étanchéité des toitures."
                }
              },
              {
                "@type": "Question",
                "name": "Quels sont les tarifs du couvreur ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Les tarifs de notre couvreur professionnel varient selon le type de service (installation, réparation, entretien) et la complexité du chantier. Contactez notre entreprise de couverture pour un devis personnalisé et gratuit."
                }
              },
              {
                "@type": "Question",
                "name": "L'entreprise de couverture est-elle assurée ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, notre entreprise de couverture BN BÂTIMENT est entièrement assurée avec une assurance décennale et une certification Qualibat. Tous nos couvreurs professionnels sont couverts par cette assurance pour votre tranquillité d'esprit."
                }
              }
            ]
          })}
        </script>
      )}

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://bnbatiment.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://bnbatiment.com/services"
            },
            ...(city ? [{
              "@type": "ListItem",
              "position": 3,
              "name": city,
              "item": `https://bnbatiment.com/services/${city.toLowerCase().replace(/\s+/g, '-')}`
            }] : [])
          ]
        })}
      </script>

      {/* Service Specific Structured Data */}
      {isServicePage && service && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name || "Service de Toiture",
            "description": service.description || "Service professionnel de toiture par BN BÂTIMENT",
            "provider": {
              "@type": "LocalBusiness",
              "name": "BN BÂTIMENT",
              "url": "https://bnbatiment.com"
            },
            "areaServed": {
              "@type": "City",
              "name": city || "Lyon"
            },
            "url": absoluteUrl
          })}
        </script>
      )}

      {/* Article Schema for Blog Posts */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": enhancedTitle,
            "description": enhancedDescription,
            "image": absoluteImageUrl,
            "author": {
              "@type": "Organization",
              "name": "BN BÂTIMENT"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BN BÂTIMENT",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bnbatiment.com/logo.png"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "inLanguage": "fr-FR"
          })}
        </script>
      )}

      {/* WebPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": enhancedTitle,
          "description": enhancedDescription,
          "url": absoluteUrl,
          "inLanguage": "fr-FR",
          "isPartOf": {
            "@type": "WebSite",
            "name": "BN BÂTIMENT",
            "url": "https://bnbatiment.com"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": absoluteImageUrl
          }
        })}
      </script>

      {/* Image Object Schema for SEO */}
      {absoluteImageUrl && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": absoluteImageUrl,
            "caption": enhancedDescription,
            "contentUrl": absoluteImageUrl
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
