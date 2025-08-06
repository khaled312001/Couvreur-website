import React from "react";
import { getIconComponent } from '../utils/iconMapping';
import SEO from '../components/SEO';

const Pricing = () => {
  // SEO Data for Pricing Page
  const seoData = {
    title: "Tarifs BN BÂTIMENT - Devis Gratuit Charpente Couverture Zinguerie Paris",
    description: "Découvrez nos tarifs transparents pour charpente, couverture et zinguerie à Paris. Devis gratuit. Prix compétitifs. Expert toiture certifié.",
    keywords: "tarifs charpente, tarifs couverture, tarifs zinguerie, prix charpente, prix couverture, prix zinguerie, devis gratuit charpente, devis gratuit couverture, devis gratuit zinguerie, prix toiture Paris, tarifs toiture Paris, devis toiture gratuit, prix charpentier Paris, prix couvreur Paris, prix zingueur Paris, tarifs charpentier Paris, tarifs couvreur Paris, tarifs zingueur Paris, prix réparation toiture, tarifs réparation toiture, prix installation toiture, tarifs installation toiture, prix rénovation toiture, tarifs rénovation toiture, prix isolation toiture, tarifs isolation toiture, prix démoussage, tarifs démoussage, prix nettoyage toiture, tarifs nettoyage toiture, prix fuite toiture, tarifs fuite toiture, prix ardoise, tarifs ardoise, prix tuiles, tarifs tuiles, prix zinc, tarifs zinc, prix cuivre, tarifs cuivre, prix PVC, tarifs PVC, prix aluminium, tarifs aluminium, prix acier, tarifs acier, prix inox, tarifs inox, prix titane, tarifs titane, prix composite, tarifs composite, prix bitume, tarifs bitume, prix membrane, tarifs membrane, prix étanchéité, tarifs étanchéité, prix ventilation, tarifs ventilation, prix écran sous-toiture, tarifs écran sous-toiture, prix pare-vapeur, tarifs pare-vapeur, prix liteaux, tarifs liteaux, prix volige, tarifs volige, prix chevrons, tarifs chevrons, prix pannes, tarifs pannes, prix fermes, tarifs fermes, prix poutres, tarifs poutres, prix solives, tarifs solives, prix plancher, tarifs plancher, prix escalier, tarifs escalier, prix terrasse, tarifs terrasse, prix pergola, tarifs pergola, prix abri jardin, tarifs abri jardin, prix cabane, tarifs cabane, prix chalet, tarifs chalet, prix maison ossature bois, tarifs maison ossature bois, prix construction bois, tarifs construction bois, prix rénovation bois, tarifs rénovation bois, prix traitement bois, tarifs traitement bois, prix lasure, tarifs lasure, prix peinture bois, tarifs peinture bois, prix protection bois, tarifs protection bois, prix anti-termites, tarifs anti-termites, prix anti-fongique, tarifs anti-fongique, prix hydrofuge, tarifs hydrofuge, prix oléofuge, tarifs oléofuge, prix saturateur, tarifs saturateur, prix vernis, tarifs vernis, prix enduit, tarifs enduit, prix crépis, tarifs crépis, prix ravalement façade, tarifs ravalement façade, prix rénovation façade, tarifs rénovation façade, prix nettoyage façade, tarifs nettoyage façade, prix hydrogommage, tarifs hydrogommage, prix sablage, tarifs sablage, prix gommage, tarifs gommage, prix ponçage, tarifs ponçage, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/tarifs",
    image: "/logo.png"
  };

  const services = [
    {
      name: "Charpente",
      price: "Sur devis",
      description: "Construction et rénovation de charpentes",
      features: [
        "Charpente traditionnelle",
        "Charpente moderne",
        "Rénovation de charpente",
        "Renforcement de structure",
        "Devis gratuit"
      ]
    },
    {
      name: "Couverture",
      price: "Sur devis",
      description: "Installation et réparation de couvertures",
      features: [
        "Tuiles traditionnelles",
        "Ardoises",
        "Zinc",
        "Métal",
        "Devis gratuit"
      ]
    },
    {
      name: "Zinguerie",
      price: "Sur devis",
      description: "Travaux de zinguerie et raccordements",
      features: [
        "Gouttières",
        "Chéneaux",
        "Raccordements",
        "Étanchéité",
        "Devis gratuit"
      ]
    },
    {
      name: "Entretien",
      price: "À partir de 15€/m²",
      description: "Entretien préventif et réparations",
      features: [
        "Inspection complète",
        "Nettoyage des gouttières",
        "Vérification de l'étanchéité",
        "Petites réparations",
        "Rapport d'intervention"
      ]
    }
  ];

  return (
    <div>
      <SEO {...seoData} />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Nos Tarifs</h1>
            <p>Transparence et prix compétitifs</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Tarifs de nos services</h2>
          <p className="section-subtitle">
            Des prix transparents et compétitifs pour tous vos travaux
          </p>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <h3>{service.name}</h3>

                  <p style={{ marginBottom: '20px', color: '#6b7280' }}>
                    {service.description}
                  </p>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>
                      Inclus dans le service :
                    </strong>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} style={{
                          padding: '5px 0',
                          color: '#374151',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <a href="/contact" className="btn btn-primary">
                      Demander un devis
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Informations importantes</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">{React.createElement(getIconComponent('📋'))}</div>
                <h3>Devis gratuit</h3>
                <p>Tous nos devis sont gratuits et détaillés, sans engagement.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">{React.createElement(getIconComponent('🛡️'))}</div>
                <h3>Garantie</h3>
                <p>Tous nos travaux sont garantis et assurés.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">{React.createElement(getIconComponent('💰'))}</div>
                <h3>Paiement</h3>
                <p>Paiement échelonné possible selon les travaux.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis personnalisé ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et détaillé
            </p>
            <div className="cta-buttons" style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                <span>{React.createElement(getIconComponent('📋'))}</span>
                DEVIS GRATUIT
              </a>
              <a href="tel:33780326427" className="btn btn-secondary">
                <span>{React.createElement(getIconComponent('📞'))}</span>
                Appelez maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
