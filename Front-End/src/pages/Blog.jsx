import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api/blog";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts().then(setPosts);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Blog</h1>
            <p>Conseils et actualités de la couverture</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos articles</h2>
          <p className="section-subtitle">
            Conseils, actualités et informations sur la couverture
          </p>
          <div className="grid grid-3">
            {posts.map(post => (
              <div key={post.id} className="card">
                <div style={{
                  height: '200px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '16px'
                }}>
                  Image de l'article
                </div>
                <div className="card-content">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span>{post.category}</span>
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
                  <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <a href={`/blog/${post.slug}`} className="btn btn-primary">
                    Lire la suite
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Restez informé</h2>
            <p className="section-subtitle">
              Recevez nos conseils et actualités par email
            </p>
            <div style={{
              maxWidth: '500px',
              margin: '40px auto 0',
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#1e3a8a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1e3a8a'}
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
