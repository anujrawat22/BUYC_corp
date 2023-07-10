import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const navigate = useNavigate()
  const initialvalue = {
    isAuth: false,
    token: null,
    role : null,
    image : null,
    name : null
  };

  const [authUser, setAuthUser] = useState(initialvalue);

  const login = (token, role,name,image) => {
    
    setAuthUser({
      isAuth: true,
      token,
      role,
      name,
      image 
    });
    
  };

  const logout = () => {
    navigate("/login")
    setAuthUser(initialvalue);
  };

  const value = {
    authUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
