import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', description: '', location: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.postJob(form, token);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/employer'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to post job.');
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form className="post-job-form" onSubmit={handleSubmit}>
        <label>
          Job Title
          <input name="title" type="text" value={form.title} onChange={handleChange} required autoFocus />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Location
          <input name="location" type="text" value={form.location} onChange={handleChange} required />
        </label>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Job posted! Redirecting…</div>}
        <button className="btn" type="submit">Post Job</button>
      </form>
    </div>
  );
}
