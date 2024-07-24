import React, { useEffect, useState } from "react";
import DashboardLayoutPengelola from "../../layouts/DashboardLayoutPengelola";
import { countConsultation } from "../../services/allrole";
import BgCard from "../../assets/images/bgauth.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const DashboardPengelola = () => {
  const [data, setData] = useState(0);
  const [user, setUser] = useState(0);
  const [pakar, setPakar] = useState(0);
  const [tenant, setTenant] = useState(0);

  const countUsers = async () => {
    const usersCollection = collection(db, "user");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setUser(count);
  };

  const countPakar = async () => {
    const usersCollection = collection(db, "pakar");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setPakar(count);
  };

  const countTenant = async () => {
    const usersCollection = collection(db, "tenant");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setTenant(count);
  };

  useEffect(() => {
    const updateCountConsultation = (total) => {
      setData(total);
    };

    countConsultation(updateCountConsultation);
    countUsers();
    countPakar();
    countTenant();
  }, []);

  return (
    <DashboardLayoutPengelola>
      <h1 className="text-2xl font-bold text-quaternary">Dashboard</h1>
      <div className="py-10 grid grid-cols-2 xl:grid-cols-4 w-full gap-4 justify-items-center">
        <div className="bg-primary rounded-lg w-full h-44 relative ">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Konsultasi : {data}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Pengguna : {user}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Pakar : {pakar}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Tenant : {tenant}
          </h1>
        </div>
      </div>
    </DashboardLayoutPengelola>
  );
};

export default DashboardPengelola;
