import {
  User,
  HealthData,
  Symptom,
  Prediction,
  PatientStatistics,
} from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "patient",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "patient",
  },
  {
    id: "3",
    name: "Heart Care Hospital",
    email: "admin@heartcare.com",
    role: "organization",
  },
];

// Mock Health Data
export const mockHealthData: HealthData[] = [
  {
    id: "1",
    userId: "1",
    age: 45,
    sex: "male",
    bloodPressure: {
      systolic: 130,
      diastolic: 85,
    },
    cholesterol: 210,
    heartRate: 75,
    bloodSugar: 120,
    date: new Date("2023-09-15"),
  },
  {
    id: "2",
    userId: "1",
    age: 45,
    sex: "male",
    bloodPressure: {
      systolic: 135,
      diastolic: 90,
    },
    cholesterol: 225,
    heartRate: 78,
    bloodSugar: 130,
    date: new Date("2023-10-20"),
  },
  {
    id: "3",
    userId: "2",
    age: 38,
    sex: "female",
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
    },
    cholesterol: 180,
    heartRate: 70,
    bloodSugar: 110,
    date: new Date("2023-11-05"),
  },
];

// Mock Symptoms
export const mockSymptoms: Symptom[] = [
  {
    id: "1",
    userId: "1",
    type: "chestPain",
    severity: 3,
    description: "Felt chest pain after climbing stairs",
    date: new Date("2023-09-16"),
  },
  {
    id: "2",
    userId: "1",
    type: "fatigue",
    severity: 4,
    description: "Extreme fatigue throughout the day",
    date: new Date("2023-10-21"),
  },
  {
    id: "3",
    userId: "2",
    type: "dizziness",
    severity: 2,
    description: "Slight dizziness in the morning",
    date: new Date("2023-11-06"),
  },
];

// Mock Predictions
export const mockPredictions: Prediction[] = [
  {
    id: "1",
    userId: "1",
    riskLevel: "moderate",
    date: new Date("2023-09-15"),
    healthDataId: "1",
  },
  {
    id: "2",
    userId: "1",
    riskLevel: "high",
    date: new Date("2023-10-20"),
    healthDataId: "2",
  },
  {
    id: "3",
    userId: "2",
    riskLevel: "low",
    date: new Date("2023-11-05"),
    healthDataId: "3",
  },
];

// Mock Patient Statistics
export const mockPatientStatistics: PatientStatistics = {
  totalScreened: 250,
  highRiskCount: 45,
  weeklyTrend: [
    { date: "2023-11-01", count: 30 },
    { date: "2023-11-08", count: 35 },
    { date: "2023-11-15", count: 40 },
    { date: "2023-11-22", count: 38 },
    { date: "2023-11-29", count: 42 },
    { date: "2023-12-06", count: 45 },
    { date: "2023-12-13", count: 50 },
  ],
  regionalDistribution: [
    { region: "North", count: 80 },
    { region: "South", count: 65 },
    { region: "East", count: 45 },
    { region: "West", count: 60 },
  ],
};

// Prediction function
export const mockPredictRisk = (
  healthData: Omit<HealthData, "id" | "date">
): Promise<"low" | "moderate" | "high"> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock algorithm
      let risk: "low" | "moderate" | "high" = "low";

      const { age, bloodPressure, cholesterol } = healthData;

      // Age factor
      let riskPoints = 0;
      if (age > 60) riskPoints += 2;
      else if (age > 45) riskPoints += 1;

      // Blood pressure factor
      if (bloodPressure.systolic >= 140 || bloodPressure.diastolic >= 90)
        riskPoints += 2;
      else if (bloodPressure.systolic >= 130 || bloodPressure.diastolic >= 85)
        riskPoints += 1;

      // Cholesterol factor
      if (cholesterol >= 240) riskPoints += 2;
      else if (cholesterol >= 200) riskPoints += 1;

      if (riskPoints >= 4) risk = "high";
      else if (riskPoints >= 2) risk = "moderate";

      resolve(risk);
    }, 1500);
  });
};
