export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'organization';
  profileData?: {
    phone?: string;
    address?: string;
    organizationName?: string;
    organizationType?: 'hospital' | 'clinic' | 'research';
  };
}

export interface HealthData {
  id: string;
  userId: string;
  age: number;
  sex: 'male' | 'female';
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  cholesterol: number;
  heartRate: number;
  bloodSugar: number;
  date: Date;
}

export interface Symptom {
  id: string;
  userId: string;
  type: 'chestPain' | 'fatigue' | 'shortnessOfBreath' | 'dizziness' | 'swelling' | 'other';
  severity: 1 | 2 | 3 | 4 | 5;
  description?: string;
  date: Date;
}

export interface Prediction {
  id: string;
  userId: string;
  riskLevel: 'low' | 'moderate' | 'high';
  date: Date;
  healthDataId: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'research';
  address: string;
}

export interface PatientStatistics {
  totalScreened: number;
  highRiskCount: number;
  weeklyTrend: {
    date: string;
    count: number;
  }[];
  regionalDistribution: {
    region: string;
    count: number;
  }[];
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  action?: () => void;
  actionLabel?: string;
}

export interface SettingsFormData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  organizationName?: string;
  organizationType?: 'hospital' | 'clinic' | 'research';
  address?: string;
}