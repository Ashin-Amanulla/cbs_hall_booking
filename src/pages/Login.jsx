import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { mockUsers } from "../utils/mockData";
import { Hotel } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login(user);

        // Role-based redirection
        switch (user.role) {
          case "super_admin":
            navigate("/admin/dashboard");
            break;
          case "hotel_admin":
            navigate("/admin/dashboard");
            break;
          case "event_manager":
            navigate("/manager/resources");
            break;
          case "client":
            navigate("/");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-2xl mb-4">
              <Hotel size={32} className="text-maroon-600" />
            </div>
            <h1 className="text-2xl font-bold text-maroon-800 mb-2">
              HALL BOOKING
            </h1>
            <p className="text-gray-600">Find and book the perfect venue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} fullWidth size="lg">
              Sign In
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center font-medium">
              Demo Accounts
            </p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Super Admin:</span>
                <span className="font-mono">
                  admin@intercity.com / admin123
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hotel Admin:</span>
                <span className="font-mono">
                  hotel@intercity.com / hotel123
                </span>
              </div>
              <div className="flex justify-between">
                <span>Event Manager:</span>
                <span className="font-mono">
                  manager@intercity.com / manager123
                </span>
              </div>
              <div className="flex justify-between">
                <span>Client:</span>
                <span className="font-mono">
                  client@example.com / client123
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-maroon-600 font-medium hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};
