import { Search, Menu, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = ({ title, showMenu = false, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Grid3X3 size={24} className="text-maroon-600" />
            </button>
          )}
          <h1 className="text-xl font-bold text-maroon-800 uppercase">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/search")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-maroon-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
