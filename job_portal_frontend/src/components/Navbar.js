import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">IT Job Portal</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Jobs</Link>
        </li>
        {user && user.role === 'employer' && (
          <>
            <li>
              <Link to="/dashboard/employer">Dashboard</Link>
            </li>
            <li>
              <Link to="/post-job">Post Job</Link>
            </li>
          </>
        )}
        {user && user.role === 'jobseeker' && (
          <li>
            <Link to="/dashboard/jobseeker">My Applications</Link>
          </li>
        )}
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <li>
            <button className="btn btn-small" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
