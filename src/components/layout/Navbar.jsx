import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showNotification('Logged out successfully', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Error logging out', 'error');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mantra
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                About
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/meditations" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Meditations
                  </Link>
                  <Link to="/therapists" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Therapy
                  </Link>
                  <Link to="/my-bookings" className="text-gray-700 hover:text-purple-600 transition-colors">
                    My Bookings
                  </Link>
                  <Link to="/forum" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Community
                  </Link>
                  <Link to="/chat" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Chat
                  </Link>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-md rounded-lg mt-2 p-4 border border-white/20">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Services
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                  About
                </Link>
                
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/meditations" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Meditations
                    </Link>
                    <Link to="/therapists" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Therapy
                    </Link>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-purple-600 transition-colors">
                      My Bookings
                    </Link>
                    <Link to="/forum" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Community
                    </Link>
                    <Link to="/chat" className="text-gray-700 hover:text-purple-600 transition-colors">
                      Chat
                    </Link>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 mb-2">Welcome, {user.name}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsRegisterOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;