import {
  Users,
  Utensils,
  Bath,
  UserCheck,
  Gamepad2,
  Clock,
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Users,
      label: "1000+ Guest Seats",
    },
    {
      icon: Utensils,
      label: "200+ Dining Table",
    },
    {
      icon: Bath,
      label: "10+ Rest Rooms",
    },
    {
      icon: UserCheck,
      label: "100+ Waiters",
    },
    {
      icon: Gamepad2,
      label: "2 Playgrounds",
    },
    {
      icon: Clock,
      label: "5 Waiting Rooms",
    },
  ];

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold text-maroon-800 mb-4">Features</h2>
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <feature.icon size={20} className="text-maroon-600" />
            </div>
            <p className="text-xs text-gray-700 font-medium">{feature.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
