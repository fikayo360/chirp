import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        token,
        currentUser,
        setToken,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };