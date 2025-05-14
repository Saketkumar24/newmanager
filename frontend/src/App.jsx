import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Signup from "./Pages/Signup.jsx"
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import ProjectsPage from './Pages/CreateProject.jsx'
import ProjectDetailPage from './Pages/ProjectDetailPage.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {
  const token = localStorage.getItem('token')

  return (
    <>
      <Navbar />
      <Routes>
        {token ? (
          <>
            <Route path='/projects' element={<Dashboard />} />
            <Route path="/create-project" element={<ProjectsPage />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="/" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App;
