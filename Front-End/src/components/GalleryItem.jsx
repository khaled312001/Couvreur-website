import React from "react";

const GalleryItem = ({ item }) => {
  return (
    <div className="gallery-item" style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }}
    >
      <div style={{
        position: 'relative',
        height: '250px',
        overflow: 'hidden'
      }}>
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'} 
          alt={`${item.title ? item.title + ' - ' : ''}RÉALISATION ${item.category || 'TOITURE'} PAR BN BÂTIMENT - Expert couvreur Lyon Saint-Étienne Valence Clermont-Ferrand Grenoble`}
          title={`${item.title || 'Réalisation'} - BN BÂTIMENT ${item.category || ''}`}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(30, 58, 138, 0.9)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          backdropFilter: 'blur(4px)'
        }}>
          {item.category}
        </div>
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
          padding: '20px',
          color: 'white',
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(100%)';
        }}
        >
          <h4 style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '1.3'
          }}>
            {item.title}
          </h4>
          <p style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.4',
            opacity: 0.9
          }}>
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Content below image */}
      <div style={{
        padding: '16px',
        backgroundColor: 'white'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937',
          lineHeight: '1.3'
        }}>
          {item.title}
        </h4>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default GalleryItem;
