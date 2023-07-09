import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
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
    console.log(authUser)
  };

  const logout = () => {
    setAuthUser(initialvalue);
    console.log(authUser)
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
