import React, { useState, useEffect } from 'react';
import { Play, Clock, Users, Search, Filter } from 'lucide-react';
import { meditationService } from '../../services/meditationService';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const MeditationLibrary = () => {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const { showError } = useNotification();

  const categories = ['all', 'mindfulness', 'sleep', 'anxiety', 'focus', 'stress-relief'];
  const durations = ['all', '5-10 min', '10-20 min', '20-30 min', '30+ min'];

  useEffect(() => {
    fetchMeditations();
  }, []);

  const fetchMeditations = async () => {
    try {
      const data = await meditationService.getAllMeditations();
      setMeditations(data);
    } catch (error) {
      showError('Failed to load meditations');
    } finally {
      setLoading(false);
    }
  };

  const filteredMeditations = meditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || meditation.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === '5-10 min' && meditation.duration <= 10) ||
                           (selectedDuration === '10-20 min' && meditation.duration > 10 && meditation.duration <= 20) ||
                           (selectedDuration === '20-30 min' && meditation.duration > 20 && meditation.duration <= 30) ||
                           (selectedDuration === '30+ min' && meditation.duration > 30);
    
    return matchesSearch && matchesCategory && matchesDuration;
  });

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meditation Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover guided meditations to help you find peace, reduce stress, and improve your mental well-being.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search meditations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {durations.map(duration => (
                  <option key={duration} value={duration}>
                    {duration === 'all' ? 'All Durations' : duration}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Meditation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeditations.map((meditation) => (
            <div key={meditation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${meditation.youtubeUrl}/maxresdefault.jpg`}
                  alt={meditation.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                    <Play className="h-6 w-6 text-purple-600" />
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {meditation.duration} min
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {meditation.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {meditation.views || 0}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {meditation.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {meditation.description}
                </p>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center">
                  <Play className="h-4 w-4 mr-2" />
                  Start Meditation
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMeditations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meditations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationLibrary;