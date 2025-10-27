import React, { useEffect, useRef, useState } from "react";
import ContactForm from "../components/ContactForm";
import { getIconComponent } from '../utils/iconMapping';
import { getServices } from '../api/services';
import SEO from '../components/SEO';


const Contact = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Load services from backend
  const loadServices = async () => {
    try {
      setLoadingServices(true);
      const servicesData = await getServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading services:', error);
      // Fallback to default services if API fails
      setServices([
        { id: 1, title: "Charpente", slug: "charpente" },
        { id: 2, title: "Couverture", slug: "couverture" },
        { id: 3, title: "Zinguerie", slug: "zinguerie" }
      ]);
    } finally {
      setLoadingServices(false);
    }
  };

  // SEO Data for Contact Page
  const seoData = {
    title: "Contact BN BÂTIMENT - Devis Gratuit Charpente Couverture Zinguerie Paris",
    description: "Contactez BN BÂTIMENT pour un devis gratuit en charpente, couverture et zinguerie à Paris. Intervention 24h/24. Expert toiture certifié. Réparation, installation, rénovation toiture.",
    keywords: "contact BN BÂTIMENT, devis gratuit charpente, devis gratuit couverture, devis gratuit zinguerie, contact couvreur Paris, contact charpentier Paris, contact zingueur Paris, devis toiture gratuit, devis charpente gratuit, devis couverture gratuit, devis zinguerie gratuit, devis gouttières gratuit, devis réparation toiture gratuit, devis installation toiture gratuit, devis rénovation toiture gratuit, devis isolation toiture gratuit, devis démoussage gratuit, devis nettoyage toiture gratuit, devis fuite toiture gratuit, devis ardoise gratuit, devis tuiles gratuit, devis zinc gratuit, devis cuivre gratuit, devis PVC gratuit, devis aluminium gratuit, devis acier gratuit, devis inox gratuit, devis titane gratuit, devis composite gratuit, devis bitume gratuit, devis membrane gratuit, devis étanchéité gratuit, devis ventilation gratuit, devis écran sous-toiture gratuit, devis pare-vapeur gratuit, devis liteaux gratuit, devis volige gratuit, devis chevrons gratuit, devis pannes gratuit, devis fermes gratuit, devis poutres gratuit, devis solives gratuit, devis plancher gratuit, devis escalier gratuit, devis terrasse gratuit, devis pergola gratuit, devis abri jardin gratuit, devis cabane gratuit, devis chalet gratuit, devis maison ossature bois gratuit, devis construction bois gratuit, devis rénovation bois gratuit, devis traitement bois gratuit, devis lasure gratuit, devis peinture bois gratuit, devis protection bois gratuit, devis anti-termites gratuit, devis anti-fongique gratuit, devis hydrofuge gratuit, devis oléofuge gratuit, devis saturateur gratuit, devis vernis gratuit, devis enduit gratuit, devis crépis gratuit, devis ravalement façade gratuit, devis rénovation façade gratuit, devis nettoyage façade gratuit, devis hydrogommage gratuit, devis sablage gratuit, devis gommage gratuit, devis ponçage gratuit, intervention d'urgence, réparation d'urgence, toiture d'urgence, charpente d'urgence, couverture d'urgence, zinguerie d'urgence, fuite d'urgence, dégât d'eau d'urgence, tempête d'urgence, inondation d'urgence, sinistre d'urgence, assurance d'urgence, expert d'urgence, expertise d'urgence, constat d'urgence, rapport d'urgence, devis d'urgence, facture d'urgence, paiement d'urgence, financement d'urgence, crédit d'urgence, prêt d'urgence, subvention d'urgence, aide d'urgence, prime d'urgence, bonus d'urgence, malus d'urgence, pénalité d'urgence, intérêt d'urgence, taux d'urgence, échéance d'urgence, mensualité d'urgence, capital d'urgence, assurance d'urgence, garantie d'urgence, caution d'urgence, dépôt d'urgence, acompte d'urgence, solde d'urgence, reliquat d'urgence, majoration d'urgence, escompte d'urgence, remise d'urgence, rabais d'urgence, bonification d'urgence, prime d'urgence, bonus d'urgence, malus d'urgence, pénalité d'urgence, intérêt d'urgence, taux d'urgence, échéance d'urgence, mensualité d'urgence, capital d'urgence, assurance d'urgence, garantie d'urgence, caution d'urgence, dépôt d'urgence, acompte d'urgence, solde d'urgence, reliquat d'urgence, majoration d'urgence, escompte d'urgence, remise d'urgence, rabais d'urgence, bonification d'urgence",
    url: "/contact",
    image: "/logo.png"
  };

  const areas = [
    {
      name: "Lyon",
      cities: ["Lyon Centre", "Lyon Part-Dieu", "Lyon Vaise", "Lyon Gerland", "Lyon Croix-Rousse", "Lyon Confluence"],
      description: "Intervention dans toute la métropole lyonnaise pour tous vos travaux de couverture et rénovation",
      icon: "🏙️",
      population: "500,000+",
      coverage: "À moins de 50 km de Lyon",
      coordinates: { lat: 45.7578, lng: 4.8320 },
      color: "#ef4444"
    },
    {
      name: "Saint-Étienne",
      cities: ["Saint-Étienne Centre", "Saint-Étienne Nord", "Saint-Étienne Sud", "Saint-Étienne Est", "Saint-Étienne Ouest"],
      description: "Couverture et rénovation à Saint-Étienne avec expertise locale",
      icon: "🏭",
      population: "170,000+",
      coverage: "79.97 km²",
      coordinates: { lat: 45.4333, lng: 4.3833 },
      color: "#8b5cf6"
    },
    {
      name: "Valence",
      cities: ["Valence Centre", "Valence Nord", "Valence Sud", "Valence Est", "Valence Ouest"],
      description: "Services de couverture à Valence avec intervention rapide",
      icon: "🌿",
      population: "65,000+",
      coverage: "36.69 km²",
      coordinates: { lat: 44.9333, lng: 4.8833 },
      color: "#10b981"
    },
    {
      name: "Clermont-Ferrand",
      cities: ["Clermont-Ferrand Centre", "Clermont-Ferrand Nord", "Clermont-Ferrand Sud", "Clermont-Ferrand Est", "Clermont-Ferrand Ouest"],
      description: "Intervention à Clermont-Ferrand pour tous types de toitures",
      icon: "⛰️",
      population: "147,000+",
      coverage: "42.67 km²",
      coordinates: { lat: 45.7833, lng: 3.0833 },
      color: "#3b82f6"
    },
    {
      name: "Francheville",
      cities: ["Francheville Centre", "Francheville Nord", "Francheville Sud", "Francheville Est", "Francheville Ouest"],
      description: "Couverture à Francheville avec expertise métropolitaine",
      icon: "🏡",
      population: "15,000+",
      coverage: "20.56 km²",
      coordinates: { lat: 45.7333, lng: 4.7667 },
      color: "#f97316"
    },
    {
      name: "Givors",
      cities: ["Givors Centre", "Givors Nord", "Givors Sud", "Givors Est", "Givors Ouest"],
      description: "Services à Givors avec intervention sur mesure",
      icon: "🏭",
      population: "20,000+",
      coverage: "17.34 km²",
      coordinates: { lat: 45.5833, lng: 4.7667 },
      color: "#f59e0b"
    },
    {
      name: "Vienne",
      cities: ["Vienne Centre", "Vienne Nord", "Vienne Sud", "Vienne Est", "Vienne Ouest"],
      description: "Intervention à Vienne pour tous vos travaux de couverture",
      icon: "🏛️",
      population: "30,000+",
      coverage: "22.65 km²",
      coordinates: { lat: 45.5167, lng: 4.8833 },
      color: "#06b6d4"
    },
    {
      name: "Le Pouzin",
      cities: ["Le Pouzin Centre", "Le Pouzin Nord", "Le Pouzin Sud", "Le Pouzin Est", "Le Pouzin Ouest"],
      description: "Couverture et rénovation au Pouzin avec expertise locale",
      icon: "🏘️",
      population: "2,800+",
      coverage: "12.52 km²",
      coordinates: { lat: 44.7500, lng: 4.7500 },
      color: "#84cc16"
    },
    {
      name: "Privas",
      cities: ["Privas Centre", "Privas Nord", "Privas Sud", "Privas Est", "Privas Ouest"],
      description: "Services de couverture à Privas avec intervention rapide",
      icon: "🏔️",
      population: "8,600+",
      coverage: "12.28 km²",
      coordinates: { lat: 44.7333, lng: 4.6000 },
      color: "#ec4899"
    },
    {
      name: "La Voulte-sur-Rhône",
      cities: ["La Voulte Centre", "La Voulte Nord", "La Voulte Sud", "La Voulte Est", "La Voulte Ouest"],
      description: "Intervention à La Voulte-sur-Rhône pour tous types de toitures",
      icon: "🌊",
      population: "5,000+",
      coverage: "9.70 km²",
      coordinates: { lat: 44.8167, lng: 4.7833 },
      color: "#6366f1"
    },
    {
      name: "Crest",
      cities: ["Crest Centre", "Crest Nord", "Crest Sud", "Crest Est", "Crest Ouest"],
      description: "Couverture à Crest avec expertise locale",
      icon: "🏰",
      population: "8,900+",
      coverage: "23.38 km²",
      coordinates: { lat: 44.7333, lng: 5.0167 },
      color: "#a855f7"
    },
    {
      name: "Loriol-sur-Drôme",
      cities: ["Loriol Centre", "Loriol Nord", "Loriol Sud", "Loriol Est", "Loriol Ouest"],
      description: "Services à Loriol-sur-Drôme avec intervention sur mesure",
      icon: "🌳",
      population: "6,500+",
      coverage: "28.69 km²",
      coordinates: { lat: 44.7500, lng: 4.8167 },
      color: "#059669"
    },
    {
      name: "Livron",
      cities: ["Livron Centre", "Livron Nord", "Livron Sud", "Livron Est", "Livron Ouest"],
      description: "Intervention à Livron pour tous vos travaux de couverture",
      icon: "🏘️",
      population: "9,000+",
      coverage: "17.33 km²",
      coordinates: { lat: 44.7667, lng: 4.8500 },
      color: "#dc2626"
    },
    {
      name: "La Saulce",
      cities: ["La Saulce Centre", "La Saulce Nord", "La Saulce Sud", "La Saulce Est", "La Saulce Ouest"],
      description: "Couverture et rénovation à La Saulce avec expertise locale",
      icon: "🌾",
      population: "1,800+",
      coverage: "18.37 km²",
      coordinates: { lat: 44.6333, lng: 4.7833 },
      color: "#d97706"
    },
    {
      name: "Mirmande",
      cities: ["Mirmande Centre", "Mirmande Nord", "Mirmande Sud", "Mirmande Est", "Mirmande Ouest"],
      description: "Services de couverture à Mirmande avec intervention rapide",
      icon: "🏞️",
      population: "600+",
      coverage: "26.45 km²",
      coordinates: { lat: 44.6833, lng: 4.7833 },
      color: "#0891b2"
    },
    {
      name: "Montélimar",
      cities: ["Montélimar Centre", "Montélimar Nord", "Montélimar Sud", "Montélimar Est", "Montélimar Ouest"],
      description: "Intervention à Montélimar pour tous types de toitures",
      icon: "🏛️",
      population: "40,000+",
      coverage: "46.81 km²",
      coordinates: { lat: 44.5500, lng: 4.7500 },
      color: "#7c3aed"
    },
    {
      name: "Grenoble",
      cities: ["Grenoble Centre", "Grenoble Nord", "Grenoble Sud", "Grenoble Est", "Grenoble Ouest"],
      description: "Couverture et rénovation à Grenoble avec expertise alpine",
      icon: "⛰️",
      population: "160,000+",
      coverage: "18.13 km²",
      coordinates: { lat: 45.1833, lng: 5.7167 },
      color: "#059669"
    }
  ];

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    const initMap = () => {
      console.log('Initializing map...');
      if (window.google && window.google.maps && mapRef.current) {
        try {
          console.log('Google Maps API loaded successfully');
          // Add loading state
          if (mapRef.current) {
            mapRef.current.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #6b7280; font-size: 1.1rem;">
                <div style="text-align: center;">
                  <div style="margin-bottom: 1rem;">Chargement de la carte...</div>
                  <div style="width: 40px; height: 40px; border: 4px solid #e5e7eb; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                </div>
              </div>
            `;
          }

          const center = { lat: 45.2, lng: 4.8 };
          
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            zoom: 9,
            center: center,
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7c93a3" }, { lightness: -10 }]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }, { lightness: 16 }]
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#fefefe" }]
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#c9c9c9" }]
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }]
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#c5c8c4" }]
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }]
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffc107" }]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#f1b31d" }]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f79c3d" }]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5922e" }]
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#806b63" }]
              },
              {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
              },
              {
                featureType: "transit.line",
                elementType: "labels.text.fill",
                stylers: [{ color: "#77a000" }]
              },
              {
                featureType: "transit.line",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9d2e0" }]
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
              }
            ]
          });

          areas.forEach((area) => {
            try {
              if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                  position: area.coordinates,
                  map: mapInstance.current,
                  title: area.name,
                  content: new window.google.maps.marker.PinElement({
                    background: area.color,
                    borderColor: "#ffffff",
                    borderWeight: 3,
                    scale: 1.5
                  }).element
                });

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `
                    <div style="padding: 10px; min-width: 200px;">
                      <h3 style="margin: 0 0 8px 0; color: ${area.color}; font-size: 16px; font-weight: bold;">
                        ${area.name}
                      </h3>
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                        ${area.description}
                      </p>
                      <div style="font-size: 12px; color: #888;">
                        <strong>Population:</strong> ${area.population}<br>
                        <strong>Surface:</strong> ${area.coverage}
                      </div>
                    </div>
                  `
                });

                marker.addListener("click", () => {
                  infoWindow.open(mapInstance.current, marker);
                });
              } else {
                const marker = new window.google.maps.Marker({
                  position: area.coordinates,
                  map: mapInstance.current,
                  title: area.name,
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 15,
                    fillColor: area.color,
                    fillOpacity: 0.9,
                    strokeColor: "#ffffff",
                    strokeWeight: 3
                  }
                });

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `
                    <div style="padding: 10px; min-width: 200px;">
                      <h3 style="margin: 0 0 8px 0; color: ${area.color}; font-size: 16px; font-weight: bold;">
                        ${area.name}
                      </h3>
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                        ${area.description}
                      </p>
                      <div style="font-size: 12px; color: #888;">
                        <strong>Population:</strong> ${area.population}<br>
                        <strong>Surface:</strong> ${area.coverage}
                      </div>
                    </div>
                  `
                });

                marker.addListener("click", () => {
                  infoWindow.open(mapInstance.current, marker);
                });
              }
              console.log(`Marker created for ${area.name}`);
            } catch (error) {
              console.error('Error creating marker for', area.name, error);
            }
          });
          
          console.log('Map initialization completed successfully');
        } catch (error) {
          console.error('Error initializing map:', error);
          if (mapRef.current) {
            mapRef.current.innerHTML = `
              <div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 8px;">
                <h3>Zone d'intervention</h3>
                <p>Nous intervenons dans toute la région Rhône-Alpes</p>
                <div style="margin-top: 20px;">
                  ${areas.map(area => `
                    <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid ${area.color};">
                      <strong>${area.name}</strong><br>
                      <small>${area.description}</small>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
        }
      }
    };

    if (!window.google) {
      console.log('Google Maps API not loaded, loading script...');
      const script = document.createElement("script");
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDGmf5T6mFmqsuVbwax8pf0c8isgDiGr1U';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        initMap();
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 8px;">
              <h3>Zone d'intervention</h3>
              <p>Nous intervenons dans toute la région Rhône-Alpes</p>
              <div style="margin-top: 20px;">
                ${areas.map(area => `
                  <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid ${area.color};">
                    <strong>${area.name}</strong><br>
                    <small>${area.description}</small>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
      };
      document.head.appendChild(script);
    } else {
      console.log('Google Maps API already loaded');
      initMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      <SEO {...seoData} />
      
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://media.istockphoto.com/id/1441307295/photo/customer-contact-us-service-with-mail-email-telephone-icons-on-the-circle-wooden-put-on-the.webp?b=1&s=170667a&w=0&k=20&c=KWhf3x3rS2k-vOkdQZpmqOAhv94-xcWfyQL_gk4xXL4=')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          padding: "5rem 1rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1
              style={{
                color: "white",
                fontSize: "3rem",
                fontWeight: "700",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              }}
            >
              Contactez-nous
            </h1>
            <p
              style={{
                color: "white",
                fontSize: "1.25rem",
                fontWeight: "500",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              }}
            >
              DEVIS GRATUIT
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-section">
            <h2 className="section-title">Demander un devis</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="contact-grid">
              <div className="contact-info-section">
                <h3>Informations de contact</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('📞'))}</div>
                    <div className="contact-text">
                      <h4>Téléphone</h4>
                      <p>
                        <a href="tel:0780326427" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                          +33 780326427
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('📍'))}</div>
                    <div className="contact-text">
                      <h4>Adresse</h4>
                      <p>90 impasse des ramiers</p>
                      <p>07250 le pouzin</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('✉️'))}</div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <p>
                        <a href="mailto:support@bnbatiment.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                          support@bnbatiment.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('🕒'))}</div>
                    <div className="contact-text">
                      <h4>Horaires</h4>
                      <p>24h/24, 7j/7</p>
                      <p>Disponible sur appel</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('🏗️'))}</div>
                    <div className="contact-text">
                      <h4>Services</h4>
                      {loadingServices ? (
                        <p>Chargement des services...</p>
                      ) : (
                        <div className="services-list">
                          {services.slice(0, 3).map((service, index) => (
                            <span key={service.id} className="service-tag">
                              {service.title}
                              {index < Math.min(services.length, 3) - 1 && ' - '}
                            </span>
                          ))}
                          {services.length > 3 && (
                            <span className="service-more">
                              et {services.length - 3} autres...
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('📋'))}</div>
                    <div className="contact-text">
                      <h4>Types de projets</h4>
                      <p>Installation - Entretien - Réparation des fuites</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">{React.createElement(getIconComponent('🗺️'))}</div>
                    <div className="contact-text">
                      <h4>Zone d'intervention</h4>
                      <p>Lyon - Saint-Étienne - Valence - Clermont-Ferrand - Francheville - Givors - Vienne -
                        Le pouzin  - Privas - La Voulte-sur-Rhône - Crest - Loriol-sur-Drôme - 
                        Livron - La Saulce - Mirmande - Montélimar</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form-section">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Notre zone d'intervention</h2>
          <p className="section-subtitle">
            Nous intervenons dans votre région
          </p>
        
          <div className="map-container">
            {/* Google Maps Commute Map */}
            <div className="google-maps-section">
              <h3>Planifiez votre trajet</h3>
              <p>Utilisez notre carte interactive pour planifier votre trajet vers nos services</p>
              <div className="google-maps-iframe-container">
                <iframe 
                  src="https://storage.googleapis.com/maps-solutions-nm58esdixu/commutes/udid/commutes.html"
                  width="100%" 
                  height="400"
                  style={{border:0, borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}
                  loading="lazy"
                  title="Planification de trajet - BN BÂTIMENT"
                />
              </div>
            </div>
            
            {/* Custom Map with Legend */}
            <div className="custom-map-section">
              <h3>Nos zones d'intervention</h3>
              <div ref={mapRef} className="map" />
              <div className="map-legend">
                <h4>Légende</h4>
                <div className="legend-items">
                  {areas.map((area, index) => (
                    <div key={index} className="legend-item">
                      <div 
                        className="legend-color" 
                        style={{ backgroundColor: area.color }}
                      />
                      <span>{area.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
