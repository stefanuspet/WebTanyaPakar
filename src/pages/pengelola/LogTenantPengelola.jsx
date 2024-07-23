import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../../../firebaseConfig";
import DashboardLayoutPengelola from "../../layouts/DashboardLayoutPengelola";
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

const LogTenantPengelola = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (id) => {
    try {
      const log_tenant = doc(db, "log_tenant", id);
      await deleteDoc(log_tenant);

      setData(data.filter((item) => item.id !== id));
      console.log("Data Log Tenant berhasil dihapus");
    } catch (error) {
      console.log("error", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "log_tenant"));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      tempData.sort((a, b) => b.timestamp - a.timestamp);

      setData(tempData);
    };
    fetchData();
  }, []);
  return (
    <DashboardLayoutPengelola>
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
                  Nama File
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  ID Log
                </th>
                <th scope="col" className="px-6 py-3">
                  ID Tenant
                </th>
                <th scope="col" className="px-6 py-3">
                  ID User
                </th>
                <th scope="col" className="px-6 py-3">
                  timestamp
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
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.file_name}
                    </a>
                  </th>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.id_tenant}</td>
                  <td className="px-6 py-4">{item.id_user}</td>
                  <td className="px-6 py-4">
                    {formatTimestamp(item.timestamp)}
                  </td>
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
    </DashboardLayoutPengelola>
  );
};

export default LogTenantPengelola;
