import { Home, Heart, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Heart, label: "Favourite", path: "/favourites" },
  { icon: MessageCircle, label: "Message", path: "/messages" },
  { icon: User, label: "Account", path: "/profile" },
];

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors relative ${
              isActive(path) ? "text-white" : "text-maroon-600"
            }`}
          >
            {isActive(path) && (
              <div className="absolute inset-0 bg-maroon-600 rounded-full mx-2 my-1"></div>
            )}
            <Icon
              size={24}
              className={`relative z-10 ${
                isActive(path) ? "stroke-[2.5]" : "stroke-2"
              }`}
            />
            <span
              className={`text-xs mt-1 font-medium relative z-10 ${
                isActive(path) ? "text-white" : "text-maroon-600"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
