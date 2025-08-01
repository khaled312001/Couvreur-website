import React, { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Users, Car } from "lucide-react";
import "../styles/areas.css";

const Areas = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const areas = [
    {
      name: "Ardèche",
      cities: ["Annonay", "Aubenas", "Privas", "Tournon-sur-Rhône", "Valence", "Viviers", "Largentière"],
      description: "Intervention dans tout le département de l'Ardèche pour tous vos travaux de couverture",
      icon: "🏔️",
      population: "330,000+",
      coverage: "5,529 km²",
      coordinates: { lat: 44.6167, lng: 4.3833 },
      color: "#f97316"
    },
    {
      name: "Drôme",
      cities: ["Valence", "Romans-sur-Isère", "Montélimar", "Die", "Nyons", "Crest", "Pierrelatte"],
      description: "Couverture et rénovation dans la Drôme avec expertise locale",
      icon: "🌿",
      population: "510,000+",
      coverage: "6,530 km²",
      coordinates: { lat: 44.9333, lng: 4.8833 },
      color: "#10b981"
    },
    {
      name: "Isère",
      cities: ["Grenoble", "Vienne", "Voiron", "Saint-Marcellin", "La Tour-du-Pin", "Bourgoin-Jallieu"],
      description: "Services de couverture en Isère avec intervention rapide",
      icon: "⛰️",
      population: "1,250,000+",
      coverage: "7,431 km²",
      coordinates: { lat: 45.1833, lng: 5.7167 },
      color: "#3b82f6"
    },
    {
      name: "Loire",
      cities: ["Saint-Étienne", "Roanne", "Montbrison", "Feurs", "Saint-Chamond", "Firminy"],
      description: "Intervention dans la Loire pour tous types de toitures",
      icon: "🏭",
      population: "760,000+",
      coverage: "4,781 km²",
      coordinates: { lat: 45.4333, lng: 4.3833 },
      color: "#8b5cf6"
    },
    {
      name: "Rhône",
      cities: ["Lyon", "Villefranche-sur-Saône", "Tarare", "Belleville", "Givors", "Caluire-et-Cuire"],
      description: "Couverture dans le Rhône avec expertise métropolitaine",
      icon: "🏙️",
      population: "1,850,000+",
      coverage: "3,249 km²",
      coordinates: { lat: 45.7578, lng: 4.8320 },
      color: "#ef4444"
    },
    {
      name: "Ain",
      cities: ["Bourg-en-Bresse", "Oyonnax", "Belley", "Ambérieu-en-Bugey", "Gex", "Ferney-Voltaire"],
      description: "Services dans l'Ain avec intervention sur mesure",
      icon: "🌲",
      population: "650,000+",
      coverage: "5,762 km²",
      coordinates: { lat: 46.2000, lng: 5.2167 },
      color: "#f59e0b"
    }
  ];

  const stats = [
    { number: "6", label: "Départements couverts", icon: MapPin },
    { number: "50+", label: "Villes principales", icon: Users },
    { number: "24h", label: "Intervention d'urgence", icon: Clock },
    { number: "100%", label: "Zone couverte", icon: Car }
  ];

  useEffect(() => {
    // Initialize map when component mounts
    const initMap = () => {
      if (window.google && mapRef.current) {
        const center = { lat: 45.7578, lng: 4.8320 }; // Lyon center
        
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          zoom: 8,
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

        // Add markers for each area
        areas.forEach((area) => {
          const marker = new window.google.maps.Marker({
            position: area.coordinates,
            map: mapInstance.current,
            title: area.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: area.color,
              fillOpacity: 0.8,
              strokeColor: "#ffffff",
              strokeWeight: 2
            }
          });

          // Add info window
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
        });
      }
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (mapInstance.current) {
        // Cleanup map instance
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Zones d'intervention</h1>
            <p>Nous intervenons dans toute la région Rhône-Alpes</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Areas Section */}
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

      {/* Map Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Carte de nos interventions</h2>
          <p className="section-subtitle">
            Découvrez notre zone d'intervention interactive
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

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-cta">
            <div className="cta-background">
              <div className="cta-content">
                <div className="cta-header">
                  <div className="cta-badge">
                    <span>🎯</span>
                    <span>Devis Gratuit</span>
                  </div>
                  <h2 className="cta-title">Besoin d'un devis personnalisé ?</h2>
                  <p className="cta-description">
                    Contactez-nous pour un devis gratuit et personnalisé. Notre équipe d'experts vous accompagne dans tous vos projets de couverture.
                  </p>
                </div>
                
                <div className="cta-features">
                  <div className="cta-feature">
                    <div className="feature-icon">
                      <Clock size={20} />
                    </div>
                    <div className="feature-text">
                      <h4>Réponse rapide</h4>
                      <p>Devis sous 24h</p>
                    </div>
                  </div>
                  <div className="cta-feature">
                    <div className="feature-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="feature-text">
                      <h4>Intervention locale</h4>
                      <p>Dans votre région</p>
                    </div>
                  </div>
                  <div className="cta-feature">
                    <div className="feature-icon">
                      <Users size={20} />
                    </div>
                    <div className="feature-text">
                      <h4>Équipe experte</h4>
                      <p>Professionnels qualifiés</p>
                    </div>
                  </div>
                </div>

                <div className="cta-actions">
                  <div className="primary-action">
                    <a href="/contact" className="cta-button primary">
                      <div className="button-content">
                        <Mail size={24} />
                        <div className="button-text">
                          <span className="button-title">Demander un devis gratuit</span>
                          <span className="button-subtitle">Devis personnalisé sous 24h</span>
                        </div>
                      </div>
                      <div className="button-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                  
                  <div className="secondary-actions">
                    <a href="tel:33780326427" className="cta-button secondary">
                      <Phone size={20} />
                      <span>Appelez maintenant</span>
                    </a>
                    <a href="https://wa.me/330603713994" className="cta-button whatsapp" target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="cta-info">
                  <div className="info-item">
                    <Clock size={16} />
                    <span>Lun-Ven: 8h-18h | Sam: 9h-12h</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={16} />
                    <span>Intervention dans toute la région</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Areas;
