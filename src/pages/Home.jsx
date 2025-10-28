import { useNavigate } from "react-router-dom";
import {
  Building2,
  Star,
  Share2,
  Heart,
  ArrowRight,
  MapPin,
  Search as SearchIcon,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { mockVenues } from "../utils/mockData";
import { formatCurrency } from "../utils/helpers";
import { useAuthStore } from "../store/auth";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const categories = [
    {
      id: 1,
      name: "Hostel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Party Center",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f29c8a0c0b?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Wedding Center",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Seminar Hall",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150&h=150&fit=crop&crop=center",
    },
  ];

  const featuredVenues = [
    {
      id: 1,
      name: "Tajmahal Community Hall",
      location: "Dhaka, mirpur 2",
      price: 4000,
      rating: 4,
      reviews: 200,
      image:
        "https://images.unsplash.com/photo-1519167758481-83f29c8a0c0b?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Convention Hall Dhaka",
      location: "Dhaka, mirpur 2",
      price: 3000,
      rating: 4,
      reviews: 200,
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop&crop=center",
    },
  ];

  const mostFavourite = [
    "https://images.unsplash.com/photo-1519167758481-83f29c8a0c0b?w=100&h=100&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=100&h=100&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center",
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-maroon-800">Categories</h2>
          <button
            className="text-maroon-600 text-sm font-medium hover:text-maroon-700"
            onClick={() => navigate("/venues")}
          >
            See All
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate("/venues")}
            >
              <div className="w-20 h-20 bg-gray-100 rounded-xl mb-2 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-700 font-medium">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Items Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-maroon-800">Featured Items</h2>
          <button
            className="text-maroon-600 text-sm font-medium hover:text-maroon-700"
            onClick={() => navigate("/venues")}
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredVenues.map((venue) => (
            <Card
              key={venue.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <div className="relative">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Share2
                    size={16}
                    className="text-white bg-black/30 rounded-full p-1"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Heart
                    size={16}
                    className="text-white bg-black/30 rounded-full p-1"
                  />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center bg-black/30 rounded-full px-2 py-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span className="text-white text-xs ml-1">
                    {venue.rating}
                  </span>
                  <span className="text-white text-xs ml-1">
                    {venue.reviews}+
                  </span>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {venue.name}
                </h3>
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin size={12} className="mr-1" />
                  <span>Location: {venue.location}</span>
                </div>
                <p className="text-maroon-600 font-bold text-sm">
                  {venue.price}৳/day
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Most Favourite Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-maroon-800">Most Favourite</h2>
          <button
            className="text-maroon-600 text-sm font-medium hover:text-maroon-700"
            onClick={() => navigate("/venues")}
          >
            See All
          </button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {mostFavourite.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate("/venues")}
            >
              <img
                src={image}
                alt={`Favourite ${index + 1}`}
                className="w-20 h-20 rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/search")}
          className="py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group border-maroon-600 text-maroon-600 hover:bg-maroon-50"
        >
          <SearchIcon size={20} className="mr-2 group-hover:animate-pulse" />
          Search Venues
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/bookings")}
          className="py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group border-maroon-600 text-maroon-600 hover:bg-maroon-50"
        >
          <Calendar size={20} className="mr-2 group-hover:animate-pulse" />
          My Bookings
        </Button>
      </div>
    </div>
  );
};
