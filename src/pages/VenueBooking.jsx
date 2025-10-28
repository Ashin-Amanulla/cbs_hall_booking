import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  Check,
  Sparkles,
  Monitor,
  Speaker,
  Mic,
  Lightbulb,
  Wifi,
  Thermometer,
  Car,
  Shield,
  Utensils,
  Palette,
  Coffee,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Input, Select, Textarea } from "../components/Input";
import { mockVenues, mockAmenities, mockAvailability } from "../utils/mockData";
import { formatCurrency, calculateBookingTotal } from "../utils/helpers";

const STEPS = [
  {
    name: "Select Venue",
    icon: MapPin,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Choose Date",
    icon: Calendar,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    name: "Pick Time",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    name: "Add Amenities",
    icon: Star,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    name: "Confirm",
    icon: Check,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
];

const iconMap = {
  monitor: Monitor,
  speaker: Speaker,
  mic: Mic,
  lightbulb: Lightbulb,
  wifi: Wifi,
  thermometer: Thermometer,
  car: Car,
  shield: Shield,
  utensils: Utensils,
  palette: Palette,
  coffee: Coffee,
};

export const VenueBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [formData, setFormData] = useState({
    guests: "",
    specialRequests: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const venues = mockVenues.filter((v) => v.status === "available");
  const availability = selectedVenue
    ? mockAvailability[selectedVenue.id] || {}
    : {};
  const timeSlots = selectedDate ? availability[selectedDate]?.slots || [] : [];

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setSelectedDate(null);
    setSelectedTime(null);
    handleNext();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    if (availability[date]?.status === "available") {
      handleNext();
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    handleNext();
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const selectedAmenitiesData = mockAmenities.filter((a) =>
    selectedAmenities.includes(a.id)
  );
  const totalCost = selectedVenue
    ? calculateBookingTotal(selectedVenue, selectedAmenitiesData)
    : 0;

  const handleSubmit = () => {
    alert("Booking submitted successfully!");
    navigate("/bookings");
  };

  const getAvailabilityColor = (date) => {
    const dayAvailability = availability[date];
    if (!dayAvailability) return "bg-gray-100 dark:bg-gray-800";

    switch (dayAvailability.status) {
      case "available":
        return "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700";
      case "partial":
        return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700";
      case "booked":
        return "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getAvailabilityText = (date) => {
    const dayAvailability = availability[date];
    if (!dayAvailability) return "No data";

    switch (dayAvailability.status) {
      case "available":
        return "Available";
      case "partial":
        return "Limited";
      case "booked":
        return "Booked";
      default:
        return "Unknown";
    }
  };

  // Generate next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-soft"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl shadow-glow">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Book a Venue
            </h1>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-8">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.name} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold mb-3 transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-r from-success-500 to-success-600 text-white scale-110 shadow-glow"
                        : isActive
                        ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white scale-110 shadow-glow-purple ring-4 ring-primary-200 dark:ring-primary-800"
                        : "bg-white/60 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 shadow-soft"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={18} className="animate-bounce-gentle" />
                    ) : (
                      <StepIcon
                        size={18}
                        className={isActive ? "animate-pulse-slow" : ""}
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm text-center font-semibold transition-colors duration-300 ${
                      isActive || isCompleted
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-r from-success-500 to-success-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Step 1: Select Venue */}
        {currentStep === 0 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mb-4 shadow-glow">
                <MapPin className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Choose Your Venue
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Select the perfect venue for your special event
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {venues.map((venue, index) => (
                <Card
                  key={venue.id}
                  onClick={() => handleVenueSelect(venue)}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-large bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-medium animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={venue.images[0]}
                      alt={venue.name}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-4 py-2 rounded-2xl shadow-large backdrop-blur-sm">
                      <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        {formatCurrency(venue.price)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                          <MapPin className="text-white" size={16} />
                        </div>
                        <span className="text-white font-medium text-sm">
                          {venue.hotel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl">
                        <Sparkles
                          className="text-primary-600 dark:text-primary-400"
                          size={18}
                        />
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {venue.name}
                      </h3>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                      {venue.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl">
                          <Users
                            className="text-primary-600 dark:text-primary-400"
                            size={18}
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                            Capacity
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {venue.capacity} guests
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                          Starting from
                        </p>
                        <p className="font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent text-2xl">
                          {formatCurrency(venue.price)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Date */}
        {currentStep === 1 && selectedVenue && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl mb-4 shadow-glow">
                <Calendar className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Select Date
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Choose your preferred date for{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {selectedVenue.name}
                </span>
              </p>
            </div>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-large">
              <CardContent className="p-8">
                <div className="grid grid-cols-7 gap-3">
                  {dates.slice(0, 14).map((date, index) => {
                    const dayAvailability = availability[date];
                    const isSelected = selectedDate === date;

                    return (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        disabled={
                          !dayAvailability ||
                          dayAvailability.status === "booked"
                        }
                        className={`p-4 rounded-2xl text-center transition-all duration-500 hover:scale-105 ${
                          isSelected
                            ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white scale-110 shadow-glow-purple"
                            : dayAvailability?.status === "available"
                            ? "bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 text-success-800 dark:text-success-200 hover:from-success-100 hover:to-success-200 dark:hover:from-success-900/30 dark:hover:to-success-800/30 shadow-soft"
                            : dayAvailability?.status === "partial"
                            ? "bg-gradient-to-r from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 text-warning-800 dark:text-warning-200 hover:from-warning-100 hover:to-warning-200 dark:hover:from-warning-900/30 dark:hover:to-warning-800/30 shadow-soft"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1">
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-xl font-bold mb-1">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs font-medium">
                          {dayAvailability ? getAvailabilityText(date) : "N/A"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Pick Time */}
        {currentStep === 2 && selectedDate && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl mb-4 shadow-glow-purple">
                <Clock className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Select Time Slot
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Choose your preferred time for{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {new Date(selectedDate).toLocaleDateString()}
                </span>
              </p>
            </div>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-large">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {timeSlots.map((time, index) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-6 rounded-2xl text-center transition-all duration-500 hover:scale-105 group ${
                        selectedTime === time
                          ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white scale-105 shadow-glow-purple"
                          : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white hover:from-primary-50 hover:to-accent-50 dark:hover:from-primary-900/20 dark:hover:to-accent-900/20 shadow-soft"
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div
                        className={`mx-auto mb-3 p-3 rounded-xl ${
                          selectedTime === time
                            ? "bg-white/20"
                            : "bg-primary-100 dark:bg-primary-900/20 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30"
                        }`}
                      >
                        <Clock
                          className={`mx-auto ${
                            selectedTime === time
                              ? "text-white"
                              : "text-primary-600 dark:text-primary-400"
                          }`}
                          size={24}
                        />
                      </div>
                      <div className="font-bold text-lg">{time}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Add Amenities */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl mb-4 shadow-glow">
                <Star className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Add Amenities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Select additional amenities for your event (optional)
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(
                mockAmenities.reduce((acc, amenity) => {
                  if (!acc[amenity.category]) acc[amenity.category] = [];
                  acc[amenity.category].push(amenity);
                  return acc;
                }, {})
              ).map(([category, amenities], categoryIndex) => (
                <Card
                  key={category}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-medium transform transition-all duration-500 hover:scale-105 hover:shadow-large"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-warning-100 to-warning-200 dark:from-warning-900/20 dark:to-warning-800/20 rounded-xl">
                        <Star
                          className="text-warning-600 dark:text-warning-400"
                          size={20}
                        />
                      </div>
                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                        {category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {amenities.map((amenity, index) => {
                        const IconComponent = iconMap[amenity.icon] || Star;
                        const isSelected = selectedAmenities.includes(
                          amenity.id
                        );

                        return (
                          <button
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`p-6 rounded-2xl text-left transition-all duration-500 hover:scale-105 group ${
                              isSelected
                                ? "bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 border-2 border-primary-300 dark:border-primary-700 scale-105 shadow-glow"
                                : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-soft"
                            }`}
                            style={{
                              animationDelay: `${
                                categoryIndex * 200 + index * 100
                              }ms`,
                            }}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                  isSelected
                                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white scale-110"
                                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                                }`}
                              >
                                <IconComponent size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    {amenity.name}
                                  </h4>
                                  <span className="font-bold text-lg bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                    {amenity.price === 0
                                      ? "Free"
                                      : formatCurrency(amenity.price)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {amenity.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Confirm */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl mb-4 shadow-glow">
                <Check className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Confirm Your Booking
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Review your booking details and confirm
              </p>
            </div>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-large transform transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-3">
                      Booking Summary
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                        Venue:
                      </span>
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {selectedVenue?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                        Date:
                      </span>
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                        Time:
                      </span>
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {selectedTime}
                      </span>
                    </div>
                  </div>

                  {selectedAmenitiesData.length > 0 && (
                    <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
                      <p className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                        Selected Amenities:
                      </p>
                      <div className="space-y-3">
                        {selectedAmenitiesData.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl"
                          >
                            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                              {amenity.name}
                            </span>
                            <span className="text-gray-900 dark:text-white font-bold text-lg">
                              {amenity.price === 0
                                ? "Free"
                                : formatCurrency(amenity.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
                    <div className="flex justify-between items-center bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 rounded-2xl">
                      <span className="font-bold text-2xl text-gray-900 dark:text-white">
                        Total:
                      </span>
                      <span className="font-bold text-4xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        {formatCurrency(totalCost)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-large transform transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl">
                    <Users
                      className="text-primary-600 dark:text-primary-400"
                      size={20}
                    />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                    Contact Information
                  </h3>
                </div>
                <div className="space-y-6">
                  <Input
                    label="Full Name"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    required
                    className="text-lg"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, contactEmail: e.target.value })
                    }
                    placeholder="Enter your email"
                    required
                    className="text-lg"
                  />
                  <Input
                    label="Phone"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    required
                    className="text-lg"
                  />
                  <Input
                    label="Number of Guests"
                    type="number"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    placeholder={`Max ${selectedVenue?.capacity}`}
                    required
                    className="text-lg"
                  />
                  <Textarea
                    label="Special Requests (Optional)"
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    placeholder="Any special requirements or requests..."
                    rows={4}
                    className="text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 p-6 shadow-large">
        <div className="max-w-screen-xl mx-auto flex gap-4">
          {currentStep < STEPS.length - 1 ? (
            <Button
              fullWidth
              size="lg"
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !selectedVenue) ||
                (currentStep === 1 && !selectedDate) ||
                (currentStep === 2 && !selectedTime)
              }
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold text-lg py-4 rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              <span className="flex items-center justify-center gap-3">
                Continue
                <ArrowLeft className="rotate-180" size={20} />
              </span>
            </Button>
          ) : (
            <Button
              fullWidth
              size="lg"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white font-bold text-lg py-4 rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-glow"
            >
              <span className="flex items-center justify-center gap-3">
                <Check size={20} />
                Confirm Booking
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
