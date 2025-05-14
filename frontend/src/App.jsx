import { useState } from 'react'
import './App.css'
import { Routes } from "react-router-dom"
import Signup from "./Pages/Signup.jsx"
import { Route } from "react-router-dom"
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import ProjectsPage from './Pages/CreateProject.jsx'
import ProjectDetailPage from './Pages/ProjectDetailPage.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/projects' element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<ProjectsPage />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        <Route path="/" element={<ProjectDetailPage />} />
      </Routes>
    </>
  )
}

export default App;
