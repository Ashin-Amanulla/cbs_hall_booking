import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import { MainLayout } from "./layout/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth";
import { useThemeStore } from "./store/theme";
import { useEffect } from "react";

// Pages
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Venues } from "./pages/Venues";
import { VenueDetail } from "./pages/VenueDetail";
import { Calendar } from "./pages/Calendar";
import { Bookings } from "./pages/Bookings";
import { BookingForm } from "./pages/BookingForm";
import { VenueBooking } from "./pages/VenueBooking";
import { Wallet } from "./pages/Wallet";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import { Messages } from "./pages/Messages";
import { Payment } from "./pages/Payment";
import { Search } from "./pages/Search";
import { BookingAccepted } from "./pages/BookingAccepted";
import { BookingPending } from "./pages/BookingPending";
import { NoInternet } from "./pages/NoInternet";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ManagerResources } from "./pages/ManagerResources";

function App() {
  const { isAuthenticated } = useAuthStore();
  const { isDark } = useThemeStore();

  // Apply theme on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />

          {/* Protected Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout title="HALL BOOKING" />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/search" element={<Search />} />
          </Route>

          {/* Standalone Protected Routes (without bottom nav) */}
          <Route
            path="/venues/:id"
            element={
              <ProtectedRoute>
                <VenueDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <VenueBooking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-white">
                  <Notifications />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-accepted"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-white">
                  <BookingAccepted />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-pending"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-white">
                  <BookingPending />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/no-internet"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-white">
                  <NoInternet />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "hotel_admin"]}>
                <div className="min-h-screen bg-white">
                  <AdminDashboard />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="/manager/resources"
            element={
              <ProtectedRoute allowedRoles={["event_manager"]}>
                <div className="min-h-screen bg-white">
                  <ManagerResources />
                </div>
              </ProtectedRoute>
            }
          />

          {/* 404 - Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
