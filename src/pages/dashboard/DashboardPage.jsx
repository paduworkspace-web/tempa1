import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  MessageCircle, 
  Brain, 
  Users, 
  TrendingUp,
  Clock,
  Heart,
  BookOpen
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSessions: 0,
    upcomingBookings: 0,
    forumPosts: 0,
    chatMessages: 0
  });

  useEffect(() => {
    // Fetch user statistics
    // This would be replaced with actual API calls
    setStats({
      totalSessions: 12,
      upcomingBookings: 2,
      forumPosts: 5,
      chatMessages: 23
    });
  }, []);

  const quickActions = [
    {
      title: 'Start Meditation',
      description: 'Begin your mindfulness journey',
      icon: Brain,
      link: '/meditations',
      color: 'bg-purple-500'
    },
    {
      title: 'Book Therapy',
      description: 'Schedule a session with a therapist',
      icon: Calendar,
      link: '/therapists',
      color: 'bg-blue-500'
    },
    {
      title: 'Join Community',
      description: 'Connect with others in the forum',
      icon: Users,
      link: '/forum',
      color: 'bg-green-500'
    },
    {
      title: 'AI Support',
      description: 'Chat with our AI assistant',
      icon: MessageCircle,
      link: '/chat',
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      type: 'meditation',
      title: 'Completed "Morning Mindfulness"',
      time: '2 hours ago',
      icon: Brain
    },
    {
      type: 'booking',
      title: 'Therapy session with Dr. Smith',
      time: 'Tomorrow at 2:00 PM',
      icon: Calendar
    },
    {
      type: 'forum',
      title: 'Posted in "Anxiety Support"',
      time: '1 day ago',
      icon: MessageCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your mental wellness dashboard. How are you feeling today?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Forum Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.forumPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chat Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.chatMessages}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 group"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                        {action.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t">
                <Link
                  to="/profile"
                  className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                >
                  View all activity →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wellness Tips */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">Daily Wellness Tip</h2>
            </div>
            <p className="text-lg">
              "Take a few minutes today to practice deep breathing. It can help reduce stress and improve your focus."
            </p>
            <div className="mt-4">
              <Link
                to="/meditations"
                className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Try a breathing exercise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;