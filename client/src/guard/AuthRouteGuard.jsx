import { Navigate } from "react-router-dom";

const AuthRouteGuard = ({ children }) => {
  const token = localStorage.getItem("token");

  // if the token is undefined, redirect to the auth page
  if (token === null) {
    return children;
  } else {
    return <Navigate to={"/avatar"} />;
  }
};

export default AuthRouteGuard;
