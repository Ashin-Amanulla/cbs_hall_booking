// Format currency
export const formatCurrency = (amount, currency = "OMR") => {
  return new Intl.NumberFormat("en-OM", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Format date
export const formatDate = (date, format = "short") => {
  const d = new Date(date);

  if (format === "short") {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (format === "time") {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toISOString();
};

// Format relative time
export const formatRelativeTime = (date) => {
  const now = new Date();
  const d = new Date(date);
  const diff = now - d;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(date, "short");
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    available: "text-green-600 bg-green-50 dark:bg-green-900/20",
    booked: "text-red-600 bg-red-50 dark:bg-red-900/20",
    pending: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    confirmed: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    completed: "text-gray-600 bg-gray-50 dark:bg-gray-900/20",
    cancelled: "text-red-600 bg-red-50 dark:bg-red-900/20",
    ready: "text-green-600 bg-green-50 dark:bg-green-900/20",
    preparing: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    requested: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
  };

  return colors[status] || "text-gray-600 bg-gray-50";
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Generate random ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return regex.test(phone);
};

// Calculate booking total
export const calculateBookingTotal = (venue, addons = []) => {
  const venuePrice = venue.price || 0;
  const addonsTotal = addons.reduce(
    (sum, addon) => sum + (addon.price || 0),
    0
  );
  return venuePrice + addonsTotal;
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
