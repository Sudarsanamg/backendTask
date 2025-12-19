# Express.js Backend Project

A simple Express.js backend server with a clean project structure.

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

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Nodemon** - Development tool for auto-reloading

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
