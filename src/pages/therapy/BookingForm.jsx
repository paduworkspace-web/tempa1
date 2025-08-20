import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar, Clock, User, CreditCard, CheckCircle } from 'lucide-react';
import { therapyService } from '../../services/therapyService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const schema = yup.object({
  sessionType: yup.string().required('Session type is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  notes: yup.string().max(500, 'Notes must be less than 500 characters'),
  emergencyContact: yup.string(),
  paymentMethod: yup.string().required('Payment method is required')
});

const BookingForm = () => {
  const { therapistId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [therapist, setTherapist] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sessionType: 'video',
      paymentMethod: 'card'
    }
  });

  const watchedDate = watch('date');

  useEffect(() => {
    fetchTherapist();
  }, [therapistId]);

  useEffect(() => {
    if (watchedDate) {
      fetchAvailableSlots(watchedDate);
    }
  }, [watchedDate]);

  const fetchTherapist = async () => {
    try {
      const data = await therapyService.getTherapistById(therapistId);
      setTherapist(data);
    } catch (error) {
      showError('Failed to load therapist information');
      navigate('/therapists');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const slots = await therapyService.getAvailableSlots(therapistId, date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Failed to load available slots');
      setAvailableSlots([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        therapistId: parseInt(therapistId),
        userId: user.id,
        sessionType: data.sessionType,
        scheduledDate: data.date,
        scheduledTime: data.time,
        notes: data.notes,
        emergencyContact: data.emergencyContact,
        paymentMethod: data.paymentMethod,
        status: 'PENDING'
      };

      await therapyService.bookSession(bookingData);
      showSuccess('Session booked successfully! You will receive a confirmation email shortly.');
      navigate('/my-bookings');
    } catch (error) {
      showError('Failed to book session. Please try again.');
    }
  };

  const sessionTypes = [
    { value: 'video', label: 'Video Call', price: 120, description: 'Face-to-face video session' },
    { value: 'audio', label: 'Audio Call', price: 100, description: 'Voice-only session' },
    { value: 'chat', label: 'Text Chat', price: 80, description: 'Text-based session' }
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'insurance', label: 'Insurance', icon: CheckCircle }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Therapist not found</h2>
          <button
            onClick={() => navigate('/therapists')}
            className="text-purple-600 hover:text-purple-500"
          >
            Back to therapists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {therapist.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">Book Session with {therapist.name}</h1>
              <p className="text-gray-600">{therapist.credentials}</p>
              <div className="flex items-center mt-2">
                {therapist.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Session Details</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Schedule</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Session Details */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Session Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {sessionTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      watch('sessionType') === type.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      {...register('sessionType')}
                      type="radio"
                      value={type.value}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{type.label}</span>
                      <span className="text-lg font-bold text-purple-600">${type.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any specific topics or concerns you'd like to discuss..."
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Next: Schedule
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Select Date
                  </label>
                  <input
                    {...register('date')}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Available Times
                  </label>
                  {watchedDate ? (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {availableSlots.length > 0 ? (
                        availableSlots.map((slot) => (
                          <label
                            key={slot}
                            className={`flex items-center justify-center p-2 border rounded cursor-pointer transition-all ${
                              watch('time') === slot
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              {...register('time')}
                              type="radio"
                              value={slot}
                              className="sr-only"
                            />
                            {slot}
                          </label>
                        ))
                      ) : (
                        <p className="col-span-2 text-gray-500 text-center py-4">
                          No available slots for this date
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">Please select a date first</p>
                  )}
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact (Optional)
                </label>
                <input
                  {...register('emergencyContact')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Emergency contact name and phone number"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!watch('date') || !watch('time')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.value}
                    className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      watch('paymentMethod') === method.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value={method.value}
                      className="sr-only"
                    />
                    <method.icon className="h-6 w-6 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Therapist:</span>
                    <span className="font-medium">{therapist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Type:</span>
                    <span className="font-medium">
                      {sessionTypes.find(t => t.value === watch('sessionType'))?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{watch('date')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{watch('time')}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${sessionTypes.find(t => t.value === watch('sessionType'))?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;