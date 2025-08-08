import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Heart, User, Building2 } from "lucide-react";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type") || "patient";

  const [loginType, setLoginType] = useState<"patient" | "organization">(
    defaultType as "patient" | "organization"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement actual login logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      navigate(
        loginType === "patient" ? "/dashboard" : "/organization-dashboard"
      );
    } catch (error) {
      console.error("Login error:", error);
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={`/register?type=${loginType}`}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex rounded-md shadow-sm mb-6" role="group">
          <button
            type="button"
            onClick={() => setLoginType("patient")}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-l-lg ${
              loginType === "patient"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Patient
          </button>
          <button
            type="button"
            onClick={() => setLoginType("organization")}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-r-lg ${
              loginType === "organization"
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
            <Input
              label={`${
                loginType === "patient" ? "Patient" : "Organization"
              } Email`}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              icon={
                loginType === "patient" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )
              }
            >
              Sign in as {loginType === "patient" ? "Patient" : "Organization"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
