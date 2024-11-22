import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';
import logo from '../Assets/img/traqstock_logo1.png';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import LoginBackground from './LoginBackground';
import { toast } from 'react-toastify';
import { getUser, authUser } from '../Utils/Funcs';


function Login() {
  const [passwordType, setPasswordType] = useState('password');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleLogin = async (data) => {
    if (!errors.email && !errors.password) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      try {
        const userResponse = await authUser(data);
        loader.style.display = 'none';
        text.style.display = 'inline';
        if (userResponse.status === 200) {
          loader.style.display = 'flex';
          text.style.display = 'none';
          const responseData = await userResponse.json();
          const userDetails = await getUser(responseData.access_token);
          if (userDetails.status === 200) {
            loader.style.display = 'none';
            text.style.display = 'inline';
            console.log(await userDetails.json())
            toast.success(`Successfully Logged In`);
            auth.login(responseData);
            const redirect = location.state?.path || "/dashboard/user";
            navigate(redirect, { replace: true });
          }
        } else if (userResponse.status === 500) {
          toast.error(`Error: ${userResponse.statusText}`);
        } else {
          console.log(userResponse.status)
          const responseData = await userResponse.json();
          toast.warning(responseData.detail);
        }
      } catch (err) {
        console.error("Error occured")
      }
    }
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
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
              <div className="m-4 mb-1 flex items-center">
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                      <FaUser className='text-gray-700'/>
                  </div>
                  <input type="text" id="email" placeholder="Email" { ...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address provided"
                    }
                  }) }
                  className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"
                  required />
              </div>
              <p className='text-xs text-red-600 mb-4 text-center'>{ errors.email?.message }</p>
              <div className="m-4 mb-1 flex items-center">
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                      <FaLock className='text-gray-700'/>
                  </div>
                  <input type={passwordType} id="password" placeholder="Password" { ...register('password', { required: "Password is required" }) }
                  className="bg-white border-2 border-x-0 border-hover-gold p-1 w-40 lg:w-[16.5rem] focus:outline-0"/>
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-l-0 border-hover-gold rounded-r-lg" id="togglePassword">
                      <FaEye className='text-gray-700' id='show-password'/>
                      <FaEyeSlash className='hidden text-gray-700' id='hide-password'/>
                  </div>
              </div>
              <p className='text-xs text-red-600 mb-3 text-center'>{ errors.password?.message }</p>
              <div className="mr-4 flex justify-end text-base-brown">
                  <NavLink to='/forgot-password'>Forgot Password?</NavLink>
              </div>
              <div className="m-4 flex justify-center">
                  <button type="submit"
                  className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-base-brown">
                    <div className="dots hidden" id="query-loader">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    <span id="query-text">Continue</span>
                  </button>
              </div>
          </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login;
