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

const LogTenant = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <h1 className="text-2xl font-bold text-quaternary">Log Tenant</h1>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LogTenant;
