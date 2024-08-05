// src/CompanyDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import "./CompanyDetail.css";

function CompanyDetail() {
  const { handle } = useParams(); // Ensure the parameter matches the route parameter
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Error fetching company details", err);
      }
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading &hellip;</p>;

  return (
    <div className="CompanyDetail">
      <h1>{company.name}</h1>
      <p className="description">{company.description}</p>
      <div className="jobs">
        <JobCardList jobs={company.jobs} />
      </div>
    </div>
  );
}

export default CompanyDetail;