import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { db, storage } from "../../../../firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Link, NavLink } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

const Pakar = () => {
  const [pakar, setPakar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pakar"));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPakar(tempData);
    };
    fetchData();
  }, []);

  const handleDelete = async (id, profile_img) => {
    try {
      if (profile_img) {
        const fileref = ref(storage, profile_img);
        await deleteObject(fileref);
      }

      const data = doc(db, "pakar", id);
      await deleteDoc(data);

      setPakar(pakar.filter((item) => item.id !== id));
      console.log("Document successfully deleted!");
      toast.success("Data Pakar Berhasil Dihapus !", {
        position: window.innerWidth <= 768 ? "bottom-center" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
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
        <h1 className="text-2xl font-bold text-quaternary">Pakar</h1>
        <NavLink
          to="/dashboard-admin/pakar/create"
          className="bg-tertiary text-white p-2 rounded-md"
        >
          Tambah
        </NavLink>
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
                  Tempat, Tanggal Lahir
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Kelamin
                </th>
                <th scope="col" className="px-6 py-3">
                  ID Pakar
                </th>
                <th scope="col" className="px-6 py-3">
                  Jabatan Fungsional
                </th>
                <th scope="col" className="px-6 py-3">
                  Jabatan Struktural
                </th>
                <th scope="col" className="px-6 py-3">
                  Pendidikan Terakhir
                </th>
                <th scope="col" className="px-6 py-3">
                  NIP
                </th>
                <th scope="col" className="px-6 py-3">
                  NIP Lama
                </th>
                <th scope="col" className="px-6 py-3">
                  No. Telp
                </th>
                <th scope="col" className="px-6 py-3">
                  Agama
                </th>
                <th scope="col" className="px-6 py-3">
                  TMT Fungsional
                </th>
                <th scope="col" className="px-6 py-3">
                  TMT Struktural
                </th>
                <th scope="col" className="px-6 py-3">
                  Universitas
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {pakar.map((item) => (
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
                  <td scope="row" className="px-6 py-4">
                    {item.birth_place}, {item.birth_date}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.family_status}</td>
                  <td className="px-6 py-4">
                    {item.gender === "male" ? "Laki-laki" : "Perempuan"}
                  </td>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.jabatan_fungsional}</td>
                  <td className="px-6 py-4">{item.jabatan_struktural}</td>
                  <td className="px-6 py-4">{item.last_education}</td>
                  <td className="px-6 py-4">{item.nip}</td>
                  <td className="px-6 py-4">{item.old_nip}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.religion}</td>
                  <td className="px-6 py-4">{item.tmt_fungsional}</td>
                  <td className="px-6 py-4">{item.tmt_struktural}</td>
                  <td className="px-6 py-4">{item.university}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(item.id, item.profile_img)}
                        className="bg-danger p-2 text-white rounded-md"
                      >
                        Hapus
                      </button>
                      <Link
                        to={`/dashboard-admin/pakar/edit/${item.id}`}
                        className="bg-blue-600 p-2 text-white rounded-md"
                      >
                        Ubah
                      </Link>
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

export default Pakar;
