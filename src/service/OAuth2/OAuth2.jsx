import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const OAuth2 = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const pathParams = useParams();
  const [query] = useSearchParams();
};
