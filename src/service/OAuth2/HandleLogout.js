import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../AuthenticationService";

export const HandleLogout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      navigate("/login");
      return;
    }
    try {
      const response = await logout(token);
      if (response.data.code === 200) {
        localStorage.clear();
        authContext.refresh();
        navigate("/login");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return { handleLogout };
};
