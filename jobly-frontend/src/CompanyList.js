// src/CompanyList.js
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import "./CompanyList.css";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      try {
        let companies = await JoblyApi.getCompanies();
        setCompanies(companies);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching companies", err);
        setIsLoading(false);
      }
    }
    getCompanies();
  }, []);

  async function handleSearch(term) {
    setIsLoading(true);
    try {
      let companies = await JoblyApi.getCompanies(term);
      setCompanies(companies);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching companies", err);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm handleSearch={handleSearch} />
      {companies.length ? (
        <div>
          {companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompanyList;