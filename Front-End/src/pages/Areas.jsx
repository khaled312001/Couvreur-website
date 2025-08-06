import React, { useEffect, useRef } from "react";
import { MapPin, Users, Clock, Car } from "lucide-react";
import SEO from '../components/SEO';
import '../styles/areas.css';


const Areas = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // SEO Data for Areas Page
  const seoData = {
    title: "Zones d'intervention BN BÂTIMENT - Devis Gratuit Charpente Couverture Zinguerie Lyon",
    description: "BN BÂTIMENT intervient dans toute la région Rhône-Alpes pour charpente, couverture et zinguerie. Lyon, Saint-Étienne, Valence, Clermont-Ferrand. Devis gratuit. Intervention 24h/24.",
    keywords: "zones d'intervention charpente, zones d'intervention couverture, zones d'intervention zinguerie, couvreur Lyon, charpentier Lyon, zingueur Lyon, couvreur Saint-Étienne, charpentier Saint-Étienne, zingueur Saint-Étienne, couvreur Valence, charpentier Valence, zingueur Valence, couvreur Clermont-Ferrand, charpentier Clermont-Ferrand, zingueur Clermont-Ferrand, couvreur Francheville, charpentier Francheville, zingueur Francheville, couvreur Givors, charpentier Givors, zingueur Givors, couvreur Vienne, charpentier Vienne, zingueur Vienne, couvreur Le Pouzin, charpentier Le Pouzin, zingueur Le Pouzin, couvreur Privas, charpentier Privas, zingueur Privas, couvreur La Voulte-sur-Rhône, charpentier La Voulte-sur-Rhône, zingueur La Voulte-sur-Rhône, couvreur Crest, charpentier Crest, zingueur Crest, couvreur Loriol-sur-Drôme, charpentier Loriol-sur-Drôme, zingueur Loriol-sur-Drôme, couvreur Livron, charpentier Livron, zingueur Livron, couvreur La Saulce, charpentier La Saulce, zingueur La Saulce, couvreur Mirmande, charpentier Mirmande, zingueur Mirmande, couvreur Montélimar, charpentier Montélimar, zingueur Montélimar, intervention charpente Lyon, intervention couverture Lyon, intervention zinguerie Lyon, intervention charpente Saint-Étienne, intervention couverture Saint-Étienne, intervention zinguerie Saint-Étienne, intervention charpente Valence, intervention couverture Valence, intervention zinguerie Valence, intervention charpente Clermont-Ferrand, intervention couverture Clermont-Ferrand, intervention zinguerie Clermont-Ferrand, intervention charpente Francheville, intervention couverture Francheville, intervention zinguerie Francheville, intervention charpente Givors, intervention couverture Givors, intervention zinguerie Givors, intervention charpente Vienne, intervention couverture Vienne, intervention zinguerie Vienne, intervention charpente Le Pouzin, intervention couverture Le Pouzin, intervention zinguerie Le Pouzin, intervention charpente Privas, intervention couverture Privas, intervention zinguerie Privas, intervention charpente La Voulte-sur-Rhône, intervention couverture La Voulte-sur-Rhône, intervention zinguerie La Voulte-sur-Rhône, intervention charpente Crest, intervention couverture Crest, intervention zinguerie Crest, intervention charpente Loriol-sur-Drôme, intervention couverture Loriol-sur-Drôme, intervention zinguerie Loriol-sur-Drôme, intervention charpente Livron, intervention couverture Livron, intervention zinguerie Livron, intervention charpente La Saulce, intervention couverture La Saulce, intervention zinguerie La Saulce, intervention charpente Mirmande, intervention couverture Mirmande, intervention zinguerie Mirmande, intervention charpente Montélimar, intervention couverture Montélimar, intervention zinguerie Montélimar, devis gratuit Lyon, devis gratuit Saint-Étienne, devis gratuit Valence, devis gratuit Clermont-Ferrand, devis gratuit Francheville, devis gratuit Givors, devis gratuit Vienne, devis gratuit Le Pouzin, devis gratuit Privas, devis gratuit La Voulte-sur-Rhône, devis gratuit Crest, devis gratuit Loriol-sur-Drôme, devis gratuit Livron, devis gratuit La Saulce, devis gratuit Mirmande, devis gratuit Montélimar, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/zones",
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

  const stats = [
    { number: "16", label: "Villes couvertes", icon: MapPin },
    { number: "80+", label: "Quartiers desservis", icon: Users },
    { number: "24h", label: "Intervention d'urgence", icon: Clock },
    { number: "100%", label: "Zone couverte", icon: Car }
  ];

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
      
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://as2.ftcdn.net/v2/jpg/07/73/28/07/1000_F_773280751_D1Hmsv70vu2sd5AnOiLf5JQzdKhmGQYQ.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 1rem",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="hero-content">
            <h1 style={{
              color: "#ffffff",
              fontSize: "3rem",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            }}>
              Zones d'intervention
            </h1>
            <p style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            }}>
              Nous intervenons dans toute la région Rhône-Alpes
            </p>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos zones d'intervention</h2>
          <p className="section-subtitle">
            Nous intervenons dans toute la région Rhône-Alpes pour vos travaux de couverture
          </p>
          <div className="grid grid-3">
            {areas.map((area, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-icon" style={{ color: area.color }}>{area.icon}</div>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <div className="area-stats">
                    <div className="area-stat">
                      <Users size={16} />
                      <span>{area.population}</span>
                    </div>
                    <div className="area-stat">
                      <MapPin size={16} />
                      <span>{area.coverage}</span>
                    </div>
                  </div>
                  <div className="cities-list">
                    <strong>Villes principales :</strong>
                    <div className="cities-grid">
                      {area.cities.map((city, cityIndex) => (
                        <span key={cityIndex} className="city-tag">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      </section>
    </div>
  );
};

export default Areas;
