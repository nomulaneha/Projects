import React from 'react';
import { Card } from '../ui/Card';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import QRCode from 'react-qr-code';

interface HealthCardProps {
  userData: {
    name: string;
    age: number;
    bloodType: string;
    medicalConditions: string[];
    medications: string[];
  };
  onShare?: () => void;
}

export const HealthCard: React.FC<HealthCardProps> = ({ userData, onShare }) => {
  return (
    <Card>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Heart className="h-5 w-5 text-primary-600 mr-2" />
            Health Card
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="text-xs"
            icon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
            <QRCode 
              value={JSON.stringify(userData)}
              size={120}
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {userData.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Age: {userData.age} • Blood Type: {userData.bloodType}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Medical Conditions
            </h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {userData.medicalConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Medications
            </h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {userData.medications.map((medication, index) => (
                <li key={index}>{medication}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}; 