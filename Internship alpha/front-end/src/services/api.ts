import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add withCredentials if your API requires cookies
  withCredentials: false,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

// Prediction API
export interface PredictionData {
  Age: number;
  Sex: number;
  ChestPainType: string;
  RestingBloodPressure: number;
  SerumCholesterol: number;
  FastingBloodSugar: number;
  RestingECG: number;
  MaxHeartRate: number;
  ExerciseInducedAngina: number;
  STDepression: number;
  SlopeSTSegment: string;
  NumMajorVessels: number;
  Thalassemia: string;
}

export interface PredictionResult {
  risk_score: number;
  risk_category: string;
  confidence: number;
  explanations: any[];
}

export const predictRisk = async (
  data: PredictionData
): Promise<PredictionResult> => {
  try {
    const response = await api.post("/predict", data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getPredictions = async (skip = 0, limit = 10) => {
  const response = await api.get(
    `/predictions/predictions?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

// ChatGPT API
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const getChatGPTResponse = async (messages: ChatMessage[]) => {
  console.log("Making request to /chat/gpt with messages:", messages);
  try {
    const response = await api.post("/chat/gpt", { messages });
    console.log("Received response from /chat/gpt:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in getChatGPTResponse:", error);
    throw error;
  }
};
