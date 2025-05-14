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

task-manager/
├── backend/ # Express backend
│ └── .env # Backend environment variables
└── frontend/ # React frontend with Vite + Tailwind
└── .env # Frontend environment variables

yaml
Copy
Edit

---

## ✅ Prerequisites

- Node.js (v16 or later)
- MongoDB (Local or Atlas)
- Git

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Saketkumar24/newmanager.git
cd newmanager
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside the backend folder:

env
Copy
Edit
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
Copy
Edit
npm run dev
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Create a .env file inside the frontend folder:

env
Copy
Edit
VITE_API_URL=http://localhost:3001
Note: All frontend environment variables must be prefixed with VITE_ (required by Vite).

Start the frontend development server:

bash
Copy
Edit
npm run dev
🌐 URLs
Frontend: http://localhost:5173

Backend API: http://localhost:3001

Live Website: https://newmanager-ltj2.vercel.app/

📬 Support
If you encounter any issues or have questions, feel free to open an issue or reach out.

📄 License
This project is open-source and available under the MIT License.

yaml
Copy
Edit

---

---

Let me know if you want this in a downloadable `.md` file, or if you want to include screenshot links, `.env.example` files, or deployment steps for Render or Vercel.

