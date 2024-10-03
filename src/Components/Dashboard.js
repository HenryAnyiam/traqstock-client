import React, { useEffect } from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import hamburger from '../Assets/img/hamburger.svg';

function Dashboard() {
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("grid");
    menu.classList.toggle("z-10");
    const opener = document.querySelector(".opener");
    opener.classList.toggle("hidden");
  }

  useEffect(() => {
    const menu = document.getElementById("menu");
    const toggle = document.getElementById("sideBarToggle");
    document.addEventListener("click", (event) => {
      if (!menu.classList.contains("hidden")) {
        if (!menu.contains(event.target) && event.target !== menu
        && !toggle.contains(event.target) && event.target !== toggle) {
          toggleMenu();
        }
      }
    })
  }, [])

  return (
    <>
    <button onClick={() => { toggleMenu()}} id="sideBarToggle" className="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 opener lg:hidden">
      <img src={hamburger} alt="Menu" className="h-6 w-6"/>
    </button>
    <div className='bg-white h-screen w-fit grid-rows-5 grid-flow-col gap-4 shadow-xl hidden lg:grid' id='menu'>
      <div className="py-2 px-2 w-full items-center">
        <img src={logo} alt="logo" className="h-8 w-40 ml-2"/>
        <hr />
      </div>
      <nav className="row-span-3 px-2 text-center tracking-widest">
        <ul className="">
          <li className="p-2 text-base-brown rounded-xl hover:font-bold hover:bg-base-brown hover:text-hover-gold">
            <a href="https://docs.google.com/">New Record</a>
          </li>
          <li className="p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold hover:bg-base-brown">
            <a href="https://docs.google.com/">Weekly Report</a>
          </li>
          <li className="p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold hover:bg-base-brown">
            <a href="https://docs.google.com/">Monthly Report</a>
          </li>
          <li className="p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold hover:bg-base-brown">
            <a href="https://docs.google.com/">User Management</a>
          </li>
        </ul>
      </nav>
      <div className="text-center p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold logout-btn">
        <button className="w-full hover:bg-base-brown p-2 rounded-xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#613a12"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default Dashboard;