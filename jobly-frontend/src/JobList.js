// src/JobList.js
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import "./JobList.css";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching jobs", err);
        setIsLoading(false);
      }
    }
    getJobs(); // Initial fetch to get all jobs
  }, []);

  async function handleSearch(term) {
    setIsLoading(true);
    try {
      let jobs = await JoblyApi.getJobs(term);
      setJobs(jobs);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching jobs", err);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm handleSearch={handleSearch} />
      {jobs.length ? (
        <div>
          {jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName} // Ensure company name is passed
              companyHandle={job.companyHandle}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobList;