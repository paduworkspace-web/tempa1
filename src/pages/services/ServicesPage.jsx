import React, { useState } from 'react';
import { Brain, Users, MessageCircle, Calendar, Heart, Shield, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ServicesPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 'meditation',
      title: 'Guided Meditation',
      icon: Brain,
      description: 'Find peace and mindfulness through our extensive library of guided meditation sessions.',
      features: [
        'Over 100+ guided meditation sessions',
        'Various categories: anxiety, sleep, focus, stress relief',
        'Duration options from 5 to 60 minutes',
        'Progress tracking and streaks',
        'Offline download capability'
      ],
      benefits: [
        'Reduced stress and anxiety',
        'Improved sleep quality',
        'Enhanced focus and concentration',
        'Better emotional regulation'
      ],
      link: '/meditations',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'therapy',
      title: 'Professional Therapy',
      icon: Users,
      description: 'Connect with licensed therapists for personalized mental health support.',
      features: [
        'Licensed and certified therapists',
        'Various specializations available',
        'Flexible scheduling options',
        'Video, audio, or text sessions',
        'Secure and confidential platform'
      ],
      benefits: [
        'Professional mental health support',
        'Personalized treatment plans',
        'Convenient online sessions',
        'Improved coping strategies'
      ],
      link: '/therapists',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'community',
      title: 'Community Support',
      icon: MessageCircle,
      description: 'Join a supportive community of individuals on similar mental health journeys.',
      features: [
        'Safe and moderated discussion forums',
        'Topic-specific support groups',
        'Anonymous posting options',
        'Peer support and encouragement',
        'Expert-moderated discussions'
      ],
      benefits: [
        'Reduced feelings of isolation',
        'Shared experiences and insights',
        'Peer support and encouragement',
        'Access to diverse perspectives'
      ],
      link: '/forum',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'ai-support',
      title: 'AI Mental Health Assistant',
      icon: MessageCircle,
      description: '24/7 AI-powered support for immediate mental health guidance and resources.',
      features: [
        '24/7 availability',
        'Instant responses to mental health queries',
        'Personalized coping strategies',
        'Crisis intervention guidance',
        'Resource recommendations'
      ],
      benefits: [
        'Immediate support when needed',
        'Always available assistance',
        'Personalized recommendations',
        'Bridge to professional help'
      ],
      link: '/chat',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your mental health data is protected with enterprise-grade security and HIPAA compliance.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access support and resources whenever you need them, day or night.'
    },
    {
      icon: Award,
      title: 'Evidence-Based',
      description: 'All our services are based on proven therapeutic approaches and clinical research.'
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Every interaction is designed with empathy and understanding at its core.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Mental Health Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive mental health support designed to meet you wherever you are 
            in your wellness journey. From guided meditation to professional therapy, 
            we're here to help you thrive.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                activeService === service.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className={`${service.bgColor} p-6`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full bg-white shadow-md`}>
                    <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Heart className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  {isAuthenticated ? (
                    <Link
                      to={service.link}
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                    >
                      Get Started
                      <service.icon className="h-5 w-5 ml-2" />
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                    >
                      Sign Up to Access
                      <service.icon className="h-5 w-5 ml-2" />
                    </Link>
                  )}
                  <Link
                    to={service.link}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Mantra?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality mental health support 
              with features that prioritize your wellbeing and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Getting started with your mental health journey is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="opacity-90">
                Create your account and complete a brief assessment to personalize your experience.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Path</h3>
              <p className="opacity-90">
                Select from meditation, therapy, community support, or AI assistance based on your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
              <p className="opacity-90">
                Begin your mental wellness journey with personalized support and resources.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Prioritize Your Mental Health?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of others who have found support, healing, and growth through Mantra.
          </p>
          <div className="space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/about"
                  className="inline-block border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all"
                >
                  Learn More
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;