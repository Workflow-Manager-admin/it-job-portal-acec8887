import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('jobseeker');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login({ ...form, role });
      if (role === 'employer') {
        navigate('/dashboard/employer');
      } else {
        navigate('/dashboard/jobseeker');
      }
    } catch (err) {
      setError(err.message || 'Failed to login.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          I am a:
          <select name="role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </label>
        <label>
          Username/Email
          <input name="username" type="text" value={form.username} onChange={handleChange} autoFocus required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn" type="submit">Sign In</button>
        <div className="auth-links">
          <span>New here?</span> <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
