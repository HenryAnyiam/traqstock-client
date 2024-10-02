import React, { useEffect } from 'react';
import logo from '../Assets/img/traqstock_gold.png';
import close from '../Assets/img/close_icon.svg';
import hamburger from '../Assets/img/hamburger.svg'

function Header() {
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    const closer = document.querySelector(".closer")
    closer.classList.toggle("hidden");
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
    <header className="w-full h-fit shadow-md bg-base-brown flex flex-wrap items-center justify-between">
      <div className="py-2 px-2 flex flex-wrap items-center">
        <img src={logo} alt="logo" className="h-8 w-40 ml-2"/>
      </div>
      <nav className="w-1/2 hidden lg:block">
        <ul className="flex justify-evenly items-center">
          <li className="mr-2 text-white hover:underline hover:underline-offset-1 hover:font-bold hover:text-hover-green">
            <a href="https://docs.google.com/">New Record</a>
          </li>
          <li className="mr-2 text-white hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
            <a href="https://docs.google.com/">Weekly Report</a>
          </li>
          <li className="mr-2 text-white hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
            <a href="https://docs.google.com/">Monthly Report</a>
          </li>
          <li className="mr-2 text-white hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
            <a href="https://docs.google.com/">User Management</a>
          </li>
        </ul>
      </nav>
      <nav className="lg:hidden">
        <button id="sideBarToggle" onClick={() => { toggleMenu() }} className="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 opener lg:inline">
          <img src={hamburger} alt="Menu" className="h-6 w-6"/>
        </button>
        <button onClick={() => { toggleMenu() }} className="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 closer hidden lg:hidden">
          <img src={close} alt="Menu" className="h-6 w-6"/>
        </button>
      </nav>
    </header>
    <div className="hidden flex lg:hidden justify-end absolute right-0 z-10" id="menu">
      <ul className="w-fit h-fit bg-base-brown p-6 shadow-md">
        <li className="mr-2 mb-2 text-white flex justify-start hover:font-bold hover:text-hover-green">
          <a href="https://docs.google.com/" className="underline underline-offset-1">New Record</a>
        </li>
        <li className="mr-2 mb-2 text-white flex justify-start hover:font-bold hover:text-hover-green">
          <a href="https://docs.google.com/" className="underline underline-offset-1">Weekly Report</a>
        </li>
        <li className="mr-2 mb-2 text-white flex justify-start hover:font-bold hover:text-hover-green">
          <a href="https://docs.google.com/" className="underline underline-offset-1">Monthly Report</a>
        </li>
        <li className="mr-2 mb-2 text-white flex justify-start hover:font-bold hover:text-hover-green">
          <a href="https://docs.google.com/" className="underline underline-offset-1">User Management</a>
        </li>
      </ul>
    </div>
    </>
  )
}

export default Header;
