import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
}

export const NearbyHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'City General Hospital',
      distance: '2.3 km',
      address: '123 Healthcare Ave'
    },
    {
      id: '2',
      name: 'St. Mary\'s Medical Center',
      distance: '3.5 km',
      address: '456 Medical Blvd'
    },
    {
      id: '3',
      name: 'Community Health Hospital',
      distance: '4.8 km',
      address: '789 Wellness Way'
    }
  ]);

  const handleViewMap = (hospital: Hospital) => {
    const query = encodeURIComponent(hospital.name + ' ' + hospital.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <Card>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MapPin className="h-5 w-5 text-primary-600 mr-2" />
          Nearby Hospitals
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {hospital.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {hospital.address}
                </p>
                <span className="inline-flex items-center mt-2 text-xs text-primary-600 dark:text-primary-400">
                  <Navigation className="h-3 w-3 mr-1" />
                  {hospital.distance}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewMap(hospital)}
                className="text-xs"
              >
                View Map
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 