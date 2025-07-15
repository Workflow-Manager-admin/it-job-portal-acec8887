import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function ApplyJob() {
  const { jobId } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({ resume: '', cover_letter: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.applyJob(jobId, form, token);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/jobseeker'), 1200);
    } catch (err) {
      setError(err.message || 'Application failed.');
    }
  };

  return (
    <div className="application-form-container">
      <h2>Apply for Job</h2>
      <form className="application-form" onSubmit={handleSubmit}>
        <label>
          Resume (URL or paste relevant text)
          <input type="text" name="resume" value={form.resume} onChange={handleChange} required />
        </label>
        <label>
          Cover Letter
          <textarea name="cover_letter" value={form.cover_letter} onChange={handleChange} required />
        </label>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Application submitted! Redirecting…</div>}
        <button className="btn" type="submit">Submit Application</button>
      </form>
    </div>
  );
}
