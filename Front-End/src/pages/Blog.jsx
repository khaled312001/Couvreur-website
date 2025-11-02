import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../api/blog";
import SEO from "../components/SEO";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEO Data for Blog Page
  const seoData = {
    title: "Blog BN BÂTIMENT - Conseils Charpente Couverture Zinguerie Paris",
    description: "Découvrez nos conseils et actualités sur la charpente, couverture et zinguerie. Expert toiture Paris. Conseils entretien, réparation, installation toiture.",
    keywords: "blog charpente, blog couverture, blog zinguerie, conseils toiture, actualités toiture, expert toiture Paris, conseils entretien toiture, conseils réparation toiture, conseils installation toiture, conseils rénovation toiture, conseils isolation toiture, conseils démoussage, conseils nettoyage toiture, conseils fuite toiture, conseils ardoise, conseils tuiles, conseils zinc, conseils cuivre, conseils PVC, conseils aluminium, conseils acier, conseils inox, conseils titane, conseils composite, conseils bitume, conseils membrane, conseils étanchéité, conseils ventilation, conseils écran sous-toiture, conseils pare-vapeur, conseils liteaux, conseils volige, conseils chevrons, conseils pannes, conseils fermes, conseils poutres, conseils solives, conseils plancher, conseils escalier, conseils terrasse, conseils pergola, conseils abri jardin, conseils cabane, conseils chalet, conseils maison ossature bois, conseils construction bois, conseils rénovation bois, conseils traitement bois, conseils lasure, conseils peinture bois, conseils protection bois, conseils anti-termites, conseils anti-fongique, conseils hydrofuge, conseils oléofuge, conseils saturateur, conseils vernis, conseils enduit, conseils crépis, conseils ravalement façade, conseils rénovation façade, conseils nettoyage façade, conseils hydrogommage, conseils sablage, conseils gommage, conseils ponçage, actualités charpente, actualités couverture, actualités zinguerie, actualités toiture, actualités construction, actualités rénovation, actualités réparation, actualités installation, actualités entretien, actualités maintenance, actualités isolation, actualités étanchéité, actualités ventilation, actualités écran sous-toiture, actualités pare-vapeur, actualités liteaux, actualités volige, actualités chevrons, actualités pannes, actualités fermes, actualités poutres, actualités solives, actualités plancher, actualités escalier, actualités terrasse, actualités pergola, actualités abri jardin, actualités cabane, actualités chalet, actualités maison ossature bois, actualités construction bois, actualités rénovation bois, actualités traitement bois, actualités lasure, actualités peinture bois, actualités protection bois, actualités anti-termites, actualités anti-fongique, actualités hydrofuge, actualités oléofuge, actualités saturateur, actualités vernis, actualités enduit, actualités crépis, actualités ravalement façade, actualités rénovation façade, actualités nettoyage façade, actualités hydrogommage, actualités sablage, actualités gommage, actualités ponçage, informations charpente, informations couverture, informations zinguerie, informations toiture, informations construction, informations rénovation, informations réparation, informations installation, informations entretien, informations maintenance, informations isolation, informations étanchéité, informations ventilation, informations écran sous-toiture, informations pare-vapeur, informations liteaux, informations volige, informations chevrons, informations pannes, informations fermes, informations poutres, informations solives, informations plancher, informations escalier, informations terrasse, informations pergola, informations abri jardin, informations cabane, informations chalet, informations maison ossature bois, informations construction bois, informations rénovation bois, informations traitement bois, informations lasure, informations peinture bois, informations protection bois, informations anti-termites, informations anti-fongique, informations hydrofuge, informations oléofuge, informations saturateur, informations vernis, informations enduit, informations crépis, informations ravalement façade, informations rénovation façade, informations nettoyage façade, informations hydrogommage, informations sablage, informations gommage, informations ponçage, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/blog",
    image: "/logo.png"
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await fetchBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  return (
    <div>
      <SEO {...seoData} />
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://media.istockphoto.com/id/1476897744/photo/closeup-of-business-woman-hand-typing-and-working-on-laptop-computer-searching-the.jpg?s=612x612&w=0&k=20&c=8OtIN-VKQ4trfJfc_oCMuOL47aN9DB88WtvQIUDF3hI=')`,
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
              Blog
            </h1>
            <p style={{ 
              color: 'white', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Conseils et actualités de la couverture
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Nos articles
            </h2>
            <p className="section-subtitle" style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Conseils, actualités et informations sur la couverture
            </p>
          </div>

          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <div>Chargement des articles...</div>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
              <div>Aucun article disponible pour le moment.</div>
            </div>
          ) : (
            <div className="grid grid-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {posts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug || post.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="card" style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
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
                      height: '220px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '16px 16px 0 0',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
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
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#6b7280',
                          fontSize: '16px',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📷</div>
                            <div>Image de l'article</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card-content" style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        <span style={{
                          backgroundColor: '#f3f4f6',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#374151',
                          border: '1px solid #e5e7eb'
                        }}>
                          {post.category}
                        </span>
                        <span style={{ fontSize: '13px' }}>
                          {new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h3 style={{ 
                        marginBottom: '12px',
                        fontSize: '20px',
                        fontWeight: '700',
                        lineHeight: '1.4',
                        color: '#1f2937'
                      }}>
                        {post.title}
                      </h3>
                      <p style={{ 
                        color: '#6b7280', 
                        marginBottom: '20px',
                        lineHeight: '1.6',
                        fontSize: '15px'
                      }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
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
              Restez informé
            </h2>
            <p className="section-subtitle" style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Recevez nos conseils et actualités par email
            </p>
            <div style={{
              maxWidth: '500px',
              margin: '40px auto 0',
              display: 'flex',
              gap: '12px'
            }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1e3a8a';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                }}
              />
              <button style={{
                padding: '14px 28px',
                backgroundColor: '#1e3a8a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
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
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
