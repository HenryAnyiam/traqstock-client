import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

 export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    localStorage.setItem('accessToken', user.token);
    setUser(
      {
        full_name: user.username,
        id: user.id,
        role: user.users_role,
        role_id: user.role
      });
  }

  const loadUser = (user) => {
    setUser(
      {
        full_name: user.username,
        id: user.id,
        role: user.users_role,
        role_id: user.role
      });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  }

  return (
    <AuthContext.Provider value={ { user, login, logout, loadUser } }>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext); };
