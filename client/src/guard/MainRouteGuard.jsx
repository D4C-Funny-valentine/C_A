import { Navigate } from "react-router-dom";

const MainRouteGuard = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.isAvatarImageSet) {
      return children;
    } else {
      return <Navigate to="/avatar" />;
    }
  } else {
    // If there's no token, redirect to the login page
    return <Navigate to={"/login"} />;
  }
};

export default MainRouteGuard;
