import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/auth";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      path: "/profile/edit",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      color: "text-gray-600",
      bg: "bg-gray-50 dark:bg-gray-700",
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <User
              size={40}
              className="text-primary-600 dark:text-primary-400"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-3">
            {user.role.replace("_", " ")}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <Mail size={16} className="text-gray-500" />
              {user.email}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <Phone size={16} className="text-gray-500" />
              {user.phone}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <Card
            key={item.path}
            onClick={() => navigate(item.path)}
            className="cursor-pointer"
          >
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-specific Links */}
      {(user.role === "super_admin" || user.role === "hotel_admin") && (
        <Card
          onClick={() => navigate("/admin/dashboard")}
          className="cursor-pointer"
        >
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-900/20">
                <Settings size={20} className="text-accent-600" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                Admin Dashboard
              </span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </CardContent>
        </Card>
      )}

      {user.role === "event_manager" && (
        <Card
          onClick={() => navigate("/manager/resources")}
          className="cursor-pointer"
        >
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Settings size={20} className="text-green-600" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                Resource Management
              </span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </CardContent>
        </Card>
      )}

      {/* Logout Button */}
      <Button
        variant="danger"
        fullWidth
        onClick={handleLogout}
        className="mt-8"
      >
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </div>
  );
};
