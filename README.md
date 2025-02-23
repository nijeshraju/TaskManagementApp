# TaskManagementApp

**A simple node + react + mongoDB project for task management**

## Brief Description
This project using RESTful api design with mongoDB, Node.js and Reac.js.

## How to run backend server
**Navigate to server and install dependencies**
```bash
cd server
npm install
```

**Set Up Environment Variables:**
Create a .env file inside server/ and add the following
```bash
DB_URL=mongodb://localhost:27017/taskdb
PORT=8080
```
**run backend server**
```bash
npm run dev
```

## How to run frontend app
**Navigate to client and install dependencies**
```bash
cd client
npm install
```

**Set Up Environment Variables:**
Create a .env file inside server/ and add the following
```bash
BACKEND_URL=http://localhost:8080/api/task
```
**run backend server**
```bash
npm start
```