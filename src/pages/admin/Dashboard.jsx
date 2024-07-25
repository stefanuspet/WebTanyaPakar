import DashboardLayout from "../../layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { countConsultation } from "../../services/allrole";
import BgCard from "../../assets/images/bgauth.png";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { realtimeDb } from "../../../firebaseConfig";
import { ref, onValue, get, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [evaluation, setEvaluation] = useState(0);
  const [consultations, setconsultations] = useState(0);
  const [user, setUser] = useState(0);
  const [pakar, setPakar] = useState(0);
  const [tenant, setTenant] = useState(0);

  const countUsers = async () => {
    const usersCollection = collection(db, "user");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setUser(count);
  };

  const countPakar = async () => {
    const usersCollection = collection(db, "pakar");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setPakar(count);
  };

  const countTenant = async () => {
    const usersCollection = collection(db, "tenant");
    const snapshot = await getDocs(usersCollection);
    const count = snapshot.size;
    setTenant(count);
  };

  const [formData, setFormData] = useState({
    evaluationForm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { evaluationForm } = formData;

    if (evaluationForm.trim() === "") {
      console.error("Evaluation form cannot be empty");
      return;
    }

    const dbRef = ref(realtimeDb, "evaluationForm");

    try {
      await set(dbRef, evaluationForm);
      console.log("Evaluation form updated successfully");
      toast.success("Form Evaluasi Berhasil diubah!", {
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
      console.error("Error updating evaluation form: ", error);
    }
  };

  useEffect(() => {
    const updateCountConsultation = (total) => {
      setconsultations(total);
    };

    const fetchData = async () => {
      const dbRef = ref(realtimeDb, "evaluationForm");
      onValue(
        dbRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setEvaluation(snapshot.val());
          } else {
            console.log("No data available");
          }
        },
        (error) => {
          console.error("Error fetching data: ", error);
        }
      );
    };

    fetchData();

    countConsultation(updateCountConsultation);

    countUsers();
    countPakar();
    countTenant();
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
      <h1 className="text-2xl font-bold text-quaternary">Dashboard</h1>
      <div className="py-10 grid grid-cols-2 xl:grid-cols-4 w-full gap-4 justify-items-center">
        <div className="bg-primary rounded-lg w-full h-44 relative ">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Konsultasi : {consultations}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Pengguna : {user}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Pakar : {pakar}
          </h1>
        </div>
        <div className="bg-primary rounded-lg w-full h-44 relative">
          <img
            src={BgCard}
            alt=""
            className="absolute z-0 w-full h-full object-cover rounded-lg"
          />
          <h1 className="text-xl font-bold text-white absolute inset-0 flex items-center justify-center z-10">
            Jumlah Tenant : {tenant}
          </h1>
        </div>
      </div>
      <div>
        <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Form Evaluasi :
            </label>
            <a
              href={evaluation}
              target="blank"
              className="text-blue-700 italic hover:underline"
            >
              {evaluation}
            </a>
            <input
              type="text"
              id="evaluationForm"
              name="evaluationForm"
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Form Evaluasi"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-success hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
