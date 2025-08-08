import React from "react";
import { Card } from "../../components/ui/Card";
import { Prediction, HealthData } from "../../types";
import {
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  MinusCircle,
} from "lucide-react";

interface PredictionHistoryProps {
  predictions: Prediction[];
  healthData: HealthData[];
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({
  predictions,
  healthData,
}) => {
  // Sort predictions by date (newest first)
  const sortedPredictions = [...predictions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get risk icon based on risk level
  const getRiskIcon = (riskLevel: "low" | "moderate" | "high") => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return <TrendingDown className="h-5 w-5 text-danger-500" />;
      case "moderate":
        return <MinusCircle className="h-5 w-5 text-warning-500" />;
      case "high":
        return <TrendingUp className="h-5 w-5 text-success-500" />;
      default:
        return <MinusCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get health data by ID
  const getHealthData = (healthDataId: string) => {
    return healthData.find((data) => data.id === healthDataId);
  };

  return (
    <Card
      title="Prediction History"
      subtitle="Your past heart health risk assessments"
      className="mb-6"
    >
      {sortedPredictions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">
            No prediction history available yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedPredictions.map((prediction) => {
            const data = getHealthData(prediction.healthDataId);

            return (
              <div key={prediction.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getRiskIcon(prediction.riskLevel)}
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        {prediction.riskLevel.toLowerCase() === "low" && (
                          <span className="text-danger-600 dark:text-danger-400">
                            Risk Detected
                          </span>
                        )}
                        {prediction.riskLevel.toLowerCase() === "moderate" && (
                          <span className="text-warning-600 dark:text-warning-400">
                            Moderate Risk
                          </span>
                        )}
                        {prediction.riskLevel.toLowerCase() === "high" && (
                          <span className="text-success-600 dark:text-success-400">
                            No Risk Detected
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(prediction.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {data && (
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-4">
                        <div>
                          <p>
                            BP: {data.bloodPressure.systolic}/
                            {data.bloodPressure.diastolic}
                          </p>
                          <p>Chol: {data.cholesterol}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
