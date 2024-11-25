import React from 'react';
import { useAuth } from '../Utils/userAuth';
import { FaUserCircle } from 'react-icons/fa';
import Tippy from '@tippyjs/react';

function toTitleCase(str) {
  if (!str) {
    return str
  }
  return str
    .toLowerCase()
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
}


function Header({ extraClass }) {
  const { user } = useAuth();

  const displayProfile = (e) => {
    const parent = e.target.closest('.header-element');
    const profile = parent.querySelector('#profile-modal')
    profile.classList.toggle('hidden');
  }

  return (
    <header className={`header-element z-4 w-full h-10 p-2 pr-4 shadow-lg bg-white flex flex-wrap items-center justify-end ${extraClass}`}>
      <p className='text-base-green'>Hello, { toTitleCase(user?.full_name) }</p>
      <Tippy content='View Profile'>
        <button onClick={displayProfile} className='ml-4 hover:bg-base-brown hover:p2 rounded-full bg-hover-gold'>
          <FaUserCircle className="hover:text-hover-gold h-6 w-6"/>
        </button>
      </Tippy>
      <div className='fixed top-9 border p-2 bg-white rounded-md shadow-md z-50 hidden' id="profile-modal">
          <div className='flex items-center justify-center mb-4'>
            <FaUserCircle className="h-10 w-10"/>
          </div>
          <p className='text-center'>{ toTitleCase(user?.full_name) }</p>
          <p className='text-center'>Manager</p>
      </div>
    </header>
  )
}

export default Header;
