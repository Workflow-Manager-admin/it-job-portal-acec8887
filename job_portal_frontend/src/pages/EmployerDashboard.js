import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function EmployerDashboard() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.employerDashboard(token)
      .then(data => setJobs(data.jobs || []))
      .catch(e => setError(e.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Your Posted Jobs</h2>
      {loading && <div>Loading…</div>}
      {error && <div className="form-error">{error}</div>}
      <Link to="/post-job" className="btn">Post New Job</Link>
      <div className="job-list">
        {jobs.length === 0 && !loading ? <div>No jobs posted yet.</div> : jobs.map(job => (
          <div className="job-card" key={job.id}>
            <div className="job-title">{job.title}</div>
            <div className="job-meta">
              <span>{job.location}</span>
              <span>Posted: {job.posted_at || job.posted_date}</span>
            </div>
            <Link className="btn btn-small" to={`/jobs/${job.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
