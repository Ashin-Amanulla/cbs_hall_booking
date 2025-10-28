import {
  TrendingUp,
  Building2,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/Card";
import { mockAnalytics } from "../utils/mockData";
import { formatCurrency } from "../utils/helpers";

export const AdminDashboard = () => {
  const { revenue, popularVenues, occupancy } = mockAnalytics;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(revenue.total),
      change: `+${revenue.growth}%`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "This Month",
      value: formatCurrency(revenue.thisMonth),
      change: "Revenue",
      icon: TrendingUp,
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
    {
      label: "Total Bookings",
      value: "143",
      change: "+8 this week",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Active Venues",
      value: "12",
      change: "4 hotels",
      icon: Building2,
      color: "text-accent-600",
      bg: "bg-accent-50 dark:bg-accent-900/20",
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of all hotel properties
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="space-y-3">
              <div className={`inline-flex p-2 rounded-lg ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Occupancy Chart */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Occupancy Rate (Last 6 Months)
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {occupancy.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.month}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Venues */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Most Booked Venues
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularVenues.map((venue, index) => (
              <div
                key={venue.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {venue.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {venue.bookings}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    bookings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="text-center py-6">
            <Building2
              size={32}
              className="mx-auto text-primary-600 dark:text-primary-400 mb-2"
            />
            <p className="font-medium text-gray-900 dark:text-white">
              Manage Venues
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="text-center py-6">
            <Users
              size={32}
              className="mx-auto text-accent-600 dark:text-accent-400 mb-2"
            />
            <p className="font-medium text-gray-900 dark:text-white">
              Manage Staff
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
