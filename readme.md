# 📋 Personal Task Manager

Personal Task Manager is a full-stack task tracking application built with React (Vite + Tailwind CSS) on the frontend and Node.js + Express on the backend. MongoDB is used as the database. It allows users to create up to 4 projects, manage tasks with status updates, and track completion efficiently.

---

## 🚀 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React Icons

### Backend
- Node.js
- Express.js
- Mongoose

### Others
- dotenv
- cookie-parser
- cors
- jsonwebtoken (JWT)

---

## 📁 Project Structure
```
task-manager/
├── backend/ # Express backend
│ └── .env # Backend environment variables
└── frontend/ # React frontend with Vite + Tailwind
└── .env # Frontend environment variables
```

---

## ✅ Prerequisites

- Node.js (v16 or later)
- MongoDB (Local or Atlas)
- Git

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/Saketkumar24/newmanager.git
cd newmanager
```
2. Backend Setup
```
cd backend
npm install
```
3. Create a .env file inside the backend folder:
```
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Start the backend server:
```
npm run dev
```
5. Frontend Setup
```
cd ../frontend
npm install
Create a .env file inside the frontend folder:
env
VITE_API_URL=http://localhost:3001
Note: All frontend environment variables must be prefixed with VITE_ (required by Vite).

Start the frontend development server:
npm run dev
```
🌐 URLs
Frontend: http://localhost:5173

Backend API: http://localhost:3001

Live Website: https://newmanager-ltj2.vercel.app/

📬 Support
If you encounter any issues or have questions, feel free to open an issue or reach out.
Email:
```
saketchaudhary170@gmail.com
```
📄 License
This project is open-source and available under the MIT License.



---