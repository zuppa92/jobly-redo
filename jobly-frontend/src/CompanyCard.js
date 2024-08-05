// src/CompanyCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        {logoUrl && <img src={logoUrl} alt={name} className="float-right ml-5" />}
        <h6 className="card-title">
          {name}
        </h6>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;