import { useEffect, useState } from "react";
import BgImage from "../assets/images/bgauth.png";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState(false);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(data.email, data.password);
    if (!result) {
      seterror(true);
    } else {
      seterror(false);
      navigate("/dashboard-admin");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      if (role === "admin") {
        navigate("/dashboard-admin");
      }
    }
  }, [navigate]);

  return (
    <>
      <div className="w-full h-screen bg-skewed-gradient overflow-hidden relative">
        <img
          src={BgImage}
          alt="bg-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0">
        <div className="flex items-center justify-center w-full h-full font-inter">
          <form action="" className="bg-tertiary py-5 px-6 rounded-2xl w-96">
            <h1 className="text-center mt-1 mb-6 text-white text-xl font-bold">
              Masuk
            </h1>
            <div>
              <p
                className={
                  error
                    ? "text-center text-primary border p-2 px-3 border-primary mb-2"
                    : "hidden"
                }
              >
                Email Atau Password Salah !!!
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-white text-base"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 rounded-md focus:outline-none"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-white text-base"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                className="w-full px-3 py-2 rounded-md focus:outline-none"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-quaternary text-white py-2 rounded-md hover:bg-primary-dark mt-4 mb-7 text-base"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
