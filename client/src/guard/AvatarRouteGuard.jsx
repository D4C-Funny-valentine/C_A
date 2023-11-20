import { Navigate } from "react-router-dom";

const AvatarRouteGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.isAvatarImageSet) {
      // User has an avatar, redirect to the home page
      return <Navigate to={"/"} />;
    } else {
      // User doesn't have an avatar, allow access to children components
      return children;
    }
  } else {
    // User is not logged in, redirect to the login page
    return <Navigate to={"/login"} />;
  }
};

export default AvatarRouteGuard;
