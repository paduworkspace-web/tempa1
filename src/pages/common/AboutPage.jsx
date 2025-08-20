import React from 'react';
import { Heart, Users, Shield, Award } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We provide empathetic support and understanding for your mental health journey.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others who understand your experiences in a safe, supportive environment.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your privacy is our priority. All interactions are secure and confidential.'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Access to qualified therapists and evidence-based mental health resources.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Psychologist',
      image: '/img/team1.jpg',
      description: 'Specializes in anxiety and depression treatment with over 10 years of experience.'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Psychiatrist',
      image: '/img/team2.jpg',
      description: 'Expert in medication management and holistic mental health approaches.'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Licensed Therapist',
      image: '/img/team3.jpg',
      description: 'Focuses on trauma therapy and mindfulness-based interventions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Mantra
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We're dedicated to making mental health support accessible, 
              compassionate, and effective for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Mantra, we believe that mental health is just as important as physical health. 
              Our mission is to provide comprehensive, accessible, and personalized mental health 
              support through innovative technology and compassionate care.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
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
      </div>

      {/* Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Mantra was founded in 2023 with a simple yet powerful vision: to break down 
                  the barriers that prevent people from accessing quality mental health care.
                </p>
                <p>
                  Our founders, having experienced their own mental health challenges, 
                  recognized the need for a platform that combines professional therapy, 
                  peer support, and self-care tools in one accessible place.
                </p>
                <p>
                  Today, we're proud to serve thousands of users worldwide, providing them 
                  with the tools and support they need to thrive mentally and emotionally.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/img/about-story.jpg"
                alt="Our story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of experienced mental health professionals is here to support you 
              on your journey to better mental wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of others who have found support, healing, and growth through Mantra.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;