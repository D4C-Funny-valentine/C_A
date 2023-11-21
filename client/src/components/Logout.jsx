import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../redux/services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (token) {
        const userLogout = await logout(token);
        console.log(userLogout);
        if (userLogout.data?.success) {
          console.log(token);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.success(userLogout.data.message);
          navigate("/login");
        } else {
          toast.error(userLogout.error.data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <button
        className="bg-solid-purple px-2 py-1.5 rounded-lg flex items-center gap-2 duration-300 hover:bg-light-blue active:scale-95"
        onClick={handleLogout}
      >
        <span className="text-white font-semibold">Logout</span>{" "}
        <RiLogoutCircleRLine size={18} color="white" />
      </button>
    </div>
  );
};

export default Logout;
