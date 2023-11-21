import React from "react";
import Logo from "../assets/logo.svg";
import "./page.css";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-dark-blue">
      <div className="flex flex-col items-center justify-center gap-8 py-10 px-16 sm:py-10 sm:px-16 md:py-12 md:px-20 lg:py-12 lg:px-20 bg-black/80 rounded-lg">
        <div className="flex items-center justify-center gap-4">
          <img src={Logo} alt="logo" className="w-16 object-contain" />
          <h3 className="text-white font-bold text-3xl uppercase">AppName</h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
