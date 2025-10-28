import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { mockBookings } from "../utils/mockData";
import { formatCurrency, formatDate, getStatusColor } from "../utils/helpers";

export const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = mockBookings.filter(
    (b) =>
      new Date(b.date) >= new Date() &&
      b.status !== "completed" &&
      b.status !== "cancelled"
  );

  const pastBookings = mockBookings.filter(
    (b) => new Date(b.date) < new Date() || b.status === "completed"
  );

  const bookingsToShow =
    activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "upcoming"
              ? "bg-white text-maroon-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "past"
              ? "bg-white text-maroon-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Past ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      {bookingsToShow.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No {activeTab} bookings found</p>
          <Button onClick={() => navigate("/venues")}>Browse Venues</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookingsToShow.map((booking) => (
            <Card
              key={booking.id}
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              <CardContent className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {booking.venueName}
                    </h3>
                    <p className="text-sm text-gray-600">{booking.hotel}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={16} className="text-gray-500" />
                    <span>{formatDate(booking.date, "short")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={16} className="text-gray-500" />
                    <span>
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users size={16} className="text-gray-500" />
                    <span>{booking.guests} guests</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-maroon-600">
                      {formatCurrency(booking.totalCost)}
                    </p>
                  </div>
                </div>

                {/* Add-ons */}
                {booking.addons && booking.addons.length > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Add-ons:</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.addons.map((addon, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {activeTab === "upcoming" && booking.status === "confirmed" && (
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle reschedule
                      }}
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle cancel
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {/* View Details Arrow */}
                <div className="flex items-center justify-end text-maroon-600 text-sm font-medium">
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
