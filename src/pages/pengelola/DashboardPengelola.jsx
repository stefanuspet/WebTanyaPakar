import React, { useEffect, useState } from "react";
import DashboardLayoutPengelola from "../../layouts/DashboardLayoutPengelola";
import { countConsultation } from "../../services/allrole";
import BgCard from "../../assets/images/bgauth.png";

const DashboardPengelola = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const updateCountConsultation = (total) => {
      setData(total);
    };

    countConsultation(updateCountConsultation);
  }, []);

  return (
    <DashboardLayoutPengelola>
      <h1 className="text-2xl font-bold text-quaternary">Dashboard</h1>
      <div className="py-10 grid grid-cols-2 w-full justify-items-center">
        <div className="bg-primary rounded-lg w-96 h-44 relative ">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Konsultasi : {data}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-96 h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Log Tenant : 0
          </h1>
        </div>
      </div>
    </DashboardLayoutPengelola>
  );
};

export default DashboardPengelola;
