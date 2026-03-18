import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart3, Medal, User } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Progress", icon: BarChart3, path: "/progress" },
  { label: "Badges", icon: Medal, path: "/badges" },
  { label: "Profile", icon: User, path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on lesson and complete screens
  if (location.pathname === "/lesson" || location.pathname === "/complete") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path || (path === "/" && location.pathname === "/");
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors btn-press"
            >
              <div
                className={`flex items-center justify-center w-10 h-8 rounded-pill transition-colors ${
                  isActive ? "bg-primary/15" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-primary" : "text-muted-foreground"}
                />
              </div>
              <span
                className={`text-[10px] font-semibold ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
