import {
  Bell,
  Calendar as CalendarIcon,
  Wallet,
  Tag,
  Check,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { mockNotifications } from "../utils/mockData";
import { formatRelativeTime } from "../utils/helpers";

export const Notifications = () => {
  const getIcon = (type) => {
    switch (type) {
      case "booking":
        return CalendarIcon;
      case "wallet":
        return Wallet;
      case "promotion":
        return Tag;
      default:
        return Bell;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "booking":
        return "text-primary-600 bg-primary-50 dark:bg-primary-900/20";
      case "wallet":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "promotion":
        return "text-accent-600 bg-accent-50 dark:bg-accent-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-700";
    }
  };

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm">
            <Check size={16} className="mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {mockNotifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <Bell size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            No notifications yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const iconColor = getIconColor(notification.type);

            return (
              <Card
                key={notification.id}
                className={`${
                  !notification.read
                    ? "ring-2 ring-primary-200 dark:ring-primary-800"
                    : ""
                }`}
              >
                <CardContent className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${iconColor} flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(notification.date)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
