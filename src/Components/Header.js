import React from 'react';
import { useAuth } from '../Utils/userAuth';
import { FaUserCircle } from 'react-icons/fa';

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
      <button onClick={displayProfile} className='mr-2 hover:bg-white hover:p2 rounded-full bg-white text-new-green border-new-green'>
        <FaUserCircle className="hover:text-new-green h-6 w-6"/>
      </button>
      <p className='text-base-green'>Hello, { toTitleCase(user?.full_name) }</p>
      <div className='fixed top-9 border p-2 bg-white rounded-md shadow-md z-50 hidden' id="profile-modal">
          <div className='flex items-center justify-center mb-4'>
            <FaUserCircle className="h-10 w-10"/>
          </div>
          <p className='text-center'>{ toTitleCase(user?.full_name) }</p>
          <p className='text-center'>{ toTitleCase(user?.role) }</p>
      </div>
    </header>
  )
}

export default Header;
