import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const login = (user,token) => {
    setCurrentUser(user)
    setToken(token)
  }
  const logout = () => {
    setCurrentUser(null)
    setToken(null)
  }

  return (
    <AppContext.Provider
      value={{
        token,
        currentUser,
        setToken,
        setCurrentUser,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };