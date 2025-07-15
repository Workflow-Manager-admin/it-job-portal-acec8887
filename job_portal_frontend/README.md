# IT Job Portal Frontend

This is the React frontend for the IT Job Portal application. It provides a responsive, modern user interface for job seekers and employers to interact with the backend API.

---

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Main User Flows and Pages](#main-user-flows-and-pages)
- [Environment and Backend Integration](#environment-and-backend-integration)
- [Usage Notes](#usage-notes)

---

## Features

- User authentication (job seekers & employers, JWT-based)
- Search and filter IT jobs
- Apply for jobs (job seekers)
- Post/manage jobs (employers)
- Employer dashboard: view posted jobs & applications
- Job seeker dashboard: track applied jobs & statuses
- Modern responsive UI, custom CSS, no heavy UI frameworks
- React Router for navigation

---

## Setup

1. **Node.js** required (v16+ recommended).
2. **Install dependencies:**
   ```bash
   cd job_portal_frontend
   npm install
   ```

---

## Running the App

Start the frontend server in dev mode:

```bash
npm start
```

Default: [http://localhost:3000](http://localhost:3000)

You should have the backend API ([see backend README](../../it-job-portal-a5596dc3/job_portal_backend/README.md)) running at [http://localhost:8000](http://localhost:8000) for full functionality.

---

## Testing

To run all unit and React component tests:

```bash
npm test
```

---

## Main User Flows and Pages

**Authentication:**
- `/login` — Login as job seeker or employer.
- `/signup` — Register (two roles supported).
  - Employers specify company name.

**Job Browsing:**
- `/` — Job feed with search box; public.

**Job Details & Apply:**
- `/jobs/:jobId` — View job details.
- `/jobs/:jobId/apply` — Seeker can apply for this job.
- Application includes resume (URL or text) and cover letter.

**For Employers:**
- `/dashboard/employer` — Lists posted jobs with application counts.
- `/post-job` — Post a new job (title, description, location).

**For Job Seekers:**
- `/dashboard/jobseeker` — See your applied jobs and application statuses.

**Nav Bar:**
- Adjusts displayed links according to auth/role.

---

## Environment and Backend Integration

**API URL:**  
By default, the app fetches API data from `http://localhost:8000`.

- You can override:  
  Set `REACT_APP_API_URL` in a `.env` file at `job_portal_frontend/`:
  ```
  REACT_APP_API_URL=http://your-backend-url:8000
  ```
- Main API logic is in [`src/api/index.js`](src/api/index.js).

**Authentication:**  
JWT is stored in `localStorage`; it is sent automatically on secured requests.

---

## Usage Notes

- Log in as **employer** to post/manage jobs and see applications.
- Log in as **job seeker** to apply for jobs and view your submissions.
- The UI adapts to your authentication state and role.
- Most errors (such as invalid credentials, posting failures) are shown inline above forms.

---

## Customization and Styles

- CSS variables for theme/colors in [`src/App.css`](src/App.css).
- Components and main pages are in `src/components/` and `src/pages/`.

---

## License

MIT License.
