import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    api.getJob(jobId, token).then(setJob)
      .catch(e => setError(e.message || 'Failed to load job.'));
  }, [jobId, token]);

  if (error) return <div className="form-error">{error}</div>;
  if (!job) return <div>Loading…</div>;

  return (
    <div className="job-details-container">
      <h2>{job.title}</h2>
      <div className="job-details-meta">
        <span><b>Company:</b> {job.company}</span>
        <span><b>Location:</b> {job.location}</span>
        <span><b>Posted:</b> {job.posted_date || job.posted_at}</span>
      </div>
      <div className="job-details-desc">
        <p>{job.description}</p>
      </div>
      {user && user.role === 'jobseeker' && (
        <Link to={`/jobs/${job.id}/apply`} className="btn">Apply</Link>
      )}
    </div>
  );
}
