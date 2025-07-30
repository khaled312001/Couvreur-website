import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="card hover-lift">
      <div className="card-content">
        <div className="card-icon animate-float">
          {service.icon}
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link to={service.link} className="card-button hover-glow">
          En savoir plus
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
