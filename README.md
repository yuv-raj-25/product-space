# Product Space Task Management

Mini SaaS task management application built for the Full Stack Developer Intern screening test.

This project includes:
- A `Node.js + Express + Sequelize + PostgreSQL` backend
- A `React + Tailwind + Vite` frontend
- JWT authentication
- Per-user task ownership
- Protected task APIs

## Features

- User signup and login
- Password hashing with `bcrypt`
- JWT-based authentication
- Protected backend routes
- Create, view, update, and delete tasks
- Tasks scoped to the authenticated user only
- React dashboard with API integration
- Persistent frontend auth state with `localStorage`

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize
- JWT
- bcrypt

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Project Structure

```text
product-space/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
└── README.md
```

## User-Task Relationship

This project implements proper multi-user task ownership.

- Every task row has a required `userId`
- Tasks are created with the authenticated user's id
- Task listing is filtered by `userId`
- Task update and delete operations always query by both `id` and `userId`
- There are no global/shared tasks in the current implementation

## Prerequisites

Make sure these are installed:

- Node.js `18+`
- npm
- Docker Desktop or Docker Engine with Compose support

## Environment Variables

### Backend

Copy the backend example file:

```bash
cp backend/.env.example backend/.env
```

Backend environment variables:

```env
PORT=4000
NODE_ENV=development
JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CORS_ALLOWED_ORIGIN_PATTERNS=
CORS_CREDENTIALS=false
DATABASE_URL=
DB_SSL=false
DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=postgres
DB_LOGGING=false
```

### Frontend

Copy the frontend example file:

```bash
cp frontend/.env.example frontend/.env
```

Frontend environment variables:

```env
VITE_API_BASE_URL=http://127.0.0.1:4000/api
```

For production on Vercel, set it to your Render API URL, for example:

```env
VITE_API_BASE_URL=https://your-render-service.onrender.com/api
```

## Database Setup

This project uses Docker Compose for PostgreSQL.

Start the database:

```bash
docker compose up -d postgres
```

Check container status:

```bash
docker compose ps
```

Notes:

- PostgreSQL is exposed on host port `5433`
- Container port remains `5432`
- The backend is configured to connect to `127.0.0.1:5433`

## Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Run the backend in development mode:

```bash
npm run dev
```

Other backend commands:

```bash
npm run check
npm run build
npm run start
```

Backend base URL:

```text
 http://localhost:4000/
```

### Backend Architecture

The backend is organized by responsibility:

- `config/`: environment and database connection
- `config/cors.ts`: deployment-safe CORS allowlist configuration
- `controllers/`: thin HTTP handlers
- `services/`: business logic
- `models/`: Sequelize models and associations
- `routes/`: Express route definitions
- `middleware/`: auth, validation, and error handling
- `validators/`: request validation rules
- `utils/`: `ApiError`, `ApiResponse`, `asyncHandler`, JWT helpers

### Backend Flow

Request flow:

1. Route receives request
2. Validation middleware checks input
3. Auth middleware verifies JWT for protected routes
4. Controller calls service
5. Service performs database/business logic
6. Controller returns `ApiResponse`
7. Errors are handled centrally by error middleware

### Authentication API

#### `POST /api/auth/signup`

Request body:

```json
{
  "name": "Yuvraj",
  "email": "yuvraj@example.com",
  "password": "password123"
}
```

#### `POST /api/auth/login`

Request body:

```json
{
  "email": "yuvraj@example.com",
  "password": "password123"
}
```

#### `GET /api/auth/me`

Headers:

```text
Authorization: Bearer <jwt_token>
```

### Task API

All task routes require a valid JWT.

#### `GET /api/tasks`

Returns only the authenticated user's tasks.

#### `POST /api/tasks`

Request body:

```json
{
  "title": "Finish frontend",
  "description": "Connect dashboard to API"
}
```

#### `PATCH /api/tasks/:id`

Request body example:

```json
{
  "status": "Completed"
}
```

You can also update `title` and `description`.

#### `DELETE /api/tasks/:id`

Deletes only the authenticated user's task.

### Response Format

Successful responses use the shared `ApiResponse` shape:

```json
{
  "statusCode": 200,
  "message": "Tasks fetched successfully",
  "data": [],
  "success": true
}
```

Error responses are returned by centralized middleware and include `errors` when relevant.

## Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Other frontend commands:

```bash
npm run build
npm run preview
```

Frontend local URL:

```text
http://localhost:5173/
```

## Deployment

### Frontend on Vercel

Recommended Vercel project settings:

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Set this environment variable in Vercel:

```env
VITE_API_BASE_URL=https://your-render-service.onrender.com/api
```

`frontend/vercel.json` is included so React Router routes like `/login` and `/dashboard` rewrite to `index.html` correctly.

### Backend on Render

Recommended Render settings:

- Service type: `Web Service`
- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm run start`

A starter [render.yaml](/Users/yuvi/work/assignment/product-space/render.yaml) is included for the backend service.

Set these environment variables in Render:

```env
NODE_ENV=production
JWT_SECRET=your-secure-secret
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
DATABASE_URL=your-render-postgres-internal-url
DB_SSL=false
DB_LOGGING=false
CORS_ALLOWED_ORIGINS=https://your-vercel-project.vercel.app
CORS_ALLOWED_ORIGIN_PATTERNS=
CORS_CREDENTIALS=false
```

If you prefer separate variables instead of `DATABASE_URL`, you can still provide `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. On Render, `DATABASE_URL` using the internal Postgres URL is the simpler option.

### CORS Strategy

The backend no longer allows every origin.

- `CORS_ALLOWED_ORIGINS` is a comma-separated allowlist for exact frontend URLs
- `CORS_ALLOWED_ORIGIN_PATTERNS` allows suffix-based matches such as `.vercel.app`
- Requests without an `Origin` header, such as Postman or server-to-server calls, are still allowed

For stricter production security, prefer only exact origins in `CORS_ALLOWED_ORIGINS` and leave `CORS_ALLOWED_ORIGIN_PATTERNS` empty.

If you want Vercel preview deployments to work automatically, you can optionally set:

```env
CORS_ALLOWED_ORIGIN_PATTERNS=.vercel.app
```

That is more permissive, so use it only if you actually need preview-origin support.

## Frontend Architecture

Frontend folders:

- `components/`: reusable UI parts
- `pages/`: route-level screens
- `services/`: API-facing logic
- `context/`: auth state
- `hooks/`: custom hooks
- `lib/`: API client and local storage helpers
- `types/`: TypeScript interfaces

### Frontend Flow

1. User signs up or logs in
2. JWT and user data are stored in `localStorage`
3. `AuthContext` restores the session on reload
4. Protected routes redirect unauthenticated users
5. Dashboard fetches only the logged-in user's tasks
6. Task actions call backend APIs and update local state

### Frontend Pages

- `/login`: login screen
- `/signup`: registration screen
- `/dashboard`: protected task management dashboard

## How to Run the Full Project

### 1. Start PostgreSQL

```bash
docker compose up -d postgres
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

Visit:

```text
http://127.0.0.1:5173
```

## Verification

Completed during implementation:

- Backend typecheck with `npm run check`
- Backend production build with `npm run build`
- Frontend production build with `npm run build`
- Docker Compose validation with `docker compose config`
- Live backend verification for signup, login, task creation, task status update, task deletion, and multi-user task isolation

## Current Implementation Notes

- The backend currently uses `sequelize.sync()` on startup
- For a more production-ready setup, migrations should be added next
- Frontend state management uses React context plus local component state
- Task editing for title and description from the UI is not implemented yet, although backend support exists

## Suggested Next Improvements

- Add Sequelize migrations and seed scripts
- Add automated backend tests
- Add frontend toast notifications
- Add edit-task UI for title and description
- Add logout-on-401 handling in the frontend API client
