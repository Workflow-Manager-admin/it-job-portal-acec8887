import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.getJobs({ search }, token)
      .then(jobs => setJobs(jobs))
      .catch(e => setError(e.message || 'Failed to fetch jobs.'))
      .finally(() => setLoading(false));
  }, [search, token]);

  return (
    <div className="job-feed-container">
      <h2>IT Job Openings</h2>
      <div className="job-filter">
        <input
          type="text"
          placeholder="Search jobs (role, skill, location, ...)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading && <div>Loading jobs…</div>}
      {error && <div className="form-error">{error}</div>}
      <div className="job-list">
        {jobs.length === 0 && !loading ? <div>No jobs found.</div> : jobs.map(job => (
          <Link key={job.id} to={`/jobs/${job.id}`} className="job-card">
            <div className="job-title">{job.title}</div>
            <div className="job-meta">
              <span className="job-company">{job.company}</span>
              <span className="job-location">{job.location}</span>
            </div>
            <div className="job-snippet">{job.summary || job.description?.slice(0, 80) + '…'}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
