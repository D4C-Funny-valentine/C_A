import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Avatar from "./pages/Avatar";
import "./App.css";
import Toast from "./components/Toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainRouteGuard from "./guard/MainRouteGuard";
import AuthRouteGuard from "./guard/AuthRouteGuard";
import AvatarRouteGuard from "./guard/AvatarRouteGuard";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <Provider store={store}>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <MainRouteGuard>
                  {/* if token is not existed in the cookie redirected to login page */}
                  <Chat />
                </MainRouteGuard>
              }
            />
            <Route
              path="/avatar"
              element={
                <AvatarRouteGuard>
                  <Avatar />
                </AvatarRouteGuard>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRouteGuard>
                  {/* if token is existed in the cookie redirected to main page */}
                  <Login />
                </AuthRouteGuard>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRouteGuard>
                  {/* if token is existed in the cookie redirected to main page */}
                  <Register />
                </AuthRouteGuard>
              }
            />
          </Routes>
          <Toast />
        </div>
      </Provider>
    </MantineProvider>
  );
};

export default App;
