import React from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import { FaEnvelope } from "react-icons/fa";
import LoginBackground from './LoginBackground';
import { NavLink } from 'react-router-dom';

function ResetPassword() {
  return <>
      <LoginBackground />
      <div className="w-full z-10 bg-white/50 h-screen">
        <div className="py-2 px-2">
              <img src={logo} alt="logo" className="h-10 w-44 ml-2"/>
        </div>
        <div className="flex justify-center items-center" id="forms">
          <div className="bg-white/[.3] shadow-2xl rounded-xl h-fit w-60 lg:w-fit">
            <p className="text-center rounded-xl font-bold font-serif text-base-brown p-1 w-full mb-2 text-xl">Reset Your Password</p>
            <form>
              <div className="m-4 flex items-center">
                  <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                      <FaEnvelope className='text-gray-700'/>
                  </div>
                  <input type="email" name="email"
                  id="email" placeholder="Email"
                  className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"
                  required />
              </div>
              <div className="mr-4 flex justify-end text-base-brown">
                  <NavLink to='/login'>Back to Sign In</NavLink>
              </div>
              <div className="m-4 flex justify-center">
                  <button type="submit"
                  className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-base-brown">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
}

export default ResetPassword;
