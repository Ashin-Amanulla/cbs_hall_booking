import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Trash2 } from "lucide-react";

export const Messages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chats");

  const chats = [
    {
      id: 1,
      name: "Convention Hall Dhaka",
      lastMessage: "Thank you for your booking!",
      time: "Today: 12:11 PM",
      avatar:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=50&h=50&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "King & Queen Wedding, BD",
      lastMessage: "Your event is confirmed",
      time: "Yesterday: 09:11 PM",
      avatar:
        "https://images.unsplash.com/photo-1519167758481-83f29c8a0c0b?w=50&h=50&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Seminars Hall Mirpur",
      lastMessage: "Please confirm your attendance",
      time: "12/11/21 - 12:11 PM",
      avatar:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=50&h=50&fit=crop&crop=center",
    },
  ];

  const tabs = [
    { id: "chats", label: "Chats" },
    { id: "booking", label: "Booking" },
    { id: "notifications", label: "Notifications" },
  ];

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
            <h1 className="text-xl font-bold text-maroon-800">Message</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-maroon-600" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-maroon-600 text-white"
                  : "text-maroon-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {chat.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              <div className="ml-2">
                {chat.id === 3 ? (
                  <Trash2 size={16} className="text-red-500" />
                ) : (
                  <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

