import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-background relative">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
