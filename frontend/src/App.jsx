import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import PendingPage from './pages/PendingPage.jsx'
import Completed from './pages/Completed.jsx'
import Profile from './components/Profile.jsx'

const App = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const handleAuthSubmit = data => {
    const user = {
      email: data.email,
      name: data.name || 'User',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name || 'User'
      )}&background=random`
    }
    setCurrentUser(user)
    navigate('/', { replace: true })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    navigate('/login', { replace: true })
  }

  // Protected layout wrapper
  const ProtectedLayout = () => {
    return (
      <Layout user={currentUser} onLogout={handleLogout}>
        <Outlet />
      </Layout>
    )
  }

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate('/signup')}
            />
          </div>
        }
      />

      {/* Signup route */}
      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SignUp
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate('/login')}
            />
          </div>
        }
      />

      <Route path='/pending' element={<PendingPage/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/profile' element={<Profile user={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout}/>}/>

      {/* Protected routes */}
      <Route
        element={
          currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="/" element={<div>Welcome, {currentUser?.name}!</div>} />
        
      </Route>
    </Routes>
  )
}

export default App
