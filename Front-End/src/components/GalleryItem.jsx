import React from "react";

const GalleryItem = ({ item }) => {
  return (
    <div className="gallery-item hover-scale">
      <img src={item.image} alt={item.title} />
      <div className="gallery-overlay">
        <div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      </div>
      <div className="gallery-badge">{item.category}</div>
    </div>
  );
};

export default GalleryItem;
