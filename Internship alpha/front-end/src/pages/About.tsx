import React from 'react';
import { Heart, Award, Users, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About HeartGuard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Empowering healthcare professionals and individuals with advanced heart disease prediction technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400">
            To revolutionize heart disease prevention through innovative AI-powered predictions and early detection.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Committed to providing the highest quality healthcare solutions backed by cutting-edge technology.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Team</h3>
          <p className="text-gray-600 dark:text-gray-400">
            A dedicated team of healthcare professionals, data scientists, and technology experts.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your health data security and privacy are our top priorities, with state-of-the-art protection.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            HeartGuard was founded with a simple yet powerful vision: to make heart disease prediction accessible and accurate for everyone. Our journey began when a team of healthcare professionals and AI experts came together to address the growing need for early heart disease detection.
          </p>
          <p className="mb-4">
            Today, we're proud to serve healthcare organizations worldwide, helping them leverage the power of artificial intelligence to improve patient outcomes. Our platform combines clinical expertise with advanced machine learning algorithms to provide accurate predictions and actionable insights.
          </p>
          <p>
            We continue to innovate and expand our services, always keeping our core mission in focus: saving lives through early detection and prevention of heart disease.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Join Us in Making a Difference</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Whether you're a healthcare provider or an organization looking to implement advanced heart disease prediction technology, we're here to help you make a difference in people's lives.
        </p>
      </div>
    </div>
  );
}; 