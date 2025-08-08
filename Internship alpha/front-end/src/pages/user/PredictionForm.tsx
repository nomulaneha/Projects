import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { ActivitySquare, Heart } from "lucide-react";
import { predictRisk, PredictionData } from "../../services/api";
import { toast } from "react-hot-toast";

interface PredictionFormProps {
  onPredict?: (result: any) => void;
  loading?: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onPredict,
  loading: externalLoading,
}) => {
  const [formData, setFormData] = useState<PredictionData>({
    Age: 40,
    Sex: 1,
    ChestPainType: "Typical Angina",
    RestingBloodPressure: 120,
    SerumCholesterol: 180,
    FastingBloodSugar: 0,
    RestingECG: 0,
    MaxHeartRate: 72,
    ExerciseInducedAngina: 0,
    STDepression: 0,
    SlopeSTSegment: "Upsloping",
    NumMajorVessels: 0,
    Thalassemia: "Normal",
  });

  const [prediction, setPrediction] = useState<{
    risk_score: number;
    risk_category: string;
    confidence: number;
  } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.Age < 18 || formData.Age > 120) {
      errors.Age = "Age must be between 18 and 120";
    }

    if (
      formData.RestingBloodPressure < 80 ||
      formData.RestingBloodPressure > 220
    ) {
      errors.RestingBloodPressure = "Blood pressure must be between 80 and 220";
    }

    if (formData.SerumCholesterol < 100 || formData.SerumCholesterol > 500) {
      errors.SerumCholesterol = "Cholesterol must be between 100 and 500";
    }

    if (formData.MaxHeartRate < 40 || formData.MaxHeartRate > 220) {
      errors.MaxHeartRate = "Heart rate must be between 40 and 220";
    }

    if (formData.NumMajorVessels < 0 || formData.NumMajorVessels > 3) {
      errors.NumMajorVessels =
        "Number of major vessels must be between 0 and 3";
    }

    if (formData.STDepression < 0 || formData.STDepression > 6.2) {
      errors.STDepression = "ST depression must be between 0 and 6.2";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await predictRisk(formData);
      setPrediction(result);
      if (onPredict) {
        onPredict(result);
      }

      toast.success("Risk assessment completed successfully");

      if (result.risk_score === 1) {
        toast.error(
          "High risk detected! Please consult a healthcare provider immediately.",
          {
            duration: 6000,
          }
        );
      }
    } catch (error: any) {
      console.error("Error predicting risk:", error);
      toast.error(
        error.response?.data?.detail ||
          "Failed to complete risk assessment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Heart Disease Risk Assessment"
      className="mb-6 dark:bg-gray-800 dark:border-gray-700"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            value={formData.Age}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Age: Number(e.target.value) }))
            }
            error={formErrors.Age}
            min={18}
            max={120}
            required
          />

          <Select
            label="Sex"
            options={[
              { value: "1", label: "Male" },
              { value: "0", label: "Female" },
            ]}
            value={String(formData.Sex)}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, Sex: Number(value) }))
            }
            required
          />

          <Select
            label="Chest Pain Type"
            options={[
              { value: "Typical Angina", label: "Typical Angina" },
              { value: "Atypical Angina", label: "Atypical Angina" },
              { value: "Non-Anginal Pain", label: "Non-Anginal Pain" },
            ]}
            value={formData.ChestPainType}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, ChestPainType: value }))
            }
            required
          />

          <Input
            label="Resting Blood Pressure"
            type="number"
            value={formData.RestingBloodPressure}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                RestingBloodPressure: Number(e.target.value),
              }))
            }
            error={formErrors.RestingBloodPressure}
            helperText="mm Hg"
            min={80}
            max={220}
            required
          />

          <Input
            label="Serum Cholesterol"
            type="number"
            value={formData.SerumCholesterol}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                SerumCholesterol: Number(e.target.value),
              }))
            }
            error={formErrors.SerumCholesterol}
            helperText="mg/dl"
            min={100}
            max={500}
            required
          />

          <Select
            label="Fasting Blood Sugar > 120 mg/dl"
            options={[
              { value: "0", label: "No" },
              { value: "1", label: "Yes" },
            ]}
            value={String(formData.FastingBloodSugar)}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                FastingBloodSugar: Number(value),
              }))
            }
            required
          />

          <Select
            label="Resting ECG"
            options={[
              { value: "0", label: "Normal" },
              { value: "1", label: "ST-T Wave Abnormality" },
              { value: "2", label: "Left Ventricular Hypertrophy" },
            ]}
            value={String(formData.RestingECG)}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, RestingECG: Number(value) }))
            }
            required
          />

          <Input
            label="Maximum Heart Rate"
            type="number"
            value={formData.MaxHeartRate}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                MaxHeartRate: Number(e.target.value),
              }))
            }
            error={formErrors.MaxHeartRate}
            helperText="bpm"
            min={40}
            max={220}
            required
          />

          <Select
            label="Exercise Induced Angina"
            options={[
              { value: "0", label: "No" },
              { value: "1", label: "Yes" },
            ]}
            value={String(formData.ExerciseInducedAngina)}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                ExerciseInducedAngina: Number(value),
              }))
            }
            required
          />

          <Input
            label="ST Depression"
            type="number"
            value={formData.STDepression}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                STDepression: Number(e.target.value),
              }))
            }
            error={formErrors.STDepression}
            step="0.1"
            min={0}
            max={6.2}
            required
          />

          <Select
            label="ST Segment Slope"
            options={[
              { value: "Upsloping", label: "Upsloping" },
              { value: "Flat", label: "Flat" },
              { value: "Downsloping", label: "Downsloping" },
            ]}
            value={formData.SlopeSTSegment}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, SlopeSTSegment: value }))
            }
            required
          />

          <Input
            label="Number of Major Vessels"
            type="number"
            value={formData.NumMajorVessels}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                NumMajorVessels: Number(e.target.value),
              }))
            }
            error={formErrors.NumMajorVessels}
            min={0}
            max={3}
            required
          />

          <Select
            label="Thalassemia"
            options={[
              { value: "Normal", label: "Normal" },
              { value: "Fixed Defect", label: "Fixed Defect" },
              { value: "Reversible Defect", label: "Reversible Defect" },
            ]}
            value={formData.Thalassemia}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, Thalassemia: value }))
            }
            required
          />
        </div>

        <Button
          type="submit"
          loading={isSubmitting || externalLoading}
          fullWidth
          icon={<Heart className="w-5 h-5" />}
          className="dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          Calculate Risk
        </Button>

        {isSubmitting ? (
          <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          prediction && (
            <div
              className={`p-4 rounded-lg mt-4 ${
                prediction.risk_category === "Heart Risk"
                  ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              }`}
            >
              <div
                className={`text-lg font-semibold mb-1 ${
                  prediction.risk_category === "Heart Risk"
                    ? "text-red-700 dark:text-red-400"
                    : "text-green-700 dark:text-green-400"
                }`}
              >
                {prediction.risk_category === "Heart Risk" ? (
                  <>⚠️ High Risk Detected</>
                ) : (
                  <>✅ No Risk Detected</>
                )}
              </div>
              <div
                className={`${
                  prediction.risk_category === "Heart Risk"
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                Confidence: {prediction.confidence.toFixed(2)}%
              </div>
            </div>
          )
        )}
      </form>
    </Card>
  );
};
