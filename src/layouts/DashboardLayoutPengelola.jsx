import { useEffect, useState } from "react";
import PengelolaSidebar from "../components/Sidebar/PengelolaSidebar";
import HeaderPengelola from "../components/Header/HeaderPengelola";
import { useNavigate } from "react-router-dom";

const DashboardLayoutPengelola = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "pengelola") {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-white">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <PengelolaSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HeaderPengelola
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="container mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DashboardLayoutPengelola;
