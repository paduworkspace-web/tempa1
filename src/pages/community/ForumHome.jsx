import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Clock, Plus, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { communityService } from '../../services/communityService';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ForumHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { showError } = useNotification();

  const categories = ['all', 'anxiety', 'depression', 'support', 'success-stories', 'general'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await communityService.getAllPosts();
      setPosts(data);
    } catch (error) {
      showError('Failed to load forum posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Community Forum
            </h1>
            <p className="text-xl text-gray-600">
              Connect, share, and support each other on your mental health journey.
            </p>
          </div>
          <Link
            to="/create-post"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-3">
                        {post.category || 'general'}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimeAgo(post.createdAt || new Date())}
                      </div>
                    </div>
                    
                    <Link to={`/forum/${post.id}`} className="block">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.replyCount || 0} replies
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likeCount || 0} likes
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {post.views || 0} views
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                          {(post.author?.name || 'Anonymous').split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{post.author?.name || 'Anonymous'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">Be the first to start a conversation!</p>
            <Link
              to="/create-post"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumHome;