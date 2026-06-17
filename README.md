# JobSeeker

A full-stack job board application where employers can post jobs and manage applications, and candidates can search, apply, and wishlist positions.

## Tech Stack

**Frontend** — React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios, Zod, React Toastify

**Backend** — Node.js, Express 5, TypeScript, Prisma ORM, PostgreSQL, JWT (cookies), Multer (file uploads), Zod, bcrypt

## Project Structure

```
JobSeeker-MERN/
├── backend/          # Express API
│   ├── src/
│   │   ├── index.ts          # App entry, CORS, middleware
│   │   ├── authRoutes.ts     # /api/auth — register, login, logout
│   │   ├── protectedRoutes.ts# /api/private — all authenticated routes
│   │   ├── prisma.ts         # Prisma client instance
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma     # DB schema
│   └── generated/prisma/     # Prisma generated types (auto-generated)
└── frontend/         # React + Vite SPA
    └── src/
        ├── views/
        │   ├── EmployerPages/  # Dashboard, post jobs, view applications
        │   └── CandidatePages/ # Dashboard, browse jobs, apply, wishlist
        ├── components/
        └── utils/
```

## Features

**Candidates**
- Register / login
- Browse active job listings
- Apply with resume (PDF/Doc) and cover letter
- Track application status (Pending → Reviewing → Accepted / Rejected)
- Wishlist jobs

**Employers**
- Post and update job listings
- Toggle job active/inactive
- View all applications per listing
- Update application status with feedback

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/jobseeker
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

The API runs on `http://localhost:3003`.

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3003
```

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## API Routes

### Auth — `/api/auth`
| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create account |
| POST | `/login` | Login and set auth cookie |
| GET | `/logout` | Clear auth cookie |

### Protected — `/api/private` (requires auth cookie)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/user-details` | Get current user |
| POST | `/make-a-post` | Employer: create job posting |
| PATCH | `/update-a-post/:id` | Employer: update job posting |
| PATCH | `/updateJobStatus/:id` | Employer: toggle active status |
| GET | `/employer/jobPostings` | Employer: list own postings |
| GET | `/employer/jobPosting/:id` | Employer: single posting |
| GET | `/employer/applications/:jobId` | Employer: applications for a job |
| PATCH | `/employer/updateStatus/:applicationId/:status` | Employer: update application status |
| GET | `/candidate/jobPostings` | Candidate: browse all jobs |
| GET | `/candidate/jobPosting/:id` | Candidate: single job detail |
| POST | `/candidate/apply/:jobId` | Candidate: submit application |
| GET | `/candidate/my-applications` | Candidate: own applications |
| PATCH | `/candidate/wishlist/:jobPostId` | Candidate: wishlist a job |
| PATCH | `/candidate/dewishlist/:jobPostId` | Candidate: remove from wishlist |

## Deployment

The backend is deployed on **Render** and the frontend on **Vercel**.

### Backend (Render)

Set the following environment variables in the Render dashboard:

```
DATABASE_URL=<your postgres connection string>
JWT_SECRET=<your secret>
NODE_ENV=production
ALLOWED_ORIGINS=https://your-app.vercel.app
```

Build command:
```
npm install && npx prisma generate && npm run build
```

Start command:
```
npm run start
```

### Frontend (Vercel)

Set the following environment variable:

```
VITE_API_URL=https://your-backend.onrender.com
```

Vercel auto-detects Vite — set the root directory to `frontend/`.
