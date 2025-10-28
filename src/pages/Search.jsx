import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Input } from "../components/Input";

export const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedTags = [
    "Best Wedding place",
    "Party place",
    "Birthday party",
    "Cheapest venue",
    "Seminar venue",
    "1 seat hall room",
  ];

  const searchResults = [
    {
      id: 1,
      name: "Tajmahal Community Hall",
      location: "Dhaka, mirpur 2",
      price: 4000,
      rating: 4,
      reviews: 200,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAuLMqOZJU_VWdVM-lEIAe6KzR0pfH1wE6w&s",
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
    {
      id: 3,
      name: "King & Queen Wedding Hall",
      location: "Dhaka, Dhanmondi",
      price: 5000,
      rating: 5,
      reviews: 150,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop&crop=center",
    },
  ];

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
            <h1 className="text-xl font-bold text-gray-900">Search</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <SearchIcon size={20} className="text-maroon-600" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Suggested Tags */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Suggested</h2>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-maroon-100 hover:text-maroon-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Search Results
          </h2>
          <div className="space-y-4">
            {searchResults.map((venue) => (
              <Card
                key={venue.id}
                onClick={() => navigate(`/venues/${venue.id}`)}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {venue.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-current mr-1"
                        />
                        <span className="text-sm text-gray-600">
                          {venue.rating}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({venue.reviews})
                        </span>
                      </div>
                      <span className="text-maroon-600 font-bold">
                        {venue.price}৳/day
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

