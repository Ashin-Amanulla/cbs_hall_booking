import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  Search,
  MapPin,
  Users,
  Star,
  Sparkles,
  Heart,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Input, Select } from "../components/Input";
import { mockVenues } from "../utils/mockData";
import { formatCurrency, getStatusColor } from "../utils/helpers";

export const Venues = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [hotelFilter, setHotelFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const venues = mockVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.hotel.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || venue.type === typeFilter;
    const matchesHotel = !hotelFilter || venue.hotel === hotelFilter;
    return matchesSearch && matchesType && matchesHotel;
  });

  const hotels = [...new Set(mockVenues.map((v) => v.hotel))];
  const types = [...new Set(mockVenues.map((v) => v.type))];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="text-maroon-600 animate-pulse" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Our Venues</h1>
        </div>
        <p className="text-gray-600">
          Discover the perfect venue for your event
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative animate-fadeIn">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 transform transition-all duration-300 focus:scale-105"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-maroon-600 font-medium hover:text-maroon-700 transition-colors duration-200 animate-slideIn"
      >
        <Filter size={20} />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters */}
      {showFilters && (
        <Card className="p-6 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Hotel"
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              options={hotels.map((h) => ({ value: h, label: h }))}
              placeholder="All Hotels"
            />
            <Select
              label="Venue Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={types.map((t) => ({
                value: t,
                label: t
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()),
              }))}
              placeholder="All Types"
            />
          </div>
          {(typeFilter || hotelFilter) && (
            <button
              onClick={() => {
                setTypeFilter("");
                setHotelFilter("");
              }}
              className="text-sm text-gray-600 hover:text-maroon-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          )}
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between animate-fadeIn">
        <p className="text-sm text-gray-600">
          {venues.length} venue{venues.length !== 1 ? "s" : ""} found
        </p>
        <button
          onClick={() => navigate("/calendar")}
          className="flex items-center gap-1 text-maroon-600 text-sm font-medium hover:text-maroon-700 transition-colors duration-200"
        >
          <Calendar size={16} />
          View Calendar
        </button>
      </div>

      {/* Venues List */}
      <div className="space-y-6">
        {venues.map((venue, index) => (
          <Card
            key={venue.id}
            onClick={() => navigate(`/venues/${venue.id}`)}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${getStatusColor(
                  venue.status
                )}`}
              >
                {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
              </span>

              <button className="absolute top-4 left-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Heart size={16} className="text-red-500" />
              </button>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-maroon-600" size={16} />
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-maroon-600 transition-colors duration-200">
                    {venue.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{venue.hotel}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.8</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                {venue.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-maroon-50 rounded-lg">
                    <Users className="text-maroon-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Capacity
                    </p>
                    <p className="font-semibold text-gray-900">
                      {venue.capacity} guests
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">
                    Starting from
                  </p>
                  <p className="font-bold text-maroon-600 text-xl">
                    {formatCurrency(venue.price)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {venues.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No venues found
          </h3>
          <p className="text-gray-500 mb-4">
            No venues found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("");
              setHotelFilter("");
            }}
            className="text-maroon-600 hover:text-maroon-700 font-medium transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
