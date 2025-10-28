import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Calendar,
  Clock,
  Users,
  Star,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Input, Select, Textarea } from "../components/Input";
import { mockVenues, mockAddons } from "../utils/mockData";
import { formatCurrency, calculateBookingTotal } from "../utils/helpers";

const STEPS = [
  {
    name: "Date & Time",
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Venue Details",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    name: "Add-ons",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    name: "Confirmation",
    icon: CreditCard,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
];

export const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    guests: "",
    selectedAddons: [],
    specialRequests: "",
  });

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

  const selectedAddonsData = mockAddons.filter((addon) =>
    formData.selectedAddons.includes(addon.id)
  );

  const totalCost = calculateBookingTotal(venue, selectedAddonsData);

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

  const getStepIcon = (stepIndex) => {
    const step = STEPS[stepIndex];
    return step ? step.icon : Check;
  };

  const handleSubmit = () => {
    // Handle booking submission
    // Simulate random booking status for demo
    const statuses = ["accepted", "pending"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (randomStatus === "accepted") {
      navigate("/booking-accepted");
    } else {
      navigate("/booking-pending");
    }
  };

  const toggleAddon = (addonId) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }));
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 mb-4 hover:text-maroon-600 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-maroon-50 rounded-xl">
            <Sparkles className="text-maroon-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Book {venue.name}
            </h1>
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {STEPS.length}
            </p>
          </div>
        </div>

        {/* Enhanced Steps */}
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.name} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-maroon-600 text-white scale-110"
                        : isActive
                        ? "bg-maroon-100 text-maroon-600 scale-110 ring-2 ring-maroon-200"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="animate-pulse" />
                    ) : (
                      <StepIcon
                        size={16}
                        className={isActive ? "animate-pulse" : ""}
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 text-center hidden sm:block font-medium">
                    {step.name}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                      isCompleted ? "bg-maroon-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6">
        {/* Step 1: Date & Time */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-3">
                <Calendar
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                When is your event?
              </h2>
              <p className="text-gray-600">
                Select your preferred date and time
              </p>
            </div>

            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="space-y-4">
                <Input
                  label="Event Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Time"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="End Time"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  label="Number of Guests"
                  type="number"
                  placeholder={`Max ${venue.capacity}`}
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  required
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Venue Details */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-green-50 dark:bg-green-900/20 rounded-xl mb-3">
                <Users
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Venue Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Review your selected venue and add special requests
              </p>
            </div>

            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(venue.price)}
                  </span>
                </div>
              </div>
              <CardContent className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {venue.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {venue.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Base Price
                  </span>
                  <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                    {formatCurrency(venue.price)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent>
                <Textarea
                  label="Special Requests (Optional)"
                  placeholder="Any special requirements or requests..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialRequests: e.target.value,
                    })
                  }
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Add-ons */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-3">
                <Star
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Add Extras
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select add-ons to enhance your event (optional)
              </p>
            </div>

            <div className="space-y-4">
              {mockAddons.map((addon, index) => (
                <Card
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
                    formData.selectedAddons.includes(addon.id)
                      ? "ring-2 ring-primary-600 scale-105 shadow-lg"
                      : "hover:ring-2 hover:ring-primary-200 dark:hover:ring-primary-800"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 ${
                        formData.selectedAddons.includes(addon.id)
                          ? "bg-primary-600 border-primary-600 scale-110"
                          : "border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-700"
                      }`}
                    >
                      {formData.selectedAddons.includes(addon.id) && (
                        <Check size={18} className="text-white animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {addon.name}
                        </h4>
                        <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                          {formatCurrency(addon.price)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {addon.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl mb-3">
                <CreditCard
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Confirm Your Booking
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Review your booking details and confirm
              </p>
            </div>

            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                    Booking Summary
                  </h3>
                  <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Venue:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {venue.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Date:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formData.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Time:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formData.startTime} - {formData.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Guests:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formData.guests}
                    </span>
                  </div>
                </div>

                {selectedAddonsData.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                      Add-ons:
                    </p>
                    <div className="space-y-2">
                      {selectedAddonsData.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {addon.name}
                          </span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {formatCurrency(addon.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl">
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="font-bold text-3xl text-primary-600 dark:text-primary-400">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock
                    className="text-amber-600 dark:text-amber-400"
                    size={20}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Confirmation Process
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Your booking will be confirmed within 24 hours. You will
                    receive an email notification once confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex gap-3">
          {currentStep < STEPS.length - 1 ? (
            <Button
              fullWidth
              size="lg"
              onClick={handleNext}
              className="bg-maroon-600 hover:bg-maroon-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Continue
              <ArrowRight className="ml-2" size={16} />
            </Button>
          ) : (
            <Button
              fullWidth
              size="lg"
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Check className="mr-2" size={16} />
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
