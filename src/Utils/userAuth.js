import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

 export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    localStorage.setItem('accessToken', user.access_token);
    document.cookie = `refreshToken=${user.refresh_token}; Secure; HttpOnly; SameSite=Strict`;
    setUser({ full_name: user.full_name, id: user.id, email: user.email });
  }

  const loadUser = (user) => {
    setUser({ full_name: `${user.first_name} ${user.last_name}`, id: user.id, email: user.email });
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={ { user, login, logout, loadUser } }>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext); };
