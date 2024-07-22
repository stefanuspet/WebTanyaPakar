import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../../../firebaseConfig";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";

const Tenant = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [idTenant, setIdTenant] = useState("");
  const [income, setIncome] = useState("");
  const [name, setName] = useState("");
  const [nameTenant, setNameTenant] = useState("");
  const [phone, setPhone] = useState("");
  const [problems, setProblems] = useState("");
  const [production, setProduction] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentTenantId, setCurrentTenantId] = useState("");

  const openModalEdit = (id) => {
    setCurrentTenantId(id);
    setIsModalEditOpen(true);
    fetchTenantData(id);
  };
  const closeModalEdit = () => {
    setCurrentTenantId("");
    setIsModalEditOpen(false);
    setTenantForm({
      address: "",
      businessType: "",
      email: "",
      idTenant: "",
      income: "",
      name: "",
      nameTenant: "",
      phone: "",
      problems: "",
      production: "",
      status: "",
    });
  };

  const fetchTenantData = async (id) => {
    try {
      const docRef = doc(db, "tenant", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTenantForm(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tenantRef = doc(db, "tenant", currentTenantId);
      await updateDoc(tenantRef, tenantForm);

      console.log("Data Tenant berhasil diubah");
      toast.success("Data Tenant Berhasil Diubah!", {
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
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModalEdit();
    }
  };

  const handleDelete = async (id) => {
    try {
      const tenant = doc(db, "tenant", id);
      await deleteDoc(tenant);

      setData(data.filter((item) => item.id !== id));
      console.log("Data Tenant berhasil dihapus");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      console.log("tes");
      const tenantRef = collection(db, "tenant");
      const q = query(tenantRef, where("id", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "tenant"), {
        address: address,
        business_type: businessType,
        email: email,
        id_tenant: idTenant,
        income: income,
        name: name,
        name_tenant: nameTenant,
        phone: phone,
        problems: problems,
        production: production,
        status: status,
      });

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
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "tenant"));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(tempData);
    };
    fetchData();
  }, []);
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
        <h1 className="text-2xl font-bold text-quaternary">Pakar</h1>
        <button
          className="bg-tertiary text-white p-2 rounded-md"
          onClick={openModal}
        >
          Tambah
        </button>
      </div>
      <div className="p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipe Bisnis
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  ID Tenant
                </th>
                <th scope="col" className="px-6 py-3">
                  Pendapatan
                </th>
                <th scope="col" className="px-6 py-3">
                  Alamat
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Tenant
                </th>
                <th scope="col" className="px-6 py-3">
                  No. Telp
                </th>
                <th scope="col" className="px-6 py-3">
                  Masalah
                </th>
                <th scope="col" className="px-6 py-3">
                  Produksi
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.business_type}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">Rp {item.income}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.name_tenant}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.problems}</td>
                  <td className="px-6 py-4">{item.production}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-danger p-2 text-white rounded-md"
                      >
                        Hapus
                      </button>
                      <button
                        // onClick={() => handleEdit(item.id)}
                        onClick={openModalEdit}
                        className="bg-blue-600 p-2 text-white rounded-md"
                      >
                        Ubah
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-550 overflow-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900">
                  Tambah Tenant
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nama"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="business_type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tipe Bisnis
                    </label>
                    <input
                      type="text"
                      placeholder="business type"
                      id="business_type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setBusinessType(e.target.value)}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-5">
                    <label
                      htmlFor="id_tenant"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ID Tenant
                    </label>
                    <input
                      type="id_tenant"
                      placeholder="id tenant"
                      id="id_tenant"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setIdTenant(e.target.value)}
                    />
                  </div> */}
                  <div className="mb-5">
                    <label
                      htmlFor="income"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Pendapatan
                    </label>
                    <input
                      type="number"
                      placeholder="income"
                      id="income"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Alamat
                    </label>
                    <input
                      type="description"
                      placeholder="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="name_tenant"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nama Tenant
                    </label>
                    <input
                      type="text"
                      placeholder="name tenant"
                      id="name_tenant"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setNameTenant(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      placeholder="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="problems"
                      id="problems"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setProblems(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="production"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Produksi
                    </label>
                    <input
                      type="text"
                      placeholder="production"
                      id="production"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setProduction(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                  <div className="rounded-b">
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                    >
                      {isLoading ? "Mengunggah..." : "Simpan"}
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-550 overflow-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Tenant
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModalEdit}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <form className="max-w-sm mx-auto" onSubmit={handleEdit}>
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nama"
                      required
                      value={name}
                      onChange={handleEdit}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="business_type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tipe Bisnis
                    </label>
                    <input
                      type="text"
                      placeholder="business type"
                      id="business_type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setBusinessType(e.target.value)}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-5">
                    <label
                      htmlFor="id_tenant"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ID Tenant
                    </label>
                    <input
                      type="id_tenant"
                      placeholder="id tenant"
                      id="id_tenant"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setIdTenant(e.target.value)}
                    />
                  </div> */}
                  <div className="mb-5">
                    <label
                      htmlFor="income"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Pendapatan
                    </label>
                    <input
                      type="number"
                      placeholder="income"
                      id="income"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Alamat
                    </label>
                    <input
                      type="description"
                      placeholder="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="name_tenant"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nama Tenant
                    </label>
                    <input
                      type="text"
                      placeholder="name tenant"
                      id="name_tenant"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setNameTenant(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      placeholder="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="problems"
                      id="problems"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setProblems(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="production"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Produksi
                    </label>
                    <input
                      type="text"
                      placeholder="production"
                      id="production"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setProduction(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                  <div className="rounded-b">
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                    >
                      {isLoading ? "Mengunggah..." : "Simpan"}
                    </button>
                    <button
                      onClick={closeModalEdit}
                      type="button"
                      className="py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Tenant;
