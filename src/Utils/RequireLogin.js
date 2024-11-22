import React, { useState, useEffect } from 'react'
import { useAuth } from './userAuth'
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from './Funcs';

function RequireLogin({ children }) {
  const { user, loadUser } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      const user_token = localStorage.getItem('accessToken');
      if (!user_token) return;

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
    }
  }, [user, loadUser])

  if (loading) {
    return <div className='flex w-full'>
      <div className="shadow p-4 max-w-sm w-full mx-auto h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow p-4 max-w-sm w-full mx-auto h-screen hidden lg:block">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow p-4 max-w-sm w-full mx-auto h-screen hidden lg:block">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  if (!user) {
    const user_token = localStorage.getItem('accessToken');
    if (!user_token) {
      return <Navigate to='/login' state={{ path: location.pathname }} />
    }
  }
  return children;
}

export default RequireLogin;
