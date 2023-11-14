import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      closeOnClick
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default Toast;
