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

const Pakar = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [email, setEmail] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [gender, setGender] = useState("");
  // const [idPakar, setIdPakar] = useState("");
  const [jabatanFungsional, setJabatanFungsional] = useState("");
  const [jabatanStruktural, setJabatanStruktural] = useState("");
  const [lastEducation, setLastEducation] = useState("");
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [oldNip, setOldNip] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [religion, setReligion] = useState("");
  const [tmtFungsional, setTmtFungsional] = useState("");
  const [tmtStruktural, setTmtStruktural] = useState("");
  const [university, setUniversity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleDelete = async (id, fileurl) => {
    try {
      const fileref = ref(storage, fileurl);
      await deleteObject(fileref);

      const pakar = doc(db, "pakar", id);
      await deleteDoc(pakar);

      setData(data.filter((item) => item.id !== id));
      console.log("Data Pakar berhasil dihapus");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const pakarRef = collection(db, "pakar");
      const q = query(pakarRef, where("id", "==", id));

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
    console.log(gender, "When submit");

    if (profileImg) {
      try {
        const storageRef = ref(storage, `img_pakar/${profileImg.name}`);
        await uploadBytes(storageRef, profileImg);
        const fileurl = await getDownloadURL(storageRef);

        await addDoc(collection(db, "pakar"), {
          birth_date: birthDate,
          birth_place: birthPlace,
          email: email,
          family_status: familyStatus,
          gender: gender,
          // id_pakar: idPakar,
          jabatan_fungsional: jabatanFungsional,
          jabatan_struktural: jabatanStruktural,
          last_education: lastEducation,
          name: name,
          nip: nip,
          old_nip: oldNip,
          phone: phone,
          profile_img: fileurl,
          religion: religion,
          tmt_fungsional: tmtFungsional,
          tmt_struktural: tmtStruktural,
          university: university,
        });

        console.log("Data Pakar berhasil diunggah dan disimpan");
        toast.success("Data Pakar Berhasil Diunggah!", {
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pakar"));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(tempData);
    };
    fetchData();
  }, []);
  console.log(gender);
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
                      <button
                        onClick={() => handleEdit(item.id)}
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
                  Tambah Pakar
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
                      htmlFor="birth_date"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      placeholder="tanggal lahir"
                      id="birth_date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="birth_place"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      placeholder="tempat lahir"
                      id="birth_place"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setBirthPlace(e.target.value)}
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
                  <div className="mb-5">
                    <label
                      htmlFor="family_status"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="family status"
                      id="family_status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setFamilyStatus(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      id="gender"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="jabatan_fungsional"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Jabatan Fungsional
                    </label>
                    <input
                      type="text"
                      placeholder="jabatan fungsional"
                      id="jabatan_fungsional"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setJabatanFungsional(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="jabatan_struktural"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Jabatan Struktural
                    </label>
                    <input
                      type="text"
                      placeholder="jabatan struktural"
                      id="jabatan_struktural"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setJabatanStruktural(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="last_education"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Pendidikan Terakhir
                    </label>
                    <input
                      type="text"
                      placeholder="pendidikan terakhir"
                      id="last_education"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setLastEducation(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="nip"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      NIP
                    </label>
                    <input
                      type="number"
                      placeholder="nip"
                      id="nip"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setNip(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="old_nip"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      NIP Lama
                    </label>
                    <input
                      type="number"
                      placeholder="old nip"
                      id="old_nip"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setOldNip(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      No. Telepon
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
                      htmlFor="profile_img"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Foto Profil
                    </label>
                    <input
                      type="file"
                      id="profile_img"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="religion"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Agama
                    </label>
                    <input
                      type="text"
                      placeholder="religion"
                      id="religion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setReligion(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="tmt_fungsional"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      TMT Fungsional
                    </label>
                    <input
                      type="text"
                      placeholder="tmt fungsional"
                      id="tmt_fungsional"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setTmtFungsional(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="tmt_struktural"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      TMT Struktural
                    </label>
                    <input
                      type="text"
                      placeholder="tmt_struktural"
                      id="tmt_struktural"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setTmtStruktural(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="university"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Universitas
                    </label>
                    <input
                      type="text"
                      placeholder="university"
                      id="university"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setUniversity(e.target.value)}
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
    </DashboardLayout>
  );
};

export default Pakar;
