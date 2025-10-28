import { Outlet } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";

export const MainLayout = ({
  title = "Intercity Hotels",
  showMenu = false,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <Header title={title} showMenu={showMenu} />
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};
