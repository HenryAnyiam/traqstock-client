import React, { useEffect, useState, useReducer } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';
import logo from '../Assets/img/traqstock_logo1.png';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import LoginBackground from './LoginBackground';


const loginData = { username: '', password: '' };
const reducer = (state, action) => {
  switch(action.type) {
    case 'username':
      return { ...state, username: action.value };
    case 'password':
        return { ...state, password: action.value }
    default:
        return state;
  }
}

function Login() {
  const [passwordType, setPasswordType] = useState('password');
  const [data, dispatch] = useReducer(reducer, loginData);
  const { username, password } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(username);
    const redirect = location.state?.path || '/dashboard/new-record';
    navigate(redirect, { replace: true });
  }

  useEffect(() => {
    const togglePassword = document.getElementById('togglePassword');
    const handleToggle = () => {
      const type = passwordType === 'password' ? 'text' : 'password';
      setPasswordType(type);
      const passwordShow = document.getElementById('show-password');
      const passwordHide = document.getElementById('hide-password')
      passwordShow?.classList.toggle('hidden');
      passwordHide?.classList.toggle('hidden');
    }
    togglePassword.addEventListener('click', handleToggle)
    return () => { togglePassword.removeEventListener('click', handleToggle); };
  }, [passwordType])

  return (
    <>
    <LoginBackground />
    <div className="w-full z-10 bg-white/50 h-screen">
      <div className="py-2 px-2">
            <img src={logo} alt="logo" className="h-10 w-44 ml-2"/>
      </div>
      <div className="flex justify-center items-center" id="forms">
      <div className="bg-white/[.3] shadow-2xl rounded-xl h-fit w-60 lg:w-fit">
          <p className="text-center rounded-xl font-bold font-serif text-base-brown p-1 w-full mb-2 text-xl">Sign In To Your Account</p>
          <form>
              <div className="m-4 flex items-center">
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                      <FaUser className='text-gray-700'/>
                  </div>
                  <input type="text" name="username"
                  value={username} id="username" placeholder="Username"
                  className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"
                  onChange={(e) => { dispatch({ type: 'username', value: e.target.value }) }} required />
              </div>
              <div className="m-4 mb-1 flex items-center">
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                      <FaLock className='text-gray-700'/>
                  </div>
                  <input type={passwordType} name="password"
                  value={password} id="password" placeholder="Password"
                  className="bg-white border-2 border-x-0 border-hover-gold p-1 w-40 lg:w-[16.5rem] focus:outline-0"
                  onChange={(e) => { dispatch({ type: 'password', value: e.target.value }) }} required />
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-l-0 border-hover-gold rounded-r-lg" id="togglePassword">
                      <FaEye className='text-gray-700' id='show-password'/>
                      <FaEyeSlash className='hidden text-gray-700' id='hide-password'/>
                  </div>
              </div>
              <div className="mr-4 flex justify-end text-base-brown">
                  <NavLink to='/forgot-password'>Forgot Password?</NavLink>
              </div>
              <div className="m-4 flex justify-center">
                  <button type="submit" onClick={handleLogin}
                  className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-base-brown">Continue</button>
              </div>
          </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login;
