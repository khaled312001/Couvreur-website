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
    <div className="testimonial hover-lift">
      <div className="testimonial-stars">
        {renderStars(testimonial.rating)}
      </div>
      <div className="testimonial-text">
        "{testimonial.text}"
      </div>
      <div className="testimonial-author">
        <div className="author-info">
          <h4>{testimonial.author}</h4>
          <p>{testimonial.location}</p>
        </div>
        <div className="testimonial-date">
          {testimonial.date}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
