import React, { useEffect, useState } from "react";
import { fetchServices } from "../../api/services";
import ServiceCard from "../../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Nos Services</h1>
            <p>Charpente - Couverture - Zinguerie</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Tous nos services</h2>
          <p className="section-subtitle">
            Spécialiste en charpente, couverture et zinguerie
          </p>
          <div className="grid grid-3">
            {services.slice(0, 6).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Nos spécialités</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🏗️</div>
                <h3>Charpente</h3>
                <p>Construction et rénovation de charpentes traditionnelles et modernes.</p>
                <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                  <li>Charpente traditionnelle</li>
                  <li>Charpente moderne</li>
                  <li>Rénovation de charpente</li>
                  <li>Renforcement de structure</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🏠</div>
                <h3>Couverture</h3>
                <p>Installation et réparation de tous types de couvertures.</p>
                <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                  <li>Tuiles traditionnelles</li>
                  <li>Ardoises</li>
                  <li>Zinc</li>
                  <li>Métal</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🔧</div>
                <h3>Zinguerie</h3>
                <p>Réalisation de tous travaux de zinguerie et raccordements.</p>
                <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                  <li>Gouttières</li>
                  <li>Chéneaux</li>
                  <li>Raccordements</li>
                  <li>Étanchéité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🏆</div>
                <h3>Expertise</h3>
                <p>Équipe expérimentée en charpente, couverture et zinguerie.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">⏰</div>
                <h3>Réactivité</h3>
                <p>Intervention rapide et respect des délais convenus.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">💰</div>
                <h3>Transparence</h3>
                <p>Devis détaillés et prix transparents sans surprise.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🛡️</div>
                <h3>Garantie</h3>
                <p>Tous nos travaux sont garantis et assurés.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🌍</div>
                <h3>Écologique</h3>
                <p>Matériaux respectueux de l'environnement.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📞</div>
                <h3>Service client</h3>
                <p>Accompagnement personnalisé tout au long du projet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                DEVIS GRATUIT
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
