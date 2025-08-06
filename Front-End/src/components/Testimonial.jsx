import React from "react";

const Testimonial = ({ testimonial }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? '' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-card fade-in-on-scroll">
      <div className="testimonial-content">
        <div className="testimonial-rating">
          {renderStars(testimonial.rating)}
        </div>
        <p className="testimonial-text">
          "{testimonial.content}"
        </p>
        <div className="testimonial-author">
          <div className="author-avatar">
            <span>{testimonial.name ? testimonial.name.charAt(0).toUpperCase() : 'A'}</span>
          </div>
          <div className="author-info">
            <h4>{testimonial.name}</h4>
            <span>{testimonial.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
