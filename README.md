# Product Space Task Management

A full-stack SaaS task management application featuring JWT authentication and per-user task ownership.

## 🔹 Live Demo & Screenshots

**Live App:** [https://product-space-tawny.vercel.app](https://product-space-tawny.vercel.app)

**Demo Credentials:**
- **Email:** `test@test.com`
- **Password:** `123456`


## 🔹 Architecture & System Design

**JWT Authentication:**  
Users authenticate securely via JSON Web Tokens. Passwords are salted and hashed using `bcrypt` before ever reaching the database. Auth state is persisted in the frontend using `localStorage` alongside a custom React Context to secure protected routes.

**Multi-User Isolation:**  
All tasks are strictly scoped to the authenticated user. Every database query (Read, Update, Delete) enforces a strict check against the `userId` extracted from the validated JWT, preventing IDOR (Insecure Direct Object Reference) vulnerabilities and ensuring complete data privacy.

**Database Schema:**  
Built natively on PostgreSQL using the Sequelize ORM.
- **`Users` Table:** `id` (PK), `name`, `email` (Unique Index), `password`
- **`Tasks` Table:** `id` (PK), `title`, `description`, `status` (Enum: `Pending` | `Completed`), `userId` (FK -> Users.id)
- **Relationships:** 1-to-Many (`User` hasMany `Tasks`)

## 🔹 Features Implemented

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
