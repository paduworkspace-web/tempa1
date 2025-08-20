import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft, Send, AlertTriangle } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const schema = yup.object({
  title: yup.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters').required('Title is required'),
  content: yup.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content must be less than 5000 characters').required('Content is required'),
  category: yup.string().required('Category is required'),
  isAnonymous: yup.boolean()
});

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();

  const categories = [
    { value: 'anxiety', label: 'Anxiety Support', description: 'Share experiences and coping strategies for anxiety' },
    { value: 'depression', label: 'Depression Support', description: 'Support and understanding for depression' },
    { value: 'stress', label: 'Stress Management', description: 'Tips and techniques for managing stress' },
    { value: 'relationships', label: 'Relationships', description: 'Discuss relationship challenges and advice' },
    { value: 'self-care', label: 'Self-Care', description: 'Share self-care practices and wellness tips' },
    { value: 'success-stories', label: 'Success Stories', description: 'Celebrate progress and achievements' },
    { value: 'general', label: 'General Discussion', description: 'Open discussion about mental health topics' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isAnonymous: false
    }
  });

  const watchedContent = watch('content', '');
  const watchedCategory = watch('category');

  const onSubmit = async (data) => {
    try {
      const postData = {
        title: data.title,
        content: data.content,
        category: data.category,
        authorId: data.isAnonymous ? null : user.id,
        isAnonymous: data.isAnonymous
      };

      const response = await communityService.createPost(postData);
      showSuccess('Post created successfully!');
      navigate(`/forum/${response.id}`);
    } catch (error) {
      showError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/forum')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Forum
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your thoughts, experiences, or ask for support from the community.</p>
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Community Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be respectful and supportive to all community members</li>
                <li>• Share your experiences to help others, but avoid giving medical advice</li>
                <li>• Use trigger warnings when discussing sensitive topics</li>
                <li>• Keep posts relevant to mental health and wellness</li>
                <li>• Report any inappropriate content to moderators</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Create Post Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a Category
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      watchedCategory === category.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      {...register('category')}
                      type="radio"
                      value={category.value}
                      className="sr-only"
                    />
                    <span className="font-semibold text-gray-900 mb-1">{category.label}</span>
                    <span className="text-sm text-gray-600">{category.description}</span>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Post Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="What would you like to discuss?"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Post Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                {...register('content')}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Share your thoughts, experiences, or questions. Remember to be respectful and supportive..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content.message}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {watchedContent.length}/5000 characters
                </p>
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  {...register('isAnonymous')}
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Post anonymously (your username will not be shown)
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                Anonymous posts help maintain privacy while still allowing you to share and receive support.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate('/forum')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Post...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Post
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Support Resources */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Need Immediate Support?</h3>
          <p className="mb-4 opacity-90">
            If you're experiencing a mental health crisis, please reach out for immediate help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Crisis Hotlines:</p>
              <p>National Suicide Prevention Lifeline: 988</p>
              <p>Crisis Text Line: Text HOME to 741741</p>
            </div>
            <div>
              <p className="font-semibold">Emergency:</p>
              <p>Call 911 for immediate emergency assistance</p>
              <p>Go to your nearest emergency room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;