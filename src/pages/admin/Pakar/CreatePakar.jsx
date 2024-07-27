import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../../../../firebaseConfig";
import { getDocs, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const CreatePakar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birth_date: "",
    birth_place: "",
    email: "",
    expertise: [],
    family_status: "",
    gender: "",
    id_pakar: "",
    jabatan_fungsional: "",
    jabatan_struktural: "",
    last_education: "",
    name: "",
    nip: "",
    old_nip: "",
    phone: "",
    profile_img: "",
    religion: "",
    tmt_fungsional: "",
    tmt_struktural: "",
    university: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [profile, setProfile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!formData.gender) {
      formErrors.gender = "Jenis Kelamin Wajib Di Isi !";
    }

    if (!formData.family_status) {
      formErrors.family_status = "Status Pernikahan Wajib Di Isi !";
    }

    if (!formData.last_education) {
      formErrors.last_education = "Pendidikan Terakhir Wajib Di Isi !";
    }

    if (formData.expertise.length === 0) {
      formErrors.expertise = "Expertise Wajib Di Isi !";
    }

    if (!formData.religion) {
      formErrors.religion = "Agama Wajib Di Isi !";
    }

    if (!formData.phone) {
      formErrors.phone = "Nomor Telepon Wajib Di isi !";
    } else {
      if (!formData.phone.startsWith("08")) {
        formErrors.phone = "Nomor Telepon harus diawali dengan 08";
      } else if (formData.phone.length < 10 || formData.phone.length > 15) {
        formErrors.phone = "Nomor Telepon harus 10 - 15 karakter";
      } else if (isNaN(formData.phone)) {
        formErrors.phone = "Nomor Telepon harus berupa angka";
      }
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // 1. Tambahkan dokumen sementara untuk mendapatkan ID pakar
      const docRef = await addDoc(collection(db, "pakar"), formData);

      // 2. Siapkan nama file dengan ID pakar
      const profileFileName = `${docRef.id}`;

      if (profile) {
        // 3. Buat reference ke Firebase Storage dengan nama file baru
        const storageRef = ref(storage, `img_pakar/${profileFileName}`);
        await uploadBytes(storageRef, profile);
        const profileUrl = await getDownloadURL(storageRef);

        // 4. Update formData dengan URL gambar
        formData.profile_img = profileUrl;

        // 5. Update dokumen di Firestore dengan ID pakar dan URL gambar
        await setDoc(
          doc(db, "pakar", docRef.id),
          {
            id_pakar: docRef.id,
            profile_img: profileUrl, // Menyimpan URL gambar jika diperlukan
          },
          { merge: true }
        );
      } else {
        // Jika tidak ada file profile, hanya update ID pakar
        await setDoc(
          doc(db, "pakar", docRef.id),
          {
            id_pakar: docRef.id,
          },
          { merge: true }
        );
      }

      console.log("Pakar berhasil diunggah dan disimpan");
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
        navigate("/dashboard-admin/pakar");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "birth_date") {
      formattedValue = formatDate(value);
    }
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleExpertiseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newExpertise = checked
        ? [...prevData.expertise, value]
        : prevData.expertise.filter((id) => id !== value);
      return {
        ...prevData,
        expertise: newExpertise,
      };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "expertise"));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpertiseOptions(tempData);
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  // console.log(expertise);
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="nomor telepon"
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
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Jenis Kelamin <span className="text-danger">*</span>
            </label>
            <div className="flex justify-start gap-4 items-center align-middle">
              <div className="flex items-center">
                <input
                  id="laki-laki"
                  type="radio"
                  value="male"
                  name="gender"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="laki-laki"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Laki-laki
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="perempuan"
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="perempuan"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Perempuan
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="birth_place"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tempat Lahir <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="tempat lahir"
              name="birth_place"
              id="birth_place"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="birth_date"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tanggal Lahir <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              placeholder="tanggal lahir"
              id="birth_date"
              name="birth_date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="nip"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              NIP <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="NIP"
              id="nip"
              name="nip"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
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
              type="text"
              placeholder="NIP lama"
              id="old_nip"
              name="old_nip"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="religion"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Agama <span className="text-danger">*</span>
            </label>
            <div className="flex justify-start gap-4 items-center align-middle">
              <div className="flex items-center">
                <input
                  id="islam"
                  type="radio"
                  value="islam"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="islam"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Islam
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="kristen"
                  type="radio"
                  value="kristen"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="kristen"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  kristen
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="katolik"
                  type="radio"
                  value="katolik"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="katolik"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  katolik
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-4"
                  type="radio"
                  value="hindu"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-4"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  hindu
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-5"
                  type="radio"
                  value="budha"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-5"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  budha
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-6"
                  type="radio"
                  value="konghucu"
                  name="religion"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-6"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  konghucu
                </label>
              </div>
              {errors.religion && (
                <p className="text-red-500 text-sm">{errors.religion}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="family_status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status pernikahan <span className="text-danger">*</span>
            </label>
            <div className="flex justify-start gap-4 items-center align-middle">
              <div className="flex items-center">
                <input
                  id="kawin"
                  type="radio"
                  value="married"
                  name="family_status"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="kawin"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Kawin
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="belum"
                  type="radio"
                  value="single"
                  name="family_status"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="belum"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Belum Kawin
                </label>
              </div>
              {errors.family_status && (
                <p className="text-red-500 text-sm">{errors.family_status}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="last_education"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pendidikan Terakhir <span className="text-danger">*</span>
            </label>
            <div className="flex justify-start gap-4 items-center align-middle">
              <div className="flex items-center">
                <input
                  id="S1"
                  type="radio"
                  value="S1"
                  name="last_education"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="S1"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  S1
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="S2"
                  type="radio"
                  value="S2"
                  name="last_education"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="S2"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  S2
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="S3"
                  type="radio"
                  value="S3"
                  name="last_education"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="S3"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  S3
                </label>
              </div>
              {errors.last_education && (
                <p className="text-red-500 text-sm">{errors.last_education}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="university"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Universitas <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Universitas"
              id="university"
              name="university"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="jabatan struktural"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Jabatan Struktural <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="jabatan_struktural"
              id="jabatan_struktural"
              name="jabatan_struktural"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="tmt_struktural"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tmt Struktural <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="tmt struktural"
              id="tmt_struktural"
              name="tmt_struktural"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChange}
            />
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
              name="jabatan_fungsional"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="tmt_fungsional"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tmt Fungsional
            </label>
            <input
              type="text"
              placeholder="tmt fungsional"
              id="tmt_fungsional"
              name="tmt_fungsional"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Spesifikasi <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-2 items-center mb-4">
              {expertiseOptions.map((exp) => (
                <label
                  key={exp.id}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    value={exp.id}
                    checked={formData.expertise.includes(exp.id)}
                    onChange={handleExpertiseChange}
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {exp.name}
                </label>
              ))}
            </div>
            {errors.expertise && (
              <p className="text-red-500 text-sm">{errors.expertise}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="profile_img"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Gambar Profile
            </label>
            <input
              type="file"
              placeholder="profile"
              id="profile_img"
              name="profile_img"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleFileChange}
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
