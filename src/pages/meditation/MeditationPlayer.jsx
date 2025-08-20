import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Play, Pause, SkipBack, SkipForward, Heart, Share2, Download, Clock, Users } from 'lucide-react';
import { meditationService } from '../../services/meditationService';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const MeditationPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [meditation, setMeditation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [player, setPlayer] = useState(null);
  const [relatedMeditations, setRelatedMeditations] = useState([]);

  useEffect(() => {
    fetchMeditation();
    fetchRelatedMeditations();
  }, [id]);

  const fetchMeditation = async () => {
    try {
      const data = await meditationService.getMeditationById(id);
      setMeditation(data);
    } catch (error) {
      showError('Failed to load meditation');
      navigate('/meditations');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedMeditations = async () => {
    try {
      const data = await meditationService.getAllMeditations();
      setRelatedMeditations(data.filter(m => m.id !== parseInt(id)).slice(0, 4));
    } catch (error) {
      console.error('Failed to load related meditations');
    }
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const skipForward = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10);
    }
  };

  const skipBackward = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(Math.max(0, currentTime - 10));
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    showSuccess(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const shareVideo = async () => {
    try {
      await navigator.share({
        title: meditation.title,
        text: meditation.description,
        url: window.location.href
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meditation not found</h2>
          <button
            onClick={() => navigate('/meditations')}
            className="text-purple-600 hover:text-purple-500"
          >
            Back to library
          </button>
        </div>
      </div>
    );
  }

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Video Player */}
              <div className="relative bg-black">
                <YouTube
                  videoId={meditation.youtubeUrl}
                  opts={opts}
                  onReady={onReady}
                  onPlay={onPlay}
                  onPause={onPause}
                  className="w-full"
                />
              </div>

              {/* Custom Controls */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={skipBackward}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipBack className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={togglePlayPause}
                    className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={skipForward}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipForward className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Meditation Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {meditation.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {meditation.duration} minutes
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {meditation.views || 0} views
                      </div>
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {meditation.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorited 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={shareVideo}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {meditation.description}
                </p>

                {/* Benefits */}
                {meditation.benefits && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {meditation.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Sessions Completed</span>
                    <span>12/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Total Minutes</span>
                    <span>240</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Meditations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Meditations</h3>
              <div className="space-y-4">
                {relatedMeditations.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/meditations/${related.id}`)}
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${related.youtubeUrl}/mqdefault.jpg`}
                      alt={related.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {related.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {related.duration} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audio
                </button>
                <button
                  onClick={() => navigate('/meditations')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPlayer;