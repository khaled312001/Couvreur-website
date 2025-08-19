import React from 'react';

const MapSection = ({ 
  title = "Planifiez votre trajet", 
  description = "Utilisez notre carte interactive pour planifier votre trajet vers nos services",
  height = "400px",
  className = ""
}) => {
  return (
    <div className={`google-maps-section ${className}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="google-maps-iframe-container">
        <iframe 
          src="https://storage.googleapis.com/maps-solutions-nm58esdixu/commutes/udid/commutes.html"
          width="100%" 
          height={height}
          style={{
            border: 0, 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          loading="lazy"
          title="Planification de trajet - BN BÂTIMENT"
        />
      </div>
    </div>
  );
};

export default MapSection;
