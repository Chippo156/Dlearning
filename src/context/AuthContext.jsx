import { createContext, useEffect, useState } from "react";
import { introspect } from "../service/AuthenticationService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  /**
   * Resfresh authentication status
   */
  const refresh = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      return;
    }
    try {
      const result = await introspect(token);
      setAuthenticated(result.valid);
    } catch (error) {
      console.error("Error introspecting token:", error);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));

    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
