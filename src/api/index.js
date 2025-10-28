// API Base URL - Update this with your backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  logout: () => apiRequest("/auth/logout", { method: "POST" }),

  getCurrentUser: () => apiRequest("/auth/me"),
};

// Venues API
export const venuesAPI = {
  getAll: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/venues?${queryString}`);
  },

  getById: (id) => apiRequest(`/venues/${id}`),

  checkAvailability: (venueId, date) =>
    apiRequest(`/venues/${venueId}/availability?date=${date}`),

  create: (venueData) =>
    apiRequest("/venues", {
      method: "POST",
      body: JSON.stringify(venueData),
    }),

  update: (id, venueData) =>
    apiRequest(`/venues/${id}`, {
      method: "PUT",
      body: JSON.stringify(venueData),
    }),

  delete: (id) => apiRequest(`/venues/${id}`, { method: "DELETE" }),
};

// Bookings API
export const bookingsAPI = {
  getAll: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/bookings?${queryString}`);
  },

  getById: (id) => apiRequest(`/bookings/${id}`),

  create: (bookingData) =>
    apiRequest("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  update: (id, bookingData) =>
    apiRequest(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
    }),

  cancel: (id) =>
    apiRequest(`/bookings/${id}/cancel`, {
      method: "POST",
    }),

  reschedule: (id, newDate) =>
    apiRequest(`/bookings/${id}/reschedule`, {
      method: "POST",
      body: JSON.stringify({ newDate }),
    }),
};

// Wallet API
export const walletAPI = {
  getBalance: () => apiRequest("/wallet/balance"),

  getTransactions: () => apiRequest("/wallet/transactions"),

  getRewards: () => apiRequest("/wallet/rewards"),

  earnPoints: (data) =>
    apiRequest("/wallet/earn", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  redeemPoints: (data) =>
    apiRequest("/wallet/redeem", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  scanQR: (qrCode) =>
    apiRequest("/wallet/scan", {
      method: "POST",
      body: JSON.stringify({ qrCode }),
    }),
};

// Analytics API
export const analyticsAPI = {
  getOccupancy: (hotelId, dateRange) => {
    const params = new URLSearchParams({ hotelId, ...dateRange }).toString();
    return apiRequest(`/analytics/occupancy?${params}`);
  },

  getRevenue: (hotelId, dateRange) => {
    const params = new URLSearchParams({ hotelId, ...dateRange }).toString();
    return apiRequest(`/analytics/revenue?${params}`);
  },

  getPopularVenues: (hotelId) =>
    apiRequest(`/analytics/popular-venues?hotelId=${hotelId}`),
};

// Resources API
export const resourcesAPI = {
  getAll: () => apiRequest("/resources"),

  getByBooking: (bookingId) => apiRequest(`/resources/booking/${bookingId}`),

  updateStatus: (resourceId, status) =>
    apiRequest(`/resources/${resourceId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => apiRequest("/notifications"),

  markAsRead: (id) =>
    apiRequest(`/notifications/${id}/read`, {
      method: "PATCH",
    }),

  markAllAsRead: () =>
    apiRequest("/notifications/read-all", {
      method: "PATCH",
    }),
};
