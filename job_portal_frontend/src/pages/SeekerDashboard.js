import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SeekerDashboard() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.seekerDashboard(token)
      .then(data => setApplications(data.applications || []))
      .catch(e => setError(e.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>My Applications</h2>
      {loading && <div>Loading…</div>}
      {error && <div className="form-error">{error}</div>}
      <div className="application-list">
        {applications.length === 0 && !loading ? <div>You haven&apos;t applied for any jobs yet.</div> : applications.map(app => (
          <div className="application-card" key={app.id}>
            <div>
              <span className="job-title">{app.job_title}</span>
              <span className="job-company">{app.company}</span>
            </div>
            <div>
              Status: <b>{app.status}</b>
            </div>
            <Link className="btn btn-small" to={`/jobs/${app.job_id}`}>View Job</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
