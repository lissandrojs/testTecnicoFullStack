import {
  BrowserRouter ,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../context/PrivateRoute";
import { useAuth } from "../context/AuthContext";
import RecoverPassword from "../pages/RecoverPassword";
import InsertNewPassword from "../pages/InsertNewPassword";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PrivateRoute element={<Dashboard />} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword/>} />
        <Route path="/insertNewPassword" element={<InsertNewPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
