import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobFeed from './pages/JobFeed';
import JobDetails from './pages/JobDetails';
import EmployerDashboard from './pages/EmployerDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import PostJob from './pages/PostJob';
import ApplyJob from './pages/ApplyJob';
import { useAuth } from './context/AuthContext';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<JobFeed />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/jobs/:jobId/apply" element={user && user.role === 'jobseeker' ? <ApplyJob /> : <Navigate to="/login" />} />
          <Route path="/dashboard/employer" element={user && user.role === 'employer' ? <EmployerDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/jobseeker" element={user && user.role === 'jobseeker' ? <SeekerDashboard /> : <Navigate to="/login" />} />
          <Route path="/post-job" element={user && user.role === 'employer' ? <PostJob /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
