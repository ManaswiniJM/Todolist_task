# Node.js To-Do List Backend

## Project Features
- User registration & login (JWT, bcrypt)
- CRUD for tasks (title, description, due date, status, category)
- Filter and search tasks by status, category, or date
- Atomic status updates (mark completed/pending)
- Postman collection included for testing

## Setup

1. **Install dependencies**  
   
   npm install

2. Configure `.env` with your MongoDB URI and JWT secret.
3. Start the server:
   node server.js

4. Import the Postman collection (in `TodoList_API.postman_collection.json`) to test endpoints.

## API Endpoints

Auth

POST /api/auth/register – Register new user

POST /api/auth/login – Login and get JWT

Tasks

GET /api/tasks – Get all tasks

POST /api/tasks – Create a new task

GET /api/tasks/:taskId – Get task by ID

PUT /api/tasks/:taskId – Update task by ID

DELETE /api/tasks/:taskId – Delete task by ID

Task Utilities

GET /api/tasks/search – Search tasks by title/description

GET /api/tasks/category/:category – Get tasks by category

POST /api/tasks/:taskId/markCompleted – Mark task as completed

POST /api/tasks/:taskId/markPending – Mark task as pending

