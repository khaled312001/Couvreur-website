import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="card hover-lift">
      <div className="card-content">
        <div className="card-icon animate-float">
          {service.icon}
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        
        {/* Informations supplémentaires */}
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Prix :</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e3a8a' }}>
              {service.priceRange}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Durée :</span>
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {service.duration}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Catégorie :</span>
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {service.category}
            </span>
          </div>
        </div>

        {/* Caractéristiques principales */}
        {service.features && service.features.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', color: '#374151' }}>Caractéristiques :</h4>
            <ul style={{ fontSize: '13px', color: '#6b7280', paddingLeft: '15px', margin: 0 }}>
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              {service.features.length > 3 && (
                <li style={{ fontStyle: 'italic' }}>... et plus</li>
              )}
            </ul>
          </div>
        )}

        {/* Avantages */}
        {service.advantages && service.advantages.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px', color: '#374151' }}>Avantages :</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {service.advantages.slice(0, 3).map((advantage, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#e0e7ff',
                    color: '#1e3a8a',
                    padding: '2px 6px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}
                >
                  {advantage}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link to={service.link} className="card-button hover-glow">
          En savoir plus
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
