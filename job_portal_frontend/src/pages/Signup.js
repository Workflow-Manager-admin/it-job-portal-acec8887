import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [role, setRole] = useState('jobseeker');
  const [form, setForm] = useState({ username: '', password: '', email: '', company: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const signupData = { ...form };
      if (role !== 'employer') delete signupData.company;
      await signup(role, signupData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'Sign up failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          I am a:
          <select name="role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </label>
        <label>
          Username
          <input name="username" type="text" value={form.username} onChange={handleChange} required autoFocus />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        {role === 'employer' && (
          <label>
            Company Name
            <input name="company" type="text" value={form.company} onChange={handleChange} required />
          </label>
        )}
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Signup successful! Redirecting…</div>}
        <button className="btn" type="submit">Sign Up</button>
        <div className="auth-links">
          <span>Already have an account?</span> <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
