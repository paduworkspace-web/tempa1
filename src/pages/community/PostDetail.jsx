import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Flag, ArrowLeft, Send, Trash2, Edit } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchReplies();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await communityService.getPostById(id);
      setPost(data);
    } catch (error) {
      showError('Failed to load post');
      navigate('/forum');
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const data = await communityService.getReplies(id);
      setReplies(data);
    } catch (error) {
      console.error('Failed to load replies');
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSubmittingReply(true);
    try {
      await communityService.createReply(id, {
        content: replyText,
        authorId: user.id
      });
      setReplyText('');
      showSuccess('Reply posted successfully');
      fetchReplies();
    } catch (error) {
      showError('Failed to post reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      try {
        await communityService.deleteReply(replyId);
        showSuccess('Reply deleted successfully');
        fetchReplies();
      } catch (error) {
        showError('Failed to delete reply');
      }
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would make an API call
  };

  const sharePost = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Link copied to clipboard');
    }
  };

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <button
            onClick={() => navigate('/forum')}
            className="text-purple-600 hover:text-purple-500"
          >
            Back to forum
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/forum')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Forum
        </button>

        {/* Main Post */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {(post.author?.name || 'Anonymous').split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author?.name || 'Anonymous'}</h3>
                  <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt || new Date())}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {post.category || 'general'}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Flag className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="prose max-w-none text-gray-700">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{(post.likeCount || 0) + (isLiked ? 1 : 0)}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <MessageCircle className="h-5 w-5" />
                  <span>{replies.length}</span>
                </div>
              </div>

              <button
                onClick={sharePost}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Reply</h3>
          <form onSubmit={handleSubmitReply}>
            <div className="mb-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Share your thoughts or offer support..."
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Be respectful and supportive in your response.
              </p>
              <button
                type="submit"
                disabled={submittingReply || !replyText.trim()}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingReply ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {submittingReply ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Replies ({replies.length})
          </h3>
          
          {replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {(reply.author?.name || 'Anonymous').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-900 mr-2">
                          {reply.author?.name || 'Anonymous'}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(reply.createdAt || new Date())}
                        </span>
                      </div>
                      <div className="text-gray-700">
                        {reply.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {user && reply.author?.id === user.id && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No replies yet</h4>
              <p className="text-gray-600">Be the first to share your thoughts and support!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;