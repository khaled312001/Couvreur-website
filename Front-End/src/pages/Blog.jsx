import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api/blog";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop')`,
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
                <div key={post.id} className="card" style={{
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
                    <a 
                      href={`/blog/${post.slug || post.id}`} 
                      className="btn btn-primary"
                      style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#1e3a8a',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer'
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
                      Lire la suite →
                    </a>
                  </div>
                </div>
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
