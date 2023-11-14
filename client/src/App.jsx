import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import "./App.css";
import Toast from "./components/Toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toast />
      </div>
    </Provider>
  );
};

export default App;
