import React from "react";
import ReactDOM from "react-dom/client";
import "./css/satoshi.css";
import "./css/style.css";
import AppRouter from "./routes/index.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
