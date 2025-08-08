import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Activity,
  Award,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="w-full px-4 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Early Detection for{" "}
                <span className="text-warning-300">Heart Health</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-xl">
                Our AI-powered platform helps predict heart disease risk
                factors, providing early warnings and personalized health
                recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="default"
                    className="bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="User"
                  />
                  <img
                    className="h-10 w-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                    alt="User"
                  />
                  <img
                    className="h-10 w-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                    alt="User"
                  />
                </div>
                <p className="text-sm text-white/80">
                  Trusted by <span className="font-semibold">10,000+</span>{" "}
                  users
                </p>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-primary-400/30 rounded-full filter blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-10 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Heart health monitoring"
                  className="w-full h-80 object-cover rounded-lg shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How HeartGuard Works
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Our comprehensive approach to heart disease prediction and
              prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Heart Risk Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Answer questions about your health, family history, and
                lifestyle to get a personalized heart risk assessment.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Predictions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced AI analyzes your health data to provide accurate
                predictions about your heart disease risk factors.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Emergency Assistance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get immediate help in case of emergency with one-tap ambulance
                calls and directions to the nearest hospital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              For Individuals and Organizations
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              HeartGuard offers specialized features for both personal users and
              healthcare organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
                <User className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                For Patients
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Personalized health risk assessment
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Track symptoms and health metrics
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Emergency mode with quick access to help
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    AI Assistant for health questions
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Digital Health Card for medical emergencies
                  </span>
                </li>
              </ul>
              <Link to="/register?role=patient">
                <Button fullWidth>Sign Up as Patient</Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                For Organizations
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Patient monitoring and management system
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Risk trend analytics and reports
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    High-risk patient alerts
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Regional risk distribution maps
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Data export and AI-based reporting
                  </span>
                </li>
              </ul>
              <Link to="/register?role=organization">
                <Button fullWidth>Sign Up as Organization</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to protect your heart health?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Sign up today and take the first step towards better heart health
            monitoring and prevention.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className=" text-primary-600 shadow-md">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className=" text-primary-600 shadow-md">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
