import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalBookings: 0,
    totalPosts: 0,
    totalMeditations: 0,
    pendingContacts: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useNotification();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentActivity()
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (error) {
      showError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+8%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      change: '+15%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Forum Posts',
      value: stats.totalPosts,
      change: '+5%',
      changeType: 'positive',
      icon: MessageCircle,
      color: 'bg-orange-500'
    },
    {
      title: 'Meditations',
      value: stats.totalMeditations,
      change: '+3%',
      changeType: 'positive',
      icon: Brain,
      color: 'bg-pink-500'
    },
    {
      title: 'Pending Contacts',
      value: stats.pendingContacts,
      change: '-2%',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage your mental health platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'booking' ? 'bg-purple-100' :
                      activity.type === 'post' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'booking' && <Calendar className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'post' && <MessageCircle className="h-4 w-4 text-orange-600" />}
                      {activity.type === 'other' && <Activity className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                )) : (
                  // Mock data for demonstration
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New user registered</p>
                        <p className="text-sm text-gray-500">Sarah Johnson joined the platform</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-purple-100">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Therapy session booked</p>
                        <p className="text-sm text-gray-500">Session with Dr. Smith scheduled</p>
                        <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-orange-100">
                        <MessageCircle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New forum post</p>
                        <p className="text-sm text-gray-500">Post in "Anxiety Support" category</p>
                        <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Manage Users</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Brain className="h-8 w-8 text-purple-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Add Meditation</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-8 w-8 text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">View Contacts</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-8 w-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900">View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Database</p>
                  <p className="text-sm text-gray-500">Operational</p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">API Services</p>
                  <p className="text-sm text-gray-500">All systems running</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Backup</p>
                  <p className="text-sm text-gray-500">Last backup: 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;