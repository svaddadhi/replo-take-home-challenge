# Notion-like Block Editor

A simple block editor that supports text and image blocks with backend persistence.

## Quick Start

This application consists of two parts: a React frontend and an Express backend. You'll need to start both to use the application.

### Prerequisites

- Node.js (v16 or higher)
- npm

### Starting the Backend

```bash
cd server
npm install
npm start
```

The server will run on http://localhost:3001

### Starting the Frontend

In a new terminal:

```bash
# From the project root
npm install
npm run dev
```

The application will open at http://localhost:5173

## Features

- Create and edit text blocks (H1, H2, H3, paragraph)
- Create and edit image blocks with customizable dimensions
- Persistent storage using JSON file
- Real-time feedback with notifications

## Project Structure

- `/server` - Express backend with JSON file storage
- `/src/components` - React components
- `/src/store` - Data management
- `/src/types` - TypeScript type definitions

## Troubleshooting

- If you see connection errors, ensure both frontend and backend servers are running
- Check `server/data/blocks.json` exists and is writable
