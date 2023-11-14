import React, { useState } from "react";
import { handleChange } from "../utils/handleChange";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./components.css";
import { useRegisterMutation } from "../redux/services/authApi";

const RegisterForm = () => {
  const [userInputValue, setUserInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register] = useRegisterMutation();

  const handlerValidation = () => {
    const { username, password, confirmPassword } = userInputValue;
    if (password !== confirmPassword) {
      toast.error("Password and password confirmation have to be match");
      return false;
    } else if (password.length < 7) {
      toast.error("Password must be at least 7 characters long");
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      const { username, email, password, confirmPassword } = userInputValue;
      try {
        const { data, error } = await register(userInputValue);
        console.log(data);
        console.log(error);
        // if (data.success) {
        //   console.log(data);
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-white text-lg font-semibold">
          User Name
        </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e, userInputValue, setUserInputValue)}
          required
          className="p-3 w-full text-white form-input"
        />
      </div>
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
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white text-lg font-semibold">
          Password Confirmation
        </label>
        <input
          type="password"
          placeholder="Password Confirmation"
          name="confirmPassword"
          onChange={(e) => handleChange(e, userInputValue, setUserInputValue)}
          required
          className="p-3 w-full text-white form-input"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-solid-purple hover:bg-light-blue duration-500 px-8 py-3 rounded-md font-bold w-full active:scale-95"
      >
        Create Account
      </button>
      <div className="uppercase flex items-center justify-center gap-1">
        <span className="text-white font-semibold">
          already have an account?
        </span>
        <span className="text-light-blue font-bold">
          <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
