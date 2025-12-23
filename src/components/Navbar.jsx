import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  // Check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')
    
    if (token && savedUsername) {
      setIsLoggedIn(true)
      setUsername(savedUsername)
    } else {
      setIsLoggedIn(false)
      setUsername('')
    }
  }

  useEffect(() => {
    checkLoginStatus()
    
    // Listen for storage changes (when login/logout happens)
    window.addEventListener('storage', checkLoginStatus)
    
    // Also check on every route change
    checkLoginStatus()
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [location]) // Add location as dependency

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
    navigate('/')
  }

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">✨</span>
        <span className="text-xl font-bold text-gray-800">SkinAnalyze</span>
      </Link>

      {location.pathname === '/analyze' ? (
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium cursor-pointer hover:bg-green-500 rounded-lg px-3 py-2"
        >
          <span>←</span>
          Back
        </button>
      ) : (
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link to="/analyze" className="text-gray-700 hover:text-gray-900 font-medium">
            Analyze
          </Link>
          
          {isLoggedIn && (
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <span className="text-gray-700 text-md">
                Hi, {username}!
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-gray-900 font-medium border-2 border-green-500 px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar