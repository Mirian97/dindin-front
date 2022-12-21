import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import { getItem } from "./utils/storage";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProtectedRoutes redirectTo={"/"} />}>
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default MainRoutes;
