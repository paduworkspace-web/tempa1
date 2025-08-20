import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Phone, MessageSquare, X, CheckCircle, AlertCircle } from 'lucide-react';
import { therapyService } from '../../services/therapyService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';

const MyBookings = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, booking: null });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await therapyService.getUserBookings();
      setBookings(data);
    } catch (error) {
      showError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionIcon = (sessionType) => {
    switch (sessionType.toLowerCase()) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Phone className="h-5 w-5" />;
      case 'chat':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };

  const handleCancelBooking = async () => {
    try {
      await therapyService.cancelBooking(cancelModal.booking.id);
      showSuccess('Booking cancelled successfully');
      fetchBookings();
      setCancelModal({ isOpen: false, booking: null });
    } catch (error) {
      showError('Failed to cancel booking');
    }
  };

  const canCancelBooking = (booking) => {
    const bookingDateTime = new Date(`${booking.scheduledDate}T${booking.scheduledTime}`);
    const now = new Date();
    const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);
    
    return booking.status.toLowerCase() === 'confirmed' && hoursUntilBooking > 24;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your therapy sessions and appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 text-sm">
                    ({bookings.filter(b => b.status.toLowerCase() === status).length})
                  </span>
                )}
                {status === 'all' && (
                  <span className="ml-2 text-sm">({bookings.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {booking.therapist?.name?.split(' ').map(n => n[0]).join('') || 'T'}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.therapist?.name || 'Therapist'}
                          </h3>
                          <p className="text-gray-600">{booking.therapist?.credentials}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-2" />
                          <div>
                            <p className="font-medium">{formatDate(booking.scheduledDate)}</p>
                            <p className="text-sm">{formatTime(booking.scheduledTime)}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          {getSessionIcon(booking.sessionType)}
                          <div className="ml-2">
                            <p className="font-medium">{booking.sessionType} Session</p>
                            <p className="text-sm">${booking.price || 120}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {getStatusIcon(booking.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      {booking.status.toLowerCase() === 'confirmed' && (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                          Join Session
                        </button>
                      )}
                      
                      {canCancelBooking(booking) && (
                        <button
                          onClick={() => setCancelModal({ isOpen: true, booking })}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      )}

                      {booking.status.toLowerCase() === 'completed' && (
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>

                  {booking.status.toLowerCase() === 'pending' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Your booking is pending confirmation. You will receive an email once confirmed.
                      </p>
                    </div>
                  )}

                  {booking.status.toLowerCase() === 'confirmed' && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Your session is confirmed. You'll receive a reminder 24 hours before your appointment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't booked any therapy sessions yet."
                  : `You don't have any ${filter} bookings.`
                }
              </p>
              <button
                onClick={() => window.location.href = '/therapists'}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Session
              </button>
            </div>
          )}
        </div>

        {/* Cancel Booking Modal */}
        <Modal
          isOpen={cancelModal.isOpen}
          onClose={() => setCancelModal({ isOpen: false, booking: null })}
          title="Cancel Booking"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to cancel your session with{' '}
              <strong>{cancelModal.booking?.therapist?.name}</strong> on{' '}
              <strong>
                {cancelModal.booking && formatDate(cancelModal.booking.scheduledDate)} at{' '}
                {cancelModal.booking && formatTime(cancelModal.booking.scheduledTime)}
              </strong>?
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Cancellations must be made at least 24 hours in advance. You will receive a full refund.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCancelModal({ isOpen: false, booking: null })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyBookings;