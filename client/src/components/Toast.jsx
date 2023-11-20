import React from "react";
import { Slide, ToastContainer } from "react-toastify";
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
      transition={Slide}
    />
  );
};

export default Toast;
