import React, { useEffect } from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import hamburger from '../Assets/img/hamburger.svg';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';

function DashboardSideBar() {
  const { logout } = useAuth()
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
    menu?.classList.toggle("grid");
    menu?.classList.toggle("z-10");
    const opener = document.querySelector(".opener");
    opener?.classList.toggle("hidden");
  }

  useEffect(() => {
    const closeMenu =  (event) => {
      const menu = document.getElementById("menu");
      const toggle = document.getElementById("sideBarToggle");
      if (!menu?.classList.contains("hidden")) {
        if (!menu.contains(event.target) && event.target !== menu
        && !toggle.contains(event.target) && event.target !== toggle) {
          toggleMenu();
        }
      }
    }
    document.addEventListener("click", closeMenu);
    
    return () => { document.removeEventListener("click", closeMenu); };
  }, [])

  return (
    <>
    <button onClick={() => { toggleMenu()}} id="sideBarToggle" className="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 opener lg:hidden">
      <img src={hamburger} alt="Menu" className="h-6 w-6"/>
    </button>
    <div className='bg-white h-screen w-fit grid-rows-5 grid-flow-col gap-4 shadow-xl hidden lg:grid absolute lg:relative' id='menu'>
      <div className="py-2 px-2 w-full items-center">
        <img src={logo} alt="logo" className="h-8 w-40 ml-2"/>
        <hr />
      </div>
      <nav className="row-span-3 px-2 text-center tracking-widest" id="navList">
        <NavLink to='new-record' className="block p-2 rounded-xl my-1">New Record</NavLink>
        <NavLink to='weekly-report' className="block p-2 rounded-xl my-1">Weekly Report</NavLink>
        <NavLink to='monthly-report' className="block p-2 rounded-xl my-1">Monthly Report</NavLink>
        <NavLink to='manage-staffs' className="block p-2 rounded-xl my-1">Staff Management</NavLink>
      </nav>
      <div className="text-center p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold logout-btn">
        <button className="w-full hover:bg-base-brown p-2 rounded-xl flex items-center justify-center" onClick={() => { logout() }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#613a12"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            <span>Log Out</span>
          </button>
      </div>
    </div>
    </>
  )
}

export default DashboardSideBar;
