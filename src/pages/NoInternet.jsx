import { useNavigate } from "react-router-dom";
import { ArrowLeft, WifiOff, RefreshCw } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";

export const NoInternet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-maroon-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">No Internet</h1>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Error Card */}
        <Card className="border-2 border-red-500 bg-red-50">
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Check your internet connection and try again.
            </h2>
            <p className="text-red-700 text-lg">
              Looks like your connection is interrupted. Hit refresh or check
              network connection.
            </p>
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <Button
          fullWidth
          size="lg"
          onClick={() => window.location.reload()}
          className="bg-maroon-600 hover:bg-maroon-700 text-white"
        >
          <RefreshCw className="mr-2" size={20} />
          Refresh
        </Button>

        {/* Alternative Actions */}
        <div className="space-y-3">
          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate("/")}
            className="border-maroon-600 text-maroon-600 hover:bg-maroon-50"
          >
            Go to Home
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate("/bookings")}
            className="border-maroon-600 text-maroon-600 hover:bg-maroon-50"
          >
            View Offline Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

