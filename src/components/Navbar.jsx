import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    window.addEventListener('storage', checkLoginStatus)
    checkLoginStatus()
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    setUsername('')
    setMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl md:text-2xl">✨</span>
        <span className="text-lg md:text-xl font-bold text-gray-800">SkinAnalyze</span>
      </Link>

      {/* Desktop Navigation */}
      {location.pathname === '/analyze' ? (
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium cursor-pointer hover:bg-green-500 rounded-lg px-3 py-2"
        >
          <span>←</span>
          Back
        </button>
      ) : (
        <>
          {/* Desktop Menu - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && location.pathname !== '/analyze' && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-50">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-gray-900 font-medium py-2"
            >
              Home
            </Link>
            <Link 
              to="/analyze" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-gray-900 font-medium py-2"
            >
              Analyze
            </Link>
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
              >
                Dashboard
              </Link>
            )}
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 text-md py-2">
                  Hi, {username}!
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 font-medium transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-gray-700 hover:text-gray-900 font-medium border-2 border-green-500 px-4 py-3 rounded-lg hover:bg-green-50 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar