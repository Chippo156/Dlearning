import { useContext, useEffect, useState } from "react";
import { introspect } from "../service/AuthenticationService";
import AuthContext from "../context/AuthContext";

export const useAuthData = () => {
  const authContext = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authContext.authenticated) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    introspect(token)
      .then((data) => {
        if (data.valid) setRole(data.scope);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [authContext]);

  return { role, loading };
};
