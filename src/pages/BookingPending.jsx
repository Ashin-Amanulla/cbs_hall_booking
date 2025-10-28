import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Clock as ClockIcon,
  Users,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";

export const BookingPending = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    name: "Adnan Ahmed",
    date: "25/9/2021 to 27/9/2021",
    contact: "+880 1712345678",
    purpose: "Wedding Ceremony",
    totalPaid: "12,000tk",
    transactionNo: "TX123456789",
    venue: "Convention Hall Dhaka",
    location: "Dhaka, mirpur 2",
    price: "4000tk/day",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=80&h=80&fit=crop&crop=center",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-maroon-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Booking Info</h1>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Venue Details Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={bookingDetails.image}
                alt={bookingDetails.venue}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {bookingDetails.venue}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Location: {bookingDetails.location}
                </p>
                <p className="text-sm text-gray-600">{bookingDetails.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Pending Card */}
        <Card className="border-2 border-yellow-500 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">
              Booking Pending
            </h2>
            <p className="text-yellow-700 font-medium">
              We will get back to you soon!
            </p>
          </CardContent>
        </Card>

        {/* Contact Button */}
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/messages")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Contact us!
        </Button>

        {/* Booking Details */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Booking Details
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Date:</span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Contact:</span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.contact}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Purpose:</span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.purpose}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Paid:</span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.totalPaid}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Transaction No:
                </span>
                <span className="text-gray-900 font-semibold">
                  {bookingDetails.transactionNo}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

