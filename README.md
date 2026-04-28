# Product Space Task Management

A full-stack SaaS task management application featuring JWT authentication and per-user task ownership.

## Features Implemented

- **Authentication System**: User signup, login, and secure session management using JWT.
- **Security**: Password hashing with `bcrypt` and protected backend routes.
- **Task Management**: Full CRUD operations (Create, View, Update, Delete) for tasks.
- **Data Isolation**: Tasks are strictly scoped to the authenticated user.
- **Frontend Dashboard**: Responsive React interface with persistent authentication state via `localStorage`.
- **CORS Protection**: Configured securely to strictly allow specific production frontend domains.

## Tech Stack Used

**Backend:**
- Node.js & Express.js
- TypeScript
- PostgreSQL & Sequelize (ORM)
- JWT (JSON Web Tokens)
- bcrypt

**Frontend:**
- React (with hooks & Context API)
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Infrastructure:**
- Docker & Docker Compose (for local database)
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

## Setup Steps

Follow these instructions to run the application locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- npm
- Docker Desktop (or Docker Engine with Compose)

### 2. Database Setup
Start the local PostgreSQL database using Docker Compose:
```bash
docker compose up -d postgres
```

### 3. Backend Setup
Configure and start the Node.js backend:
```bash
cd backend
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
```
*The backend will run on `http://localhost:4000`.*

### 4. Frontend Setup
In a new terminal window, configure and start the React frontend:
```bash
cd frontend
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend will run on `http://localhost:5173/`.*

### 5. Access the App
Open your browser and navigate to `http://localhost:5173/` to use the application!
