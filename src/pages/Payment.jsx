import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Input, Select } from "../components/Input";

export const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");

  const paymentMethods = [
    { value: "bkash", label: "Bkash" },
    { value: "rocket", label: "Rocket" },
    { value: "nagad", label: "Nagad" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Payment submitted");
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
            <h1 className="text-xl font-bold text-maroon-800">Payment</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-maroon-600" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Booking Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=80&h=80&fit=crop&crop=center"
                alt="Convention Hall Dhaka"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Convention Hall Dhaka
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Location: Dhaka, mirpur 2
                </p>
                <p className="text-sm text-gray-600 mb-2">25 Sep to 27 Sep</p>
                <p className="text-lg font-bold text-maroon-600">
                  Total to pay: 12000TK
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descriptions */}
        <div>
          <h2 className="text-lg font-bold text-maroon-800 mb-3">
            Descriptions
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            From Bkash, Rocket or Nagad cash out your total booking amount
            tk12000 to 017******* number then fill up the form below.
          </p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-bold text-maroon-800 mb-3">
            Payment Form
          </h2>

          <Select
            label="Select your payment way"
            options={paymentMethods}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Choose payment method"
            required
          />

          <Input
            label="Your payment mobile number"
            type="tel"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />

          <Input
            label="Transactions numbers"
            type="text"
            placeholder="Enter transaction number"
            value={transactionNumber}
            onChange={(e) => setTransactionNumber(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

