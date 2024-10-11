import React from 'react';
import { useAuth } from '../Utils/userAuth';
import { FaUserCircle } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import { NavLink } from 'react-router-dom';


function Header({ extraClass }) {
  const { user } = useAuth();
  return (
    <header className={`z-4 w-fill h-10 p-2 pr-4 shadow-lg bg-white flex flex-wrap items-center justify-end ${extraClass}`}>
      <p className='text-base-green'>Hello, {user}</p>
      <Tippy content='View Profile'>
        <NavLink to='/dashboard/profile' className='ml-4 hover:bg-base-brown hover:p2 rounded-full bg-hover-gold'>
          <FaUserCircle className="hover:text-hover-gold h-6 w-6"/>
        </NavLink>
      </Tippy>
    </header>
  )
}

export default Header;
