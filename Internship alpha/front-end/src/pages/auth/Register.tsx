import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Heart, User, Building2 } from "lucide-react";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type") || "patient";

  const [registerType, setRegisterType] = useState<"patient" | "organization">(
    defaultType as "patient" | "organization"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: registerType === "patient" ? "" : "",
    organizationName: registerType === "organization" ? "" : "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // TODO: Show error message
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual registration logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      navigate(
        registerType === "patient" ? "/dashboard" : "/organization-dashboard"
      );
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={`/login?type=${registerType}`}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex rounded-md shadow-sm mb-6" role="group">
          <button
            type="button"
            onClick={() => setRegisterType("patient")}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-l-lg ${
              registerType === "patient"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRegisterType("organization")}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-r-lg ${
              registerType === "organization"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Organization
          </button>
        </div>

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {registerType === "patient" ? (
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            ) : (
              <Input
                label="Organization Name"
                type="text"
                value={formData.organizationName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    organizationName: e.target.value,
                  }))
                }
                required
              />
            )}

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />

            <Input
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              required
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              icon={
                registerType === "patient" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )
              }
            >
              Create {registerType === "patient" ? "Patient" : "Organization"}{" "}
              Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
