# Node.js To-Do List Backend

## Project Features

- User registration & login (JWT, bcrypt)
- CRUD for tasks (title, description, due date, status, category)
- Filter and search tasks by status, category, or date
- Atomic status updates
- Postman collection included

## Setup

1. Install dependencies:
npm install

2. Configure `.env` with your MongoDB URI and JWT secret.
3. Start server:
node server.js

4. API Endpoints

See controllers/routes for:
- `/api/auth/register` (POST)
- `/api/auth/login` (POST)
- `/api/tasks` (GET, POST)
- `/api/tasks/:taskId` (GET, PUT, DELETE)
- `/api/tasks/search` (GET)
- `/api/tasks/category/:category` (GET)
- `/api/tasks/:taskId/markCompleted` (POST)
- `/api/tasks/:taskId/markPending` (POST)


