import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url, image, type = 'website', city, service, isCityPage = false, isServicePage = false }) => {
  // Ensure image URL is absolute for social media sharing
  const absoluteImageUrl = image && !image.startsWith('http') ? `https://bnbatiment.com${image}` : image;
  const absoluteUrl = url && !url.startsWith('http') ? `https://bnbatiment.com${url}` : image;

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
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
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
      
      {/* Enhanced Structured Data for Local Business - French Specific */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BN BÂTIMENT",
          "alternateName": ["BN BÂTIMENT Couvreur", "Couvreur Lyon", "Couvreur Saint-Étienne", "Couvreur Valence", "Couvreur Clermont-Ferrand", "Couvreur Grenoble"],
          "description": "Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, nettoyage de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Expert couvreur avec plus de 10 ans d'expérience.",
          "url": "https://bnbatiment.com",
          "telephone": ["+33780326427", "+33780326427"],
          "email": "contact@bnbatiment.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lyon",
            "addressRegion": "Rhône-Alpes",
            "addressCountry": "FR",
            "postalCode": "69000"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.7578,
            "longitude": 4.8320
          },
          "openingHours": "Mo-Su 00:00-23:59",
          "priceRange": "€€",
          "currenciesAccepted": "EUR",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer, Check",
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 45.7578,
              "longitude": 4.8320
            },
            "geoRadius": "100000"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Lyon",
              "sameAs": "https://fr.wikipedia.org/wiki/Lyon"
            },
            {
              "@type": "City", 
              "name": "Saint-Étienne",
              "sameAs": "https://fr.wikipedia.org/wiki/Saint-%C3%89tienne"
            },
            {
              "@type": "City",
              "name": "Valence",
              "sameAs": "https://fr.wikipedia.org/wiki/Valence_(Dr%C3%B4me)"
            },
            {
              "@type": "City",
              "name": "Clermont-Ferrand",
              "sameAs": "https://fr.wikipedia.org/wiki/Clermont-Ferrand"
            },
            {
              "@type": "City",
              "name": "Grenoble",
              "sameAs": "https://fr.wikipedia.org/wiki/Grenoble"
            },
            {
              "@type": "City",
              "name": "Francheville",
              "sameAs": "https://fr.wikipedia.org/wiki/Francheville_(Rh%C3%B4ne)"
            },
            {
              "@type": "City",
              "name": "Givors",
              "sameAs": "https://fr.wikipedia.org/wiki/Givors"
            },
            {
              "@type": "City",
              "name": "Vienne",
              "sameAs": "https://fr.wikipedia.org/wiki/Vienne_(Is%C3%A8re)"
            },
            {
              "@type": "City",
              "name": "Le Pouzin",
              "sameAs": "https://fr.wikipedia.org/wiki/Le_Pouzin"
            },
            {
              "@type": "City",
              "name": "Privas",
              "sameAs": "https://fr.wikipedia.org/wiki/Privas"
            },
            {
              "@type": "City",
              "name": "La Voulte-sur-Rhône",
              "sameAs": "https://fr.wikipedia.org/wiki/La_Voulte-sur-Rh%C3%B4ne"
            },
            {
              "@type": "City",
              "name": "Crest",
              "sameAs": "https://fr.wikipedia.org/wiki/Crest_(Dr%C3%B4me)"
            },
            {
              "@type": "City",
              "name": "Loriol-sur-Drôme",
              "sameAs": "https://fr.wikipedia.org/wiki/Loriol-sur-Dr%C3%B4me"
            },
            {
              "@type": "City",
              "name": "Livron",
              "sameAs": "https://fr.wikipedia.org/wiki/Livron-sur-Dr%C3%B4me"
            },
            {
              "@type": "City",
              "name": "La Saulce",
              "sameAs": "https://fr.wikipedia.org/wiki/La_Saulce"
            },
            {
              "@type": "City",
              "name": "Mirmande",
              "sameAs": "https://fr.wikipedia.org/wiki/Mirmande"
            },
            {
              "@type": "City",
              "name": "Montélimar",
              "sameAs": "https://fr.wikipedia.org/wiki/Mont%C3%A9limar"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services de Toiture",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Installation de toiture",
                  "description": "Installation complète de toiture neuve en tuiles, zinc, ardoises et métal",
                  "url": "https://bnbatiment.com/services/installation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Réparation des fuites",
                  "description": "Réparation rapide des fuites de toiture avec intervention d'urgence 24h/24",
                  "url": "https://bnbatiment.com/services/repair"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Entretien de toiture",
                  "description": "Entretien préventif et maintenance régulière de toiture",
                  "url": "https://bnbatiment.com/services/maintenance"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Démoussage et traitement hydrofuge",
                  "description": "Démoussage professionnel et traitement hydrofuge pour protéger votre toiture",
                  "url": "https://bnbatiment.com/services/cleaning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Nettoyage de toiture",
                  "description": "Nettoyage haute pression et entretien complet de votre toiture",
                  "url": "https://bnbatiment.com/services/cleaning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Installation de gouttières",
                  "description": "Pose et réparation de gouttières en zinc et PVC",
                  "url": "https://bnbatiment.com/services/zinguerie"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Charpente",
                  "description": "Construction et réparation de charpente en bois et métal",
                  "url": "https://bnbatiment.com/services/charpente"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zinguerie",
                  "description": "Installation et réparation de zinguerie, gouttières et descentes",
                  "url": "https://bnbatiment.com/services/zinguerie"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "200",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Client satisfait"
              },
              "reviewBody": "Excellent service, intervention rapide et professionnelle. Je recommande vivement !"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/bnbatiment",
            "https://www.instagram.com/bnbatiment",
            "https://www.linkedin.com/company/bnbatiment"
          ],
          "image": absoluteImageUrl,
          "logo": "https://bnbatiment.com/logo.png"
        })}
      </script>
      
      {/* Additional Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BN BÂTIMENT",
          "url": "https://bnbatiment.com",
          "logo": "https://bnbatiment.com/logo.png",
          "image": absoluteImageUrl,
          "description": "Expert en installation, réparation et entretien de toiture dans la région Rhône-Alpes",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+33780326427",
              "contactType": "customer service",
              "availableLanguage": "French",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }
            },
            {
              "@type": "ContactPoint",
              "telephone": "+33780326427",
              "contactType": "emergency",
              "availableLanguage": "French",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }
            }
          ],
          "sameAs": [
            "https://www.facebook.com/bnbatiment",
            "https://www.instagram.com/bnbatiment",
            "https://www.linkedin.com/company/bnbatiment"
          ],
          "foundingDate": "2014",
          "numberOfEmployees": "10-50",
          "award": [
            "Certification Qualibat",
            "Assurance décennale",
            "Plus de 200 clients satisfaits"
          ]
        })}
      </script>
      
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
    </Helmet>
  );
};

export default SEO; 