# Todo List App

A full-stack todo list application with a beautiful animated gradient UI.

## Features
- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Beautiful animated gradient background
- ✅ Smooth animations and hover effects

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../todolist
npm install
```

## Running the App

1. Start MongoDB (open MongoDB Compass or run `mongod`)

2. Start the backend server
```bash
cd server
npm start
```

3. Start the frontend (in a new terminal)
```bash
cd todolist
npm run dev
```

4. Open http://localhost:5173 in your browser

## API Endpoints
- `GET /get` - Get all todos
- `POST /add` - Add a new todo
- `PUT /update/:id` - Toggle todo completion
- `DELETE /delete/:id` - Delete a todo
