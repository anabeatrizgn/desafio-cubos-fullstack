import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
