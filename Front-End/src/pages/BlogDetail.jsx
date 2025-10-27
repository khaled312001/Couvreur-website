import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPostBySlug } from '../api/blog';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import Markdown from 'markdown-to-jsx';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SEO Data for Blog Detail Page
  const getSeoData = (post) => {
    if (!post) return {
      title: "Article BN BÂTIMENT - Blog Charpente Couverture Zinguerie Paris",
      description: "Découvrez nos articles sur la charpente, couverture et zinguerie. Conseils et actualités toiture. Expert toiture Paris.",
      keywords: "article charpente, article couverture, article zinguerie, blog toiture, conseils toiture, actualités toiture, expert toiture Paris",
      url: `/blog/${slug}`,
      image: "/logo.png",
      type: "article"
    };

    return {
      title: `${post.title} - BN BÂTIMENT Blog`,
      description: post.excerpt || post.content?.substring(0, 160) || "Article sur la charpente, couverture et zinguerie. Expert toiture Paris.",
      keywords: `article ${post.title}, blog charpente, blog couverture, blog zinguerie, conseils toiture, actualités toiture, expert toiture Paris, ${post.tags?.join(', ') || ''}`,
      url: `/blog/${slug}`,
      image: post.image || "/logo.png",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      section: "Blog",
      tags: post.tags || []
    };
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await fetchBlogPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Article non trouvé');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>Chargement de l'article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
          Article non trouvé
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link 
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#1e3a8a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
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
          <ArrowLeft size={16} />
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SEO {...getSeoData(post)} />
      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${post.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8rem 1rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(30, 58, 138, 0.9)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              {post.category}
            </div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '1rem',
              lineHeight: '1.2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}>
              {post.title}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              marginBottom: '2rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              {post.excerpt || post.content.substring(0, 200) + '...'}
            </p>
            
            {/* Article Meta */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '14px',
              opacity: 0.8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} />
                <span>{post.author || 'Admin'}</span>
              </div>
              {post.readTime && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            {/* Article Image */}
            {post.image && (
              <div style={{
                marginBottom: '2rem',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <Markdown
                options={{
                  overrides: {
                    h1: { component: 'h1', props: { style: { fontSize: '2rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1f2937' } } },
                    h2: { component: 'h2', props: { style: { fontSize: '1.75rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1f2937' } } },
                    h3: { component: 'h3', props: { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1f2937' } } },
                    p: { component: 'p', props: { style: { marginBottom: '1.5rem' } } },
                    strong: { component: 'strong', props: { style: { fontWeight: '700', color: '#1e3a8a' } } },
                    ul: { component: 'ul', props: { style: { marginBottom: '1.5rem', paddingLeft: '2rem' } } },
                    ol: { component: 'ol', props: { style: { marginBottom: '1.5rem', paddingLeft: '2rem' } } },
                    li: { component: 'li', props: { style: { marginBottom: '0.5rem' } } },
                    a: { component: 'a', props: { style: { color: '#1e3a8a', textDecoration: 'underline' } } }
                  }
                }}
              >
                {post.content.replace(/\\n/g, '\n')}
              </Markdown>
            </div>

            {/* Article Footer */}
            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={16} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {post.category}
                </span>
              </div>
              
              <Link 
                to="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
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
                <ArrowLeft size={16} />
                Retour au blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: '#f9fafb',
        padding: '4rem 0',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Besoin de nos services ?
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
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
                📋 Demander un devis
              </Link>
              <a 
                href="tel:33780326427"
                style={{
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
                📞 Appelez maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail; 