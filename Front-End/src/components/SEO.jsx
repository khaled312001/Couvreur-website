import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url, image, type = 'website', city, service, isCityPage = false, isServicePage = false }) => {
  // Ensure image URL is absolute for social media sharing
  const absoluteImageUrl = image && !image.startsWith('http') ? `https://bnbatiment.com${image}` : image;
  // Fix: Use url parameter instead of image for absoluteUrl fallback
  const absoluteUrl = url && !url.startsWith('http') ? `https://bnbatiment.com${url}` : (url || 'https://bnbatiment.com/');

  // Enhanced title and description for city-specific pages
  const enhancedTitle = isCityPage && city ? 
    `${title} - Couvreur Professionnel ${city} | BN BÂTIMENT` : 
    title;
  
  const enhancedDescription = isCityPage && city ? 
    `BN BÂTIMENT, couvreur professionnel à ${city}. Installation de toiture, réparation des fuites, entretien, démoussage et nettoyage. Devis gratuit et intervention rapide 24h/24. Plus de 200 clients satisfaits.` : 
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
      
      {/* FAQ Structured Data - French Specific */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Quels services propose BN BÂTIMENT ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BN BÂTIMENT propose l'installation de toiture, la réparation des fuites, l'entretien de toiture, le démoussage et traitement hydrofuge, le nettoyage de toiture, l'installation de gouttières, la charpente et la zinguerie."
              }
            },
            {
              "@type": "Question",
              "name": "Dans quelles villes intervenez-vous ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nous intervenons sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble et toute la région Rhône-Alpes dans un rayon de 100km."
              }
            },
            {
              "@type": "Question",
              "name": "Proposez-vous des devis gratuits ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, nous proposons des devis gratuits et détaillés pour tous nos services de toiture."
              }
            },
            {
              "@type": "Question",
              "name": "Intervenez-vous en urgence ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, nous intervenons 24h/24 et 7j/7 pour les urgences de toiture, notamment les fuites."
              }
            },
            {
              "@type": "Question",
              "name": "Quels sont vos tarifs ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nos tarifs varient selon le type de service et la complexité du chantier. Contactez-nous pour un devis personnalisé et gratuit."
              }
            },
            {
              "@type": "Question",
              "name": "Êtes-vous assurés ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, nous sommes entièrement assurés avec une assurance décennale et une certification Qualibat pour votre tranquillité d'esprit."
              }
            }
          ]
        })}
      </script>

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
