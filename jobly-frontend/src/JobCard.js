// src/JobCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ id, title, salary, equity, companyName, companyHandle }) {
  return (
    <div className="JobCard card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <Link to={`/companies/${companyHandle}`}>{companyName}</Link>
        </h6>
        {salary && <div><small>Salary: {salary}</small></div>}
        {equity && <div><small>Equity: {equity}</small></div>}
      </div>
    </div>
  );
}

export default JobCard;