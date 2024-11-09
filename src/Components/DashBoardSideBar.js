import React, { useEffect } from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import hamburger from '../Assets/img/hamburger.svg';
import close from '../Assets/img/close_icon.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';
import Header from './Header';

function DashboardSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMonthly = (e) => {
    e.preventDefault()
    navigate('farm-data/table')
  }

  const displayDropMenu = () => {
    const selectedMenu = document.querySelectorAll('.dropFlocks');
    selectedMenu.forEach((e) => {
      e.classList.toggle("hidden");
    })
  }

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
    menu?.classList.toggle("grid");
    menu?.classList.toggle("z-10");
    const opener = document.querySelector(".opener");
    const closer = document.querySelector(".closer");
    opener?.classList.toggle("hidden");
    closer?.classList.toggle("hidden");
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
      <div className="flex">
        <button
          onClick={() => {
            toggleMenu();
          }}
          id="sideBarToggle"
          className="h-fit px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none opener lg:hidden shadow-md bg-white"
        >
          <img src={hamburger} alt="Menu" className="h-6 w-6" />
        </button>
        <button
          onClick={() => {
            toggleMenu();
          }}
          id="sideBarToggle"
          className="h-fit px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none closer hidden lg:hidden shadow-md bg-white"
        >
          <img src={close} alt="Menu" className="h-6 w-6" />
        </button>
        <Header extraClass="flex lg:hidden grow" />
      </div>
      <div
        className="bg-white h-screen-minus-nav lg:h-screen min-w-56 grid-rows-8 grid-flow-col gap-4 shadow-xl hidden lg:grid absolute lg:relative overflow-hidden"
        id="menu"
      >
        <div className="py-2 px-2 w-full items-center">
          <img src={logo} alt="logo" className="h-8 w-40 ml-2" />
          <hr />
        </div>
        <nav className="row-span-6 px-2 text-left tracking-widest" id="navList">
          <NavLink to="user" className="block p-2 rounded-xl my-1">
            Dashboard
          </NavLink>
          <NavLink
            to="farm-data"
            className="block p-2 rounded-xl my-1"
            onClick={handleMonthly}
          >
            Farm Data
          </NavLink>
          <div className="text-center text-base-brown rounded-xl hover:text-hover-gold hover:font-bold logout-btn">
            <button
              className="w-full hover:bg-base-brown p-2 rounded-xl flex items-center space-between"
              onClick={displayDropMenu}
            >
              <span>Flock Management</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#613a12"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          </div>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Flocks
          </NavLink>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Source
          </NavLink>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Breed
          </NavLink>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Movement
          </NavLink>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Inspection Record
          </NavLink>
          <NavLink
            to="nil"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
          >
            Breed Information
          </NavLink>
          <NavLink to="nil" className="block p-2 rounded-xl my-1">
            Housing Structure
          </NavLink>
          <NavLink to="nil" className="block p-2 rounded-xl my-1">
            Egg Collection
          </NavLink>
          <NavLink to="manage-staffs" className="block p-2 rounded-xl my-1">
            Staff Management
          </NavLink>
        </nav>
        <div className="text-center p-2 text-base-brown rounded-xl hover:text-hover-gold hover:font-bold logout-btn">
          <button
            className="w-full hover:bg-base-brown p-2 rounded-xl flex items-center justify-center"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#613a12"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardSideBar;
