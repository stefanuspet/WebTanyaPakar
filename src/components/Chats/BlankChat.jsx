import React from "react";
import LOGO from "../../assets/images/logo_agrikonsultasi3.png";

const BlankChat = () => {
  return (
    <div className="w-full max-h-[calc(100vh-172px)] ">
      <div className="min-h-[calc(100vh-250px)] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={LOGO} alt="Logo" className="w-31 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Tanya Pakar</h1>
          <p className="text-lg">Pilih chat untuk memulai</p>
        </div>
      </div>
    </div>
  );
};

export default BlankChat;
