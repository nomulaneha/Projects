import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { FileSignature, Activity } from 'lucide-react';

interface SymptomLoggerProps {
  onLogSymptom: (symptom: {
    type: string;
    severity: number;
    description: string;
  }) => void;
}

export const SymptomLogger: React.FC<SymptomLoggerProps> = ({ onLogSymptom }) => {
  const [symptomType, setSymptomType] = useState('chestPain');
  const [severity, setSeverity] = useState<number>(3);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogSymptom({
        type: symptomType,
        severity,
        description,
      });
      
      // Reset form
      setSymptomType('chestPain');
      setSeverity(3);
      setDescription('');
      setLoading(false);
    }, 800);
  };

  return (
    <Card title="Log Your Symptoms" className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Symptom Type"
          options={[
            { value: 'chestPain', label: 'Chest Pain' },
            { value: 'shortnessOfBreath', label: 'Shortness of Breath' },
            { value: 'fatigue', label: 'Fatigue' },
            { value: 'dizziness', label: 'Dizziness' },
            { value: 'swelling', label: 'Swelling in Legs/Ankles' },
            { value: 'other', label: 'Other' },
          ]}
          value={symptomType}
          onChange={(value) => setSymptomType(value)}
          fullWidth
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Severity (1 - Mild, 5 - Severe)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="5"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="w-8 text-center font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-2 py-1">
              {severity}
            </span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your symptoms in detail..."
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 w-full"
          ></textarea>
        </div>
        
        <div className="flex gap-3">
          <Button
            type="submit"
            loading={loading}
            icon={<FileSignature className="w-5 h-5" />}
            className="flex-1"
          >
            Log Symptom
          </Button>
          
          <Button
            type="button"
            variant="danger"
            icon={<Activity className="w-5 h-5" />}
            onClick={() => {
              setSymptomType('chestPain');
              setSeverity(5);
              setDescription('Severe chest pain radiating to left arm');
              
              // Focus on submit button
              document.getElementById('emergencyBtn')?.focus();
            }}
            className="flex-shrink-0"
            id="emergencyBtn"
          >
            Emergency
          </Button>
        </div>
      </form>
    </Card>
  );
};