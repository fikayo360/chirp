import React, { useState } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [postId,setPostId] = useState('')
  const [article,setArticle] = useState({})

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
  const saveArticle = (article) => {
    setArticle(article)
  }

  return (
    <AppContext.Provider
      value={{
        token,
        currentUser,
        postId,
        article,
        setToken,
        setCurrentUser,
        login,
        logout,
        savePostId,
        saveArticle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };