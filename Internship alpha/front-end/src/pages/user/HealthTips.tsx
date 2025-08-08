import React from 'react';
import { Card } from '../../components/ui/Card';
import { Heart, Coffee, Utensils, Watch, Moon, Bath, Wind } from 'lucide-react';

export const HealthTips: React.FC = () => {
  const tips = [
    {
      title: 'Maintain a Healthy Diet',
      content: 'Focus on a diet rich in fruits, vegetables, lean proteins, and whole grains. Limit sodium, added sugars, and unhealthy fats.',
      icon: <Utensils className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Regular Physical Activity',
      content: 'Aim for at least 150 minutes of moderate-intensity exercise per week to strengthen your heart and improve overall health.',
      icon: <Watch className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Get Quality Sleep',
      content: 'Adults should aim for 7-9 hours of quality sleep each night. Poor sleep is linked to high blood pressure and heart disease.',
      icon: <Moon className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Manage Stress',
      content: 'Chronic stress contributes to heart disease. Practice relaxation techniques like meditation, deep breathing, or yoga.',
      icon: <Wind className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Limit Alcohol & Avoid Smoking',
      content: 'If you drink alcohol, do so in moderation. If you smoke, quitting is one of the best things you can do for your heart.',
      icon: <Coffee className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Regular Health Screenings',
      content: 'Get regular check-ups to monitor blood pressure, cholesterol, and blood glucose levels.',
      icon: <Heart className="h-6 w-6 text-primary-600" />,
    },
  ];

  return (
    <Card title="Heart Health Tips" subtitle="Daily practices to maintain good heart health" className="mb-6">
      <div className="flex overflow-x-auto pb-4 -mx-6 px-6 space-x-4 scrollbar-hide">
        {tips.map((tip, index) => (
          <div key={index} className="min-w-[280px] max-w-[280px] bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                {tip.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tip.content}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
        <div className="flex">
          <div className="flex-shrink-0">
            <Bath className="h-5 w-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary-800 dark:text-primary-300">Did you know?</h3>
            <p className="mt-1 text-sm text-primary-700 dark:text-primary-400">
              Laughing can actually be good for your heart! It reduces stress hormones, decreases inflammation, and increases good cholesterol.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};