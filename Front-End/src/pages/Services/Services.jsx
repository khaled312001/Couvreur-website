import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServices } from "../../api/services";
import ServiceCard from "../../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  const heroData = {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Nos Services",
    subtitle: "Charpente - Couverture - Zinguerie",
    description: "Des solutions complètes pour tous vos projets de construction et rénovation"
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundImage: `url(${heroData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* Overlay sombre */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        />
        <div
          className="container text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="animate-fadeInUp">{heroData.title}</h1>
          <p className="animate-slideInLeft">{heroData.subtitle}</p>
          <p className="animate-slideInRight">{heroData.description}</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title fade-in-on-scroll">Tous nos services</h2>
          <p className="section-subtitle fade-in-on-scroll">
            Spécialiste en charpente, couverture et zinguerie
          </p>
          <div className="grid grid-3">
            {services.slice(0, 6).map((service, index) => (
              <div
                key={service.id}
                className="fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title fade-in-on-scroll">Nos spécialités</h2>
          <div className="grid grid-3">
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <Link to="/services/charpente" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card hover-lift">
                  <div className="card-content">
                    <div className="card-icon animate-float">🏗️</div>
                    <h3>Charpente</h3>
                    <p>Construction et rénovation de charpentes traditionnelles et modernes.</p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                      <li>Charpente traditionnelle</li>
                      <li>Charpente moderne</li>
                      <li>Rénovation de charpente</li>
                      <li>Renforcement de structure</li>
                    </ul>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>En savoir plus →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <Link to="/services/couverture" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card hover-lift">
                  <div className="card-content">
                    <div className="card-icon animate-float">🏠</div>
                    <h3>Couverture</h3>
                    <p>Installation et réparation de tous types de couvertures.</p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                      <li>Tuiles traditionnelles</li>
                      <li>Ardoises</li>
                      <li>Zinc</li>
                      <li>Métal</li>
                    </ul>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>En savoir plus →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <Link to="/services/zinguerie" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card hover-lift">
                  <div className="card-content">
                    <div className="card-icon animate-float">🔧</div>
                    <h3>Zinguerie</h3>
                    <p>Réalisation de tous travaux de zinguerie et raccordements.</p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                      <li>Gouttières</li>
                      <li>Chéneaux</li>
                      <li>Raccordements</li>
                      <li>Étanchéité</li>
                    </ul>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>En savoir plus →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title fade-in-on-scroll">Pourquoi nous choisir ?</h2>
          <div className="grid grid-3">
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">🏆</div>
                  <h3>Expertise</h3>
                  <p>Équipe expérimentée en charpente, couverture et zinguerie.</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">⏰</div>
                  <h3>Réactivité</h3>
                  <p>Intervention rapide et respect des délais convenus.</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">💰</div>
                  <h3>Transparence</h3>
                  <p>Devis détaillés et prix transparents sans surprise.</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">🛡️</div>
                  <h3>Garantie</h3>
                  <p>Tous nos travaux sont garantis et assurés.</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.5s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">🌍</div>
                  <h3>Écologique</h3>
                  <p>Matériaux respectueux de l'environnement.</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.6s" }}>
              <div className="card hover-lift">
                <div className="card-content">
                  <div className="card-icon animate-float">📞</div>
                  <h3>Service client</h3>
                  <p>Accompagnement personnalisé tout au long du projet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div className="text-center fade-in-on-scroll">
            <h2 className="section-title">Besoin d'un devis ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div style={{ marginTop: '40px' }}>
              <Link to="/contact" className="btn btn-primary hover-glow">
                DEVIS GRATUIT
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
