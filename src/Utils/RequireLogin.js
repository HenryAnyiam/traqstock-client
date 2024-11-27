import React, { useState, useEffect } from 'react'
import { useAuth } from './userAuth'
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from './Funcs';
import Loader from '../Components/Loader';

function RequireLogin({ children }) {
  const { user, loadUser } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const user_token = localStorage.getItem('accessToken');
      if (!user_token) {
        setLoading(false)
        return
      };

      setLoading(true);
      getUser(user_token)
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              loadUser(data);
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, loadUser])

  if (loading) {
    return <div className='flex w-full'>
      <Loader />
      <Loader extraClass={"hidden lg:block"} />
      <Loader extraClass={"hidden lg:block"} />
    </div>;
  }

  if (!user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children;
}

export default RequireLogin;
