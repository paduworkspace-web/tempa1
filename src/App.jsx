import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Pages
import HomePage from './pages/common/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ServicesPage from './pages/services/ServicesPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProfilePage from './pages/auth/ProfilePage';
import MeditationPlayer from './pages/meditation/MeditationPlayer';
import MeditationManager from './pages/meditation/MeditationManager';
import AboutPage from './pages/common/AboutPage';
import NotFoundPage from './pages/common/NotFoundPage';
import MeditationLibrary from './pages/meditation/MeditationLibrary';
import TherapistList from './pages/therapy/TherapistList';
import BookingForm from './pages/therapy/BookingForm';
import MyBookings from './pages/therapy/MyBookings';
import ForumHome from './pages/community/ForumHome';
import PostDetail from './pages/community/PostDetail';
import CreatePost from './pages/community/CreatePost';
import ChatbotPage from './pages/chatbot/ChatbotPage';
import ContactForm from './pages/contact/ContactForm';
import ContactManager from './pages/contact/ContactManager';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
            </Route>
            
            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="meditations" element={
                <ProtectedRoute>
                  <MeditationLibrary />
                </ProtectedRoute>
              } />
              <Route path="meditations/:id" element={
                <ProtectedRoute>
                  <MeditationPlayer />
                </ProtectedRoute>
              } />
              <Route path="therapists" element={
                <ProtectedRoute>
                  <TherapistList />
                </ProtectedRoute>
              } />
              <Route path="book-therapy/:therapistId" element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              } />
              <Route path="my-bookings" element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } />
              <Route path="forum" element={
                <ProtectedRoute>
                  <ForumHome />
                </ProtectedRoute>
              } />
              <Route path="forum/:id" element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              } />
              <Route path="create-post" element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />
              <Route path="chat" element={
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              } />
              <Route path="contact" element={<ContactForm />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="admin/meditations" element={
                <AdminRoute>
                  <MeditationManager />
                </AdminRoute>
              } />
              <Route path="admin/contacts" element={
                <AdminRoute>
                  <ContactManager />
                </AdminRoute>
              } />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
