# Personal Task Manager

A full-featured Task Tracker web app built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with JWT authentication. It allows users to manage multiple projects (max 4), create tasks inside them, track task status, and more — all from a clean dashboard.

🔗 **Live Website:** [https://newmanager-ltj2.vercel.app/](https://newmanager-ltj2.vercel.app/)






- 🔐 Secure JWT-based user authentication
- 👤 User profile view
- 📁 Max 4 projects per user
- ✅ Add, update, delete tasks within projects
- 📊 Task status: Pending / In Progress / Completed
- 📅 Created and Completed timestamps
- 🖥️ Responsive UI
- ⚙️ Modular backend structure with proper MVC pattern

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, TailwindCSS, React Router, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (LocalStorage)
- **Hosting:** Vercel (Frontend), Render (Backend suggested)

---

## 📂 Project Structure

root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── public/
└── README.md


---

## 🧪 Getting Started (Run Locally)

### 📌 Prerequisites

- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- Git

---

Starting the server and the frontend application:

### 🔧 1. Clone the Repo

```bash
git clone https://github.com/Saketkumar24/newmanager.git
cd newmanager



2. Setup Backend

cd backend
npm install


3. Create a .env file in /backend:

PORT=3001
MONGO_URI=your_mongodb_connection_uri(Create using MongoDB Atlas by getting logged in through google account)
JWT_SECRET=your_jwt_secret(anythingyoucankeep)

4.Start Backend Server:

nodemon index.js

3. Setup Frontend

cd ../frontend
npm install


▶️ Start Frontend:

npm run dev
