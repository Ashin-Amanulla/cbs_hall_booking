import { useState } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/Card";
import { Button } from "../components/Button";
import { Select } from "../components/Input";
import { mockResources, mockBookings } from "../utils/mockData";
import { formatDate, getStatusColor } from "../utils/helpers";

export const ManagerResources = () => {
  const [selectedBooking, setSelectedBooking] = useState(
    mockBookings[0].id.toString()
  );
  const bookingResources = mockResources.filter(
    (r) => r.bookingId === parseInt(selectedBooking)
  );

  const booking = mockBookings.find((b) => b.id === parseInt(selectedBooking));

  const getStatusIcon = (status) => {
    switch (status) {
      case "ready":
        return CheckCircle;
      case "preparing":
        return Clock;
      case "requested":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const handleStatusUpdate = (resourceId, newStatus) => {
    // Handle status update
    alert(`Resource status updated to: ${newStatus}`);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Resource Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage event resources and preparations
        </p>
      </div>

      {/* Booking Selector */}
      <Select
        label="Select Booking"
        value={selectedBooking}
        onChange={(e) => setSelectedBooking(e.target.value)}
        options={mockBookings.map((b) => ({
          value: b.id.toString(),
          label: `${b.venueName} - ${formatDate(b.date, "short")}`,
        }))}
      />

      {/* Booking Details */}
      {booking && (
        <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <CardContent className="space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white">
              {booking.venueName}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(booking.date, "short")}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Time</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Guests</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {booking.guests}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Checklist */}
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Resources Checklist
        </h3>

        <div className="space-y-4">
          {bookingResources.map((resource) => {
            const StatusIcon = getStatusIcon(resource.status);

            return (
              <Card key={resource.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          resource.status === "ready"
                            ? "bg-green-50 dark:bg-green-900/20"
                            : resource.status === "preparing"
                            ? "bg-amber-50 dark:bg-amber-900/20"
                            : "bg-blue-50 dark:bg-blue-900/20"
                        }`}
                      >
                        <StatusIcon
                          size={20}
                          className={
                            resource.status === "ready"
                              ? "text-green-600 dark:text-green-400"
                              : resource.status === "preparing"
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-blue-600 dark:text-blue-400"
                          }
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {resource.type}
                        </h4>
                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            resource.status
                          )}`}
                        >
                          {resource.status.charAt(0).toUpperCase() +
                            resource.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Items:
                    </p>
                    <ul className="space-y-1">
                      {resource.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Update Buttons */}
                  {resource.status !== "ready" && (
                    <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                      {resource.status === "requested" && (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() =>
                            handleStatusUpdate(resource.id, "preparing")
                          }
                        >
                          Start Preparing
                        </Button>
                      )}
                      {resource.status === "preparing" && (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() =>
                            handleStatusUpdate(resource.id, "ready")
                          }
                        >
                          Mark as Ready
                        </Button>
                      )}
                    </div>
                  )}

                  {resource.status === "ready" && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium pt-3 border-t border-gray-200 dark:border-gray-700">
                      <CheckCircle size={16} />
                      Ready for event
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center py-4">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {bookingResources.filter((r) => r.status === "ready").length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Ready
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {bookingResources.filter((r) => r.status === "preparing").length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Preparing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {bookingResources.filter((r) => r.status === "requested").length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Requested
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
