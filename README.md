# ManageTask

A full-stack **Task Management System** built using React for the frontend and Node.js/Express for the backend.  
This project allows users to sign up, log in, create, edit, and manage their tasks efficiently.

---

## Features
- User authentication (Signup/Login)
- Dashboard for viewing pending and completed tasks
- Task creation, editing, and deletion
- User profile management
- Responsive UI with a modern design
- Separate views for pending and completed tasks

---

## Project Structure
```
Task_manager/
├── backend/           # Backend code (Node.js/Express)
├── frontend/          # Frontend code (React.js)
│   ├── components/    # Reusable React components
│   └── pages/         # Different app pages
└── README.md
```

---

## Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB instance running

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Task_manager
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables for MongoDB URI and authentication secrets.

4. Start the servers:
   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd backend
   npm start
   ```

---

## Usage
- Sign up as a new user and log in.
- Add, edit, or delete tasks.
- View tasks categorized as **Pending** or **Completed**.

---

## Screenshots
<img width="1902" height="884" alt="Dashboard png" src="https://github.com/user-attachments/assets/3c69aea6-3300-4720-9442-5e0f99948e1e" />
<img width="1919" height="875" alt="Login png" src="https://github.com/user-attachments/assets/4c0b0974-d1ee-4247-9e99-1856a94bfd27" />





