import React, { useEffect, useState } from "react";
import { fetchGallery } from "../api/gallery";
import GalleryItem from "../components/GalleryItem";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchGallery().then(setGallery);
  }, []);

  const filteredGallery = filter === "all" 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const categories = ["all", ...new Set(gallery.map(item => item.category))];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Nos Réalisations</h1>
            <p>Découvrez nos transformations avant/après</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Galerie de réalisations</h2>
          <p className="section-subtitle">
            Découvrez nos réalisations et transformations de toitures
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  backgroundColor: filter === category ? '#1e3a8a' : '#f3f4f6',
                  color: filter === category ? 'white' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (filter !== category) {
                    e.target.style.backgroundColor = '#dbeafe';
                    e.target.style.color = '#1e3a8a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== category) {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.color = '#374151';
                  }
                }}
              >
                {category === "all" ? "Tous" : category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-4">
            {filteredGallery.map(item => (
              <GalleryItem key={item.id} item={item} />
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280',
              fontSize: '18px'
            }}>
              Aucune réalisation trouvée pour cette catégorie.
            </div>
          )}
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
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
