import React, { useEffect, useState } from "react";
import { fetchGalleryItems } from "../api/gallery";
import GalleryItem from "../components/GalleryItem";
import SEO from "../components/SEO";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // SEO Data for Gallery Page
  const seoData = {
    title: "Réalisations BN BÂTIMENT - Galerie Charpente Couverture Zinguerie Paris",
    description: "Découvrez nos réalisations en charpente, couverture et zinguerie à Paris. Avant/après, transformations toiture. Expert toiture certifié. Plus de 200 projets réalisés.",
    keywords: "réalisations charpente, réalisations couverture, réalisations zinguerie, galerie toiture, avant après toiture, transformations toiture, projets charpente, projets couverture, projets zinguerie, travaux charpente, travaux couverture, travaux zinguerie, rénovation toiture, installation toiture, réparation toiture, isolation toiture, démoussage, nettoyage toiture, fuite toiture, ardoise, tuiles, zinc, cuivre, PVC, aluminium, acier, inox, titane, composite, bitume, membrane, étanchéité, ventilation, écran sous-toiture, pare-vapeur, liteaux, volige, chevrons, pannes, fermes, poutres, solives, plancher, escalier, terrasse, pergola, abri jardin, cabane, chalet, maison ossature bois, construction bois, rénovation bois, traitement bois, lasure, peinture bois, protection bois, anti-termites, anti-fongique, hydrofuge, oléofuge, saturateur, vernis, enduit, crépis, ravalement façade, rénovation façade, nettoyage façade, hydrogommage, sablage, gommage, ponçage, portfolio charpente, portfolio couverture, portfolio zinguerie, portfolio toiture, exemples charpente, exemples couverture, exemples zinguerie, exemples toiture, références charpente, références couverture, références zinguerie, références toiture, témoignages charpente, témoignages couverture, témoignages zinguerie, témoignages toiture, avis charpente, avis couverture, avis zinguerie, avis toiture, satisfaction charpente, satisfaction couverture, satisfaction zinguerie, satisfaction toiture, qualité charpente, qualité couverture, qualité zinguerie, qualité toiture, professionnalisme charpente, professionnalisme couverture, professionnalisme zinguerie, professionnalisme toiture, expertise charpente, expertise couverture, expertise zinguerie, expertise toiture, savoir-faire charpente, savoir-faire couverture, savoir-faire zinguerie, savoir-faire toiture, compétence charpente, compétence couverture, compétence zinguerie, compétence toiture, expérience charpente, expérience couverture, expérience zinguerie, expérience toiture, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/realisations",
    image: "/logo.png"
  };

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const items = await fetchGalleryItems();
        setGallery(items);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadGallery();
  }, []);

  const filteredGallery = filter === "all" 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const categories = ["all", ...new Set(gallery.map(item => item.category))];

  return (
    <div>
      <SEO {...seoData} />
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://media.istockphoto.com/id/1329368655/photo/roofing-work-new-covering-of-a-tiled-roof.jpg?s=612x612&w=0&k=20&c=8FLEyDkZPygAx9z-7Jnclbs--AVjKQGfUpN7JVwHI34=')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          padding: '8rem 1rem',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 style={{ 
              color: 'white', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Nos Réalisations
            </h1>
            <p style={{ 
              color: 'white', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Découvrez nos transformations avant/après
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Galerie de réalisations
            </h2>
            <p className="section-subtitle" style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Découvrez nos réalisations et transformations de toitures
            </p>
          </div>

          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <div>Chargement des réalisations...</div>
            </div>
          ) : gallery.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📷</div>
              <div>Aucune réalisation disponible pour le moment.</div>
            </div>
          ) : (
            <>
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
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      backgroundColor: filter === category ? '#1e3a8a' : '#f3f4f6',
                      color: filter === category ? 'white' : '#374151',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== category) {
                        e.target.style.backgroundColor = '#dbeafe';
                        e.target.style.color = '#1e3a8a';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== category) {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.color = '#374151';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {category === "all" ? "Toutes" : category}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-4" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
              }}>
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
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray" style={{
        backgroundColor: '#f9fafb',
        padding: '4rem 0',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Besoin d'un devis ?
            </h2>
            <p className="section-subtitle" style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="cta-buttons" style={{ 
              marginTop: '40px',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="/contact" className="btn btn-primary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#1e3a8a',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e3a8a';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                <span>📋</span>
                Demander un devis gratuit
              </a>
              <a href="tel:33780326427" className="btn btn-secondary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                border: '2px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                <span>📞</span>
                Appelez maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
