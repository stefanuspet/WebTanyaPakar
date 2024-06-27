// import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-secondary">
      <div className="flex">
        <Sidebar />
        <Navbar />
      </div>
      
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
