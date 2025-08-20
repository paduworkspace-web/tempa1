import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Pages
import HomePage from './pages/common/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AboutPage from './pages/common/AboutPage';
import NotFoundPage from './pages/common/NotFoundPage';
import MeditationLibrary from './pages/meditation/MeditationLibrary';
import TherapistList from './pages/therapy/TherapistList';
import ForumHome from './pages/community/ForumHome';
import ChatbotPage from './pages/chatbot/ChatbotPage';
import ContactForm from './pages/contact/ContactForm';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/meditations" element={
              <ProtectedRoute>
                <MeditationLibrary />
              </ProtectedRoute>
            } />
            <Route path="/therapists" element={
              <ProtectedRoute>
                <TherapistList />
              </ProtectedRoute>
            } />
            <Route path="/forum" element={
              <ProtectedRoute>
                <ForumHome />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatbotPage />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<ContactForm />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
