import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { SettingsFormData } from "../../types";
import { Save, User, Building2 } from "lucide-react";
import { toast } from "react-hot-toast";

export const Settings: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SettingsFormData>({
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: "John Doe",
    phone: "+1234567890",
    organizationName: "",
    organizationType: undefined,
    address: "123 Main St",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Validate passwords match
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card title="Account Settings" className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="p-4 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300 rounded-lg border border-success-200 dark:border-success-800 mb-6">
              Settings updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              icon={<User className="h-5 w-5" />}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />

            <Input
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Current Password"
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="New Password"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
              icon={<Save className="h-5 w-5" />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
