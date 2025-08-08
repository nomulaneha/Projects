from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Dict
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
try:
    model = joblib.load("trained_heart_disease_model.joblib")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

# Feature order expected by the model
FEATURE_ORDER = [
    'Age', 'Sex', 'RestingBloodPressure', 'SerumCholesterol',
    'FastingBloodSugar', 'RestingECG', 'MaxHeartRate',
    'ExerciseInducedAngina', 'STDepression', 'NumMajorVessels',
    'ChestPainType_Atypical angina', 'ChestPainType_Non-anginal pain',
    'ChestPainType_Typical angina', 'Thalassemia_Normal',
    'Thalassemia_Reversible defect', 'SlopeSTSegment_Flat',
    'SlopeSTSegment_Upsloping'
]

# Mapping dictionaries for categorical variables
CHEST_PAIN_MAPPING = {
    "Typical Angina": {"ChestPainType_Typical angina": 1, 
                      "ChestPainType_Atypical angina": 0, 
                      "ChestPainType_Non-anginal pain": 0},
    "Atypical Angina": {"ChestPainType_Typical angina": 0, 
                        "ChestPainType_Atypical angina": 1, 
                        "ChestPainType_Non-anginal pain": 0},
    "Non-Anginal Pain": {"ChestPainType_Typical angina": 0, 
                         "ChestPainType_Atypical angina": 0, 
                         "ChestPainType_Non-anginal pain": 1}
}

THALASSEMIA_MAPPING = {
    "Normal": {"Thalassemia_Normal": 1, 
              "Thalassemia_Reversible defect": 0},
    "Fixed Defect": {"Thalassemia_Normal": 0, 
                     "Thalassemia_Reversible defect": 0},
    "Reversible Defect": {"Thalassemia_Normal": 0, 
                          "Thalassemia_Reversible defect": 1}
}

SLOPE_MAPPING = {
    "Upsloping": {"SlopeSTSegment_Flat": 0, 
                  "SlopeSTSegment_Upsloping": 1},
    "Flat": {"SlopeSTSegment_Flat": 1, 
             "SlopeSTSegment_Upsloping": 0},
    "Downsloping": {"SlopeSTSegment_Flat": 0, 
                    "SlopeSTSegment_Upsloping": 0}
}

class PredictionInput(BaseModel):
    Age: int
    Sex: int
    ChestPainType: str
    RestingBloodPressure: int
    SerumCholesterol: int
    FastingBloodSugar: int
    RestingECG: int
    MaxHeartRate: int
    ExerciseInducedAngina: int
    STDepression: float
    SlopeSTSegment: str
    NumMajorVessels: int
    Thalassemia: str

class PredictionOutput(BaseModel):
    risk_score: int
    risk_category: str
    confidence: float

def prepare_features(data: Dict) -> np.ndarray:
    # Initialize feature vector with zeros
    feature_vector = {}
    
    # Add numeric features directly
    numeric_features = [
        'Age', 'Sex', 'RestingBloodPressure', 'SerumCholesterol',
        'FastingBloodSugar', 'RestingECG', 'MaxHeartRate',
        'ExerciseInducedAngina', 'STDepression', 'NumMajorVessels'
    ]
    for feature in numeric_features:
        feature_vector[feature] = float(data[feature])
    
    # Add categorical features using mappings
    feature_vector.update(CHEST_PAIN_MAPPING[data['ChestPainType']])
    feature_vector.update(THALASSEMIA_MAPPING[data['Thalassemia']])
    feature_vector.update(SLOPE_MAPPING[data['SlopeSTSegment']])
    
    # Create numpy array in correct order
    return np.array([feature_vector[feature] for feature in FEATURE_ORDER]).reshape(1, -1)

@app.post("/predict", response_model=PredictionOutput)
async def predict(data: PredictionInput):
    try:
        if not model:
            raise HTTPException(
                status_code=503,
                detail="Model is not initialized. Please wait for the server to complete initialization."
            )

        # Prepare features
        features = prepare_features(data.dict())
        
        # Predict class and probabilities
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        confidence = probabilities[prediction]  # confidence for the predicted class
        
        return {
            "risk_score": int(prediction),
            "risk_category": "Heart Risk" if prediction == 1 else "No Heart Risk",
            "confidence": round(confidence * 100, 2)  # return as percentage
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Heart Disease Prediction API"}
