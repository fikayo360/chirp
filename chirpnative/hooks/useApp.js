import { useContext } from 'react';
import { AppContext } from '../appContext';

const useApp = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const { token, currentUser, setToken, setCurrentUser,login,logout } = context

  return { token, currentUser, setToken, setCurrentUser,login, logout }
};

export default useApp;