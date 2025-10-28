import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MapPin,
  CheckCircle,
  Star,
  Clock,
  Sparkles,
  Heart,
} from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { mockVenues } from "../utils/mockData";
import { formatCurrency, getStatusColor } from "../utils/helpers";

export const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = mockVenues.find((v) => v.id === parseInt(id));

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Venue not found
          </p>
          <Button onClick={() => navigate("/venues")}>Back to Venues</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* Header Image */}
      <div className="relative overflow-hidden">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>

        <button className="absolute top-4 right-16 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 backdrop-blur-sm">
          <Heart size={20} className="text-red-500" />
        </button>

        <span
          className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${getStatusColor(
            venue.status
          )}`}
        >
          {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
        </span>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Venue Info */}
        <div className="animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles
              className="text-primary-600 dark:text-primary-400 animate-pulse"
              size={20}
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {venue.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={16} />
            <span>{venue.hotel}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-current"
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              4.8 (127 reviews)
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideIn">
            <CardContent className="text-center p-4">
              <div className="inline-flex p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl mb-3">
                <Users
                  size={24}
                  className="text-primary-600 dark:text-primary-400"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Capacity
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {venue.capacity} guests
              </p>
            </CardContent>
          </Card>
          <Card
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideIn"
            style={{ animationDelay: "100ms" }}
          >
            <CardContent className="text-center p-4">
              <div className="inline-flex p-3 bg-green-50 dark:bg-green-900/20 rounded-xl mb-3">
                <Clock
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Starting from
              </p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(venue.price)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card
          className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {venue.description}
            </p>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card
          className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fadeIn"
          style={{ animationDelay: "300ms" }}
        >
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
              Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {venue.amenities.map((amenity, index) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle
                    size={18}
                    className="text-green-600 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className="space-y-4 animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate("/booking")}
            disabled={venue.status === "booked"}
            className={`transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              venue.status === "booked"
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700"
            }`}
          >
            {venue.status === "booked" ? "Not Available" : "Book Now"}
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={() => navigate("/calendar")}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700"
          >
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
};
