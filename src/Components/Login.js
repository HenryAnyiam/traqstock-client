import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';
import logo from '../Assets/img/traqstock_logo1.png';


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
  const [currIndex, setCurrIndex] = useState(0);
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
    const firstImage = document.querySelector('.firstImage');
    setTimeout(() => {
      firstImage?.classList.toggle('firstImage');
    }, 5000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const images = document.querySelectorAll('.background-image');
      images.forEach((image, index) => {
        image.style.opacity = index === currIndex ? '1': '0';
      })
      const newIndex = (currIndex + 1) % 6;
      setCurrIndex(newIndex);
    }, 5000);

    return () => { clearInterval(interval); };
  }, [currIndex])

  useEffect(() => {
    const togglePassword = document.getElementById('togglePassword');
    const handleToggle = () => {
      const type = passwordType === 'password' ? 'text' : 'password';
      setPasswordType(type);
      const passwordIcon = document.getElementById('password-icon')
      passwordIcon?.classList.toggle('fa-eye');
      passwordIcon?.classList.toggle('fa-eye-slash');
    }
    togglePassword.addEventListener('click', handleToggle)
    return () => { togglePassword.removeEventListener('click', handleToggle); };
  }, [passwordType])

  return (
    <>
    <div className="background-container">
        <div className="background-image" id="images1"></div>
        <div className="background-image" id="images2"></div>
        <div className="background-image" id="images3"></div>
        <div className="background-image" id="images4"></div>
        <div className="background-image" id="images5"></div>
        <div className="background-image firstImage" id="images6"></div>
  </div>
  <div className="w-full z-10 bg-white/50 h-screen">
    <div className="py-2 px-2">
          <img src={logo} alt="logo" className="h-10 w-44 ml-2"/>
    </div>
    <div className="flex justify-center items-center" id="forms">
    <div className="bg-white/[.3] shadow-2xl rounded-xl h-fit w-60 lg:w-fit">
        <p className="text-center rounded-xl font-bold font-serif text-base-brown p-1 w-full mb-2 text-xl">Sign In To Your Account</p>
        <form>
            <div className="m-4 flex items-center">
                <div className="bg-white h-full p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <i className="fa fa-user text-gray-700"></i>
                </div>
                <input type="text" name="username"
                value={username} id="username" placeholder="Username"
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"
                onChange={(e) => { dispatch({ type: 'username', value: e.target.value }) }} required />
            </div>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-full p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <i className="fa fa-lock text-gray-700"></i>
                </div>
                <input type={passwordType} name="password"
                value={password} id="password" placeholder="Password"
                className="bg-white border-2 border-x-0 border-hover-gold p-1 w-40 lg:w-64 focus:outline-0"
                onChange={(e) => { dispatch({ type: 'password', value: e.target.value }) }} required />
                <div className="bg-white h-full p-1 border-2 border-l-0 border-hover-gold rounded-r-lg" id="togglePassword">
                    <i className="fa fa-eye text-gray-700" id="password-icon"></i>
                </div>
            </div>
            <div className="mr-4 flex justify-end text-base-brown">
                <button>Forgot Password?</button>
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
