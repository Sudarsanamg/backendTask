# Express.js Backend Project

A simple Express.js backend server with a clean project structure.


## Live URL 

https://backendtask-6wg6.onrender.com

## Project Structure

```
backendTask/
├── server.js           # Main server file
├── routes/             # API routes
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
│   └── logger.js       # Request logging middleware
├── package.json        # Project dependencies
└── .gitignore         # Git ignore file
```

## Installation

Install dependencies:

```bash
npm install
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Available Endpoints

- `GET /` - Returns a Hello World message
- `GET /health` - Health check endpoint

## API Documentation

All protected endpoints require the header: `Authorization: Bearer <accessToken>`.


##Sample API routes
1. POST /api/auth/register - User registration
2. POST /api/auth/login - User login
3. GET /api/auth/me - Get current user info (protected)
4. POST /api/auth/logout - Logout 
5. GET /api/tasks - Get user's tasks (with filters)
6. POST /api/tasks - Create a new task
7. GET /api/tasks/:id - Get single task
8. PUT /api/tasks/:id - Update task
9. DELETE /api/tasks/:id - Delete task
10. PUT /api/tasks/:id/status - Update task status
11. PUT /api/tasks/:id/priority - Update task priority
12. GET /api/categories - Get user's categories
13. POST /api/categories - Create category
14. DELETE /api/categories/:id - Delete category




## Technologies Used

- **Express.js** - Web framework for Node.js
- **Nodemon** - Development tool for auto-reloading

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
