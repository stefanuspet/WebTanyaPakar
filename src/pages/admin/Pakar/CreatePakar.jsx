import React, { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { ToastContainer } from "react-toastify";

const CreatePakar = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log("submit");
  };

  const handleChange = () => {};

  return (
    <DashboardLayout>
      <ToastContainer
        position={window.innerWidth <= 768 ? "bottom-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex justify-between pb-2">
        <h1 className="text-2xl font-bold text-quaternary">
          Tambah Data Pakar
        </h1>
      </div>
      <div className="p-4 md:p-5 space-y-4">
        <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="nama"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nomor Telepon <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="nomor telepon"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Alamat <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="alamat"
              name="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name_tenant"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama Tenant <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="nama tenant"
              id="name_tenant"
              name="name_tenant"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="problems"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Masalah
            </label>
            <input
              type="description"
              placeholder="masalah"
              id="problems"
              name="problems"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="business_type"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tipe Bisnis <span className="text-danger">*</span>
            </label>
            <input
              type="description"
              placeholder="Tipe Bisnis"
              id="business_type"
              name="business_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="production"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Produksi <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Produksi"
              id="production"
              name="production"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="income"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Penghasilan <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Penghasilan"
              id="income"
              name="income"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreatePakar;
