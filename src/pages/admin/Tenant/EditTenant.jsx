import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";

const EditTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [tenant, setTenant] = useState({
    name: "",
    business_type: "",
    email: "",
    income: "",
    address: "",
    name_tenant: "",
    phone: "",
    problems: "",
    production: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const handleRadio = (e) => {
    console.log("Radio selected:", e.target.value); // Debug log
    setTenant({
      ...tenant,
      status: e.target.value,
    });
  };

  useEffect(() => {
    const fetchTenant = async () => {
      const docRef = doc(db, "tenant", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTenant(docSnap.data());
      } else {
        toast.error("Tenant tidak ditemukan.");
        navigate("/dashboard-admin/tenant");
      }
    };

    fetchTenant();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "tenant", id);
      await updateDoc(docRef, tenant);
      toast.success("Data Tenant berhasil diperbarui!", {
        position: window.innerWidth <= 768 ? "bottom-center" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/dashboard-admin/tenant");
    } catch (error) {
      toast.error("Gagal memperbarui data Tenant.", {
        position: window.innerWidth <= 768 ? "bottom-center" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

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
        <h1 className="text-2xl font-bold text-quaternary">Ubah Data Tenant</h1>
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
              value={tenant.name}
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
              placeholder="phone"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
              value={tenant.phone}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
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
              value={tenant.email}
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
              value={tenant.address}
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
              value={tenant.name_tenant}
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
              type="text"
              placeholder="masalah"
              id="problems"
              name="problems"
              value={tenant.problems}
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
              type="text"
              placeholder="Tipe Bisnis"
              id="business_type"
              name="business_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={tenant.business_type}
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
              value={tenant.production}
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
              value={tenant.income}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <div className="flex items-center mb-4">
              <input
                id="status-active"
                type="radio"
                value="active"
                name="status"
                onChange={handleRadio}
                checked={tenant.status === "active"} // Check if active is selected
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="status-active"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Aktif
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="status-inactive"
                type="radio"
                value="inactive"
                name="status"
                onChange={handleRadio}
                checked={tenant.status === "inactive"} // Check if inactive is selected
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="status-inactive"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Tidak Aktif
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
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

export default EditTenant;
