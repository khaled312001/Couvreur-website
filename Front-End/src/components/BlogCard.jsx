import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  // Generate SEO-friendly French alt text for blog images
  const getAltText = () => {
    if (post.title) {
      return `Article blog: ${post.title} - BN BÂTIMENT Expert couvreur Lyon conseils toiture`;
    }
    return 'Article blog BN BÂTIMENT - Conseils et actualités sur la toiture Lyon';
  };
  
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img 
          src={post.image} 
          alt={getAltText()}
          title={post.title ? `${post.title} - BN BÂTIMENT` : 'Article BN BÂTIMENT'}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="read-more">
          Lire la suite
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
