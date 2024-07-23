import React, { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { db } from "../../../../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Pastikan toast telah diimpor

const CreateTenant = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_tenant: "",
    address: "",
    business_type: "",
    email: "",
    income: "",
    name: "",
    name_tenant: "",
    phone: "",
    problems: "",
    production: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadio = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    let formErrors = {};
    if (!formData.status) {
      formErrors.status = "Status Wajib Di isi !";
    }

    //phone harus di isi
    if (!formData.phone) {
      formErrors.phone = "Nomor Telepon Wajib Di isi !";
    } else {
      // phone harus diawali dengan 08
      if (!formData.phone.startsWith("08")) {
        formErrors.phone = "Nomor Telepon harus diawali dengan 08";
      } else {
        // phone harus 10 - 15 karakter
        if (formData.phone.length < 10 || formData.phone.length > 15) {
          formErrors.phone = "Nomor Telepon harus 10 - 15 karakter";
        } else {
          //phone harus angka
          if (isNaN(formData.phone)) {
            formErrors.phone = "Nomor Telepon harus berupa angka";
          }
        }
      }
    }

    setErrors(formErrors);

    // Jika ada kesalahan validasi, hentikan submit
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "tenant"), {
        address: formData.address,
        business_type: formData.business_type,
        email: formData.email,
        income: formData.income,
        name: formData.name,
        name_tenant: formData.name_tenant,
        phone: formData.phone,
        problems: formData.problems,
        production: formData.production,
        status: formData.status,
      });

      await setDoc(
        doc(db, "tenant", docRef.id),
        {
          id_tenant: docRef.id,
        },
        { merge: true }
      );

      console.log("Data Tenant berhasil diunggah dan disimpan");
      toast.success("Data Tenant Berhasil Diunggah!", {
        position: window.innerWidth <= 768 ? "bottom-center" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/dashboard-admin/tenant");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-quaternary">Tambah Tenant</h1>
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
              placeholder="phone"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
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
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="active"
                name="status"
                onChange={handleRadio}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 "
              >
                Aktif
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value="inactive"
                name="status"
                onChange={handleRadio}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 "
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

export default CreateTenant;
