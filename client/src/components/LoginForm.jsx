import React, { useState } from "react";
import { handleChange } from "../utils/handleChange";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import { useLoginMutation } from "../redux/services/authApi";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [userInputValue, setUserInputValue] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await login(userInputValue);
      if (data?.success) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", data?.token);
        navigate("/avatar");
        toast.success(data?.message);
      } else {
        toast.error(error.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white text-lg font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e, userInputValue, setUserInputValue)}
          required
          className="p-3 w-full text-white form-input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white text-lg font-semibold">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e, userInputValue, setUserInputValue)}
          required
          className="p-3 w-full text-white form-input"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-solid-purple hover:bg-light-blue duration-500 px-8 py-3 rounded-md font-bold w-full active:scale-95"
      >
        Login Account
      </button>
      <div className="uppercase flex items-center justify-center gap-1 text-sm sm:text-sm md:text-base lg:text-base">
        <span className="text-white font-semibold">don't have an account?</span>
        <span className="text-light-blue font-bold">
          <Link to={"/register"}>create</Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
