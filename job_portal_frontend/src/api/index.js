/**
 * API abstraction for the IT Job Portal: auth, jobs, applications, users.
 * Modify BASE_URL as needed to match backend deployment.
 */
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (data) config.body = JSON.stringify(data);

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!res.ok) {
    const detail = (await res.json().catch(() => ({}))).detail || res.statusText;
    throw new Error(detail);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export const api = {
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
  signup: (userType, payload) => apiRequest(`/auth/signup/${userType}`, 'POST', payload),
  getJobs: (params = {}, token) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/jobs${query ? `?${query}` : ''}`, 'GET', null, token);
  },
  getJob: (jobId, token) => apiRequest(`/jobs/${jobId}`, 'GET', null, token),
  postJob: (job, token) => apiRequest('/jobs', 'POST', job, token),
  updateJob: (jobId, job, token) => apiRequest(`/jobs/${jobId}`, 'PUT', job, token),
  deleteJob: (jobId, token) => apiRequest(`/jobs/${jobId}`, 'DELETE', null, token),
  applyJob: (jobId, application, token) => apiRequest(`/jobs/${jobId}/apply`, 'POST', application, token),
  seekerDashboard: (token) => apiRequest('/dashboard/jobseeker', 'GET', null, token),
  employerDashboard: (token) => apiRequest('/dashboard/employer', 'GET', null, token)
};
