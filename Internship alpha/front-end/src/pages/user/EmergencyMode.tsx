import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Phone, MapPin, Share2, AlertTriangle } from 'lucide-react';
import QRCode from 'react-qr-code';

interface EmergencyModeProps {
  active: boolean;
  onClose: () => void;
  userData: {
    name: string;
    age: number;
    bloodType?: string;
    emergencyContact?: string;
    medicalConditions?: string[];
    medications?: string[];
    allergies?: string[];
  };
}

export const EmergencyMode: React.FC<EmergencyModeProps> = ({ active, onClose, userData }) => {
  const handleCallEmergency = () => {
    // In a real app, this would initiate a call
    alert('In a real app, this would call emergency services');
  };

  const handleShareQR = () => {
    // In a real app, this would use the Web Share API
    alert('In a real app, this would share your medical QR code');
  };

  const handleShowRoute = () => {
    // In a real app, this would open Google Maps
    window.open(
      'https://www.google.com/maps/search/nearest+hospital',
      '_blank'
    );
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-danger-500 animate-pulse-slow">
          <div className="text-center mb-6">
            <div className="bg-danger-100 dark:bg-danger-900/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-danger-600 dark:text-danger-400" />
            </div>
            <h2 className="text-2xl font-bold text-danger-600 dark:text-danger-400">EMERGENCY MODE</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Access critical resources immediately
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <Button
              onClick={handleCallEmergency}
              variant="danger"
              icon={<Phone className="h-5 w-5" />}
              className="py-3"
            >
              Call Emergency Services (911)
            </Button>

            <Button
              onClick={handleShowRoute}
              variant="outline"
              icon={<MapPin className="h-5 w-5" />}
              className="border-danger-300 dark:border-danger-700 text-danger-700 dark:text-danger-400 py-3"
            >
              Navigate to Nearest Hospital
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medical Information</h3>
              <Button
                onClick={handleShareQR}
                variant="outline"
                size="sm"
                icon={<Share2 className="h-4 w-4" />}
              >
                Share
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-white p-2 rounded-lg">
                <QRCode value={JSON.stringify(userData)} size={100} />
              </div>

              <div className="text-sm">
                <p className="font-bold">{userData.name}</p>
                <p>Age: {userData.age}</p>
                {userData.bloodType && <p>Blood Type: {userData.bloodType}</p>}
                
                {userData.medicalConditions && userData.medicalConditions.length > 0 && (
                  <p className="mt-2 font-medium">
                    Medical Conditions: {userData.medicalConditions.join(', ')}
                  </p>
                )}
                
                {userData.medications && userData.medications.length > 0 && (
                  <p>Medications: {userData.medications.join(', ')}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Close Emergency Mode
          </Button>
        </Card>
      </div>
    </div>
  );
};