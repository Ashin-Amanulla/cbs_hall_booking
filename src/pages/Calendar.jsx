import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../components/Card";
import { Select } from "../components/Input";
import { mockVenues, mockBookings } from "../utils/mockData";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedHotel, setSelectedHotel] = useState("");
  const [view, setView] = useState("month"); // 'week' or 'month'

  const hotels = [...new Set(mockVenues.map((v) => v.hotel))];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getBookingsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split("T")[0];
    return mockBookings.filter((b) => b.date === dateStr);
  };

  const getDayStatus = (date) => {
    if (!date) return null;
    const bookings = getBookingsForDate(date);
    if (bookings.length === 0) return "available";
    if (bookings.some((b) => b.status === "confirmed")) return "booked";
    return "pending";
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const statusColors = {
    available:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    booked: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    pending:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <Select
          label="Filter by Hotel"
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
          options={hotels.map((h) => ({ value: h, label: h }))}
          placeholder="All Hotels"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setView("week")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
              view === "week"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
              view === "month"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Pending</span>
          </div>
        </div>
      </Card>

      {/* Calendar */}
      <Card className="p-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {monthName}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const status = getDayStatus(date);
            const isToday =
              date && date.toDateString() === new Date().toDateString();

            return (
              <button
                key={index}
                className={`
                  aspect-square p-2 rounded-lg text-sm font-medium transition-colors
                  ${!date ? "invisible" : ""}
                  ${isToday ? "ring-2 ring-primary-600" : ""}
                  ${
                    status
                      ? statusColors[status]
                      : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }
                  hover:opacity-80
                `}
                disabled={!date}
              >
                {date && date.getDate()}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Bookings */}
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Upcoming Bookings
        </h3>
        <div className="space-y-3">
          {mockBookings
            .filter((b) => new Date(b.date) >= new Date())
            .slice(0, 3)
            .map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {booking.venueName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
