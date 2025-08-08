import React, { useState, useEffect } from "react";
import {
  Bell,
  FileBarChart2,
  Heart,
  AlertTriangle,
  Smartphone,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PredictionForm } from "./PredictionForm";
import { SymptomLogger } from "./SymptomLogger";
import { EmergencyMode } from "./EmergencyMode";
import { HealthTips } from "./HealthTips";
import { AIAssistant } from "../../components/ai/AIAssistant";
import { PredictionHistory } from "./PredictionHistory";
import { HealthCard } from "../../components/health/HealthCard";
import { NearbyHospitals } from "../../components/maps/NearbyHospitals";
import {
  mockHealthData,
  mockPredictions,
  mockSymptoms,
} from "../../utils/mockData";
import QRCode from "react-qr-code";
import { toast } from "react-hot-toast";

type RiskLevel = "low" | "moderate" | "high";

export const Dashboard: React.FC = () => {
  const [predictions, setPredictions] = useState(mockPredictions);
  const [healthData, setHealthData] = useState(mockHealthData);
  const [symptoms, setSymptoms] = useState(mockSymptoms);
  const [loading, setLoading] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [latestRisk, setLatestRisk] = useState<RiskLevel>("low");
  const [showQRModal, setShowQRModal] = useState(false);

  const userData = {
    id: "1",
    name: "John Doe",
    age: 45,
    bloodType: "O+",
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Metformin", "Lisinopril"],
  };

  useEffect(() => {
    // Set latest risk level from predictions
    if (predictions.length > 0) {
      const latest = predictions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      setLatestRisk(latest.riskLevel as RiskLevel);
    }
  }, [predictions]);

  const handlePredict = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Map risk_category to riskLevel - "Heart Risk" means risk is detected (low), "No Risk Detected" means high risk
      const riskLevel = data.risk_category === "Heart Risk" ? "low" : "high";

      // Add prediction to state
      const newPrediction = {
        id: Date.now().toString(),
        userId: userData.id,
        date: new Date().toISOString(),
        riskLevel: riskLevel,
        healthDataId: Date.now().toString(),
      };

      setPredictions((prev) => [...prev, newPrediction]);
      toast.success("Prediction completed successfully!");
    } catch (error) {
      console.error("Error making prediction:", error);
      toast.error("Failed to make prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogSymptom = async (data: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add symptom to state
      const newSymptom = {
        id: Date.now().toString(),
        userId: userData.id,
        date: new Date().toISOString(),
        ...data,
      };

      setSymptoms((prev) => [...prev, newSymptom]);
      toast.success("Symptom logged successfully!");
    } catch (error) {
      console.error("Error logging symptom:", error);
      toast.error("Failed to log symptom. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <PredictionForm onPredict={handlePredict} loading={loading} />
          <SymptomLogger onLogSymptom={handleLogSymptom} />
          <HealthTips />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card title="Quick Actions" className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                fullWidth
                icon={<Bell className="h-5 w-5 text-primary-600" />}
              >
                Reminders
              </Button>
              <Button
                variant="outline"
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                fullWidth
                icon={<FileBarChart2 className="h-5 w-5 text-primary-600" />}
              >
                Reports
              </Button>
            </div>
          </Card>

          <HealthCard
            userData={userData}
            onShare={() => setShowQRModal(true)}
          />

          <NearbyHospitals />

          <PredictionHistory
            predictions={predictions}
            healthData={healthData}
          />
          <AIAssistant />
        </div>
      </div>

      {/* Emergency Mode */}
      <EmergencyMode
        active={showEmergency}
        onClose={() => setShowEmergency(false)}
        userData={userData}
      />

      {/* QR Health Card Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Digital Health Card
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Share this with healthcare providers in emergencies
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-4 rounded-lg mb-6">
              <QRCode value={JSON.stringify(userData)} className="mb-4" />
              <div className="text-center">
                <p className="font-bold text-lg">{userData.name}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Age: {userData.age} • Blood Type: {userData.bloodType}
                </p>
                <div className="bg-primary-50 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                  Medical ID #{userData.id}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Medical Conditions
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                  {userData.medicalConditions?.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Medications
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                  {userData.medications?.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowQRModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button className="flex-1">Share Card</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
