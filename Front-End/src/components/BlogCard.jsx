import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
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
