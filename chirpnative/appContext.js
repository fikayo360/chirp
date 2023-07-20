import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const login = (user,token) => {
    console.log('hi');
    setCurrentUser(user)
    setToken(token)
  }
  const logout = () => {
    setCurrentUser({})
    setToken('')
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