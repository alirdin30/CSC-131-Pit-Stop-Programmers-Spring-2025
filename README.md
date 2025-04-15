# Pit Stop Programmers - Car Maintenance & Repair Management System

## 📌 Overview

The **Car Maintenance & Repair Management System** is a digital platform designed to streamline car repair and maintenance services. It allows customers to schedule services, track their vehicle's progress, and receive updates. Employees can manage assigned jobs and update service statuses, while admins oversee operations, track performance metrics, and manage employees.

## 📖 Table of Contents

- [Features](#features)
- [User Roles](#user-roles)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Running the Application](#running-the-application)

## ✨ Features

✅ Online service scheduling  
✅ Real-time service tracking  
✅ Employee work-hour logging  
✅ Admin dashboard for revenue and employee management  
✅ Automated email notifications for service updates

## 👥 User Roles

- **Admin**: Manages operations, tracks revenue, and oversees employees
- **Employee**: Logs hours, updates service progress, and manages assigned jobs
- **Customer**: Schedules services, tracks repair progress, and manages service history

## 🛠 System Requirements

- Node.js (v16+)
- MongoDB
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/alirdin30/CSC-131-Pit-Stop-Programmers-Spring-2025.git
cd CSC-131-Pit-Stop-Programmers-Spring-2025
```

### 2. Set Up MongoDB

1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service

```bash
sudo service mongod start
```

### 3. Set Up Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

### 4. Set Up Frontend Client

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 💻 Development Setup

The project is structured into three main parts:

- `client/`: React frontend built with Vite
- `server/`: Express.js backend API
- MongoDB database

### Environment Setup

1. Backend runs on port 5000
2. Frontend development server runs on port 5173
3. MongoDB runs on default port 27017

### Available Scripts

In the server directory:

- `npm start`: Start the backend server
- `npm run dev`: Start the server with nodemon for development

In the client directory:

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## 🏃‍♂️ Running the Application

### 1. Start MongoDB (WSL)

```bash
sudo service mongod start
```

### 2. Start Backend Server

```bash
cd server
npm start
```

### 3. Start Frontend Development Server

```bash
cd client
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Database: mongodb://localhost:27017/pitstop_db

## 🔧 Troubleshooting

- If MongoDB fails to start, check its status with:
  ```bash
  sudo service mongod status
  ```
- If the backend can't connect to MongoDB, ensure the MongoDB service is running
- For frontend development issues, check the Vite development server logs
