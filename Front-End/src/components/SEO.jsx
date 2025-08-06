import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url, image, type = 'website' }) => {
  // Ensure image URL is absolute for social media sharing
  const absoluteImageUrl = image && !image.startsWith('http') ? `https://bnbatiment.com${image}` : image;
  const absoluteUrl = url && !url.startsWith('http') ? `https://bnbatiment.com${url}` : url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BN BÂTIMENT - Expert Couvreur Lyon" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Language and Region */}
      <meta name="language" content="French" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble" />
      
      {/* Open Graph Meta Tags - Enhanced for Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="BN BÂTIMENT - Expert Installation Réparation Entretien Toiture" />
      <meta property="og:site_name" content="BN BÂTIMENT" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Facebook Specific */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:pages" content="your-facebook-page-id" />
      
      {/* Twitter Card Meta Tags - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
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
      
      {/* Structured Data for Local Business - Enhanced */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BN BÂTIMENT",
          "alternateName": ["BN BÂTIMENT Couvreur", "Couvreur Lyon", "Couvreur Saint-Étienne", "Couvreur Valence"],
          "description": "Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, nettoyage de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Expert couvreur avec plus de 10 ans d'expérience.",
          "url": "https://bnbatiment.com",
          "telephone": ["+33420983917", "+33780326427"],
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
              "name": "Lyon"
            },
            {
              "@type": "City", 
              "name": "Saint-Étienne"
            },
            {
              "@type": "City",
              "name": "Valence"
            },
            {
              "@type": "City",
              "name": "Clermont-Ferrand"
            },
            {
              "@type": "City",
              "name": "Grenoble"
            },
            {
              "@type": "City",
              "name": "Francheville"
            },
            {
              "@type": "City",
              "name": "Givors"
            },
            {
              "@type": "City",
              "name": "Vienne"
            },
            {
              "@type": "City",
              "name": "Le Pouzin"
            },
            {
              "@type": "City",
              "name": "Privas"
            },
            {
              "@type": "City",
              "name": "La Voulte-sur-Rhône"
            },
            {
              "@type": "City",
              "name": "Crest"
            },
            {
              "@type": "City",
              "name": "Loriol-sur-Drôme"
            },
            {
              "@type": "City",
              "name": "Livron"
            },
            {
              "@type": "City",
              "name": "La Saulce"
            },
            {
              "@type": "City",
              "name": "Mirmande"
            },
            {
              "@type": "City",
              "name": "Montélimar"
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
                  "description": "Installation complète de toiture neuve en tuiles, zinc, ardoises et métal"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Réparation des fuites",
                  "description": "Réparation rapide des fuites de toiture avec intervention d'urgence 24h/24"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Entretien de toiture",
                  "description": "Entretien préventif et maintenance régulière de toiture"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Démoussage et traitement hydrofuge",
                  "description": "Démoussage professionnel et traitement hydrofuge pour protéger votre toiture"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Nettoyage de toiture",
                  "description": "Nettoyage haute pression et entretien complet de votre toiture"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Installation de gouttières",
                  "description": "Pose et réparation de gouttières en zinc et PVC"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Charpente",
                  "description": "Construction et réparation de charpente en bois et métal"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Zinguerie",
                  "description": "Installation et réparation de zinguerie, gouttières et descentes"
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
              "telephone": "+33420983917",
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
      
      {/* FAQ Structured Data */}
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
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 