import React, { useState } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [postId,setPostId] = useState('')

  const login = (user,token) => {
    console.log('hi');
    setCurrentUser(user)
    setToken(token)
    console.log(currentUser);
  }
  const logout = () => {
    setCurrentUser({})
    setToken('')
  }
  const savePostId = (id) => {
    setPostId(id)
  }

  return (
    <AppContext.Provider
      value={{
        token,
        currentUser,
        postId,
        setToken,
        setCurrentUser,
        login,
        logout,
        savePostId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };