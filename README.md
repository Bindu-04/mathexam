# AI Math Exam Generator

A simple web application that helps primary school math teachers generate custom math exam papers using AI.

## Prerequisites

- Node.js (version 20 or higher)
- npm package manager
- Google Gemini API key

## Setup Instructions

### 1. Configure Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your API key to the `.env` file:
   ```bash
   # Replace YOUR_ACTUAL_API_KEY_HERE with your real Gemini API key
   GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   PORT=3001
   ```

### 2. Configure Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## How to Start the Application

### Start Backend Server (Port 3001)

```bash
cd backend
npm start
```

You should see:
```
Server is running on port 3001
API available at http://localhost:3001
```

### Start Frontend Server (Port 3000)

Open a **new terminal window** and run:

```bash
cd frontend
npm start
```

Your browser will automatically open to `http://localhost:3000`

### Quick Start (Both Servers)

```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

## How to Stop the Application

- Press `Ctrl + C` in each terminal window
- Or kill all processes: `kill -9 $(lsof -ti:3000,3001)`

## Usage

1. Open your browser to `http://localhost:3000`
2. Enter a math topic (e.g., "Addition", "Fractions")
3. Select the number of questions
4. Check "Include Answers" if you want the answer key
5. Click "Generate Exam"
6. Copy the generated exam to clipboard or generate a new one
