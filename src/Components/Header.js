import React from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import close from '../Assets/img/close_icon.svg';
import hamburger from '../Assets/img/hamburger.svg'

function Header() {
  return (
    <header className="w-full h-fit shadow-md bg-white flex flex-wrap items-center justify-between">
      <div className="py-2 px-2 flex flex-wrap items-center">
        <img src={logo} alt="logo" className="h-8 w-40 ml-2"/>
      </div>
      <nav class="w-1/2 hidden lg:block">
                                <ul class="flex justify-evenly items-center">
                                        <li class="mr-2 text-base-green hover:underline hover:underline-offset-1 hover:font-bold hover:text-hover-green">
                                                <a href="https://docs.google.com/">New Record</a>
                                        </li>
                                        <li class="mr-2 text-base-green hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
                                                <a href="https://docs.google.com/">Weekly Report</a>
                                        </li>
                                        <li class="mr-2 text-base-green hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
                                                <a href="https://docs.google.com/">Monthly Report</a>
                                        </li>
                                        <li class="mr-2 text-base-green hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
                                                <a href="https://docs.google.com/">User Management</a>
                                        </li>
                                        <li class="mr-2 text-base-green hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
                                                <a href="https://docs.google.com/">Log Out</a>
                                        </li>
                                        <li class="mr-2 text-base-green hover:text-hover-green hover:underline hover:underline-offset-1 hover:font-bold">
                                                <a href="https://docs.google.com/">Login</a>
                                        </li>
                                </ul>
                        </nav>
                        <nav class="lg:hidden">
                                <button id="sideBarToggle" class="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 opener lg:inline">
                                        <img src={hamburger} alt="Menu" class="h-6 w-6"/>
                                </button>
                                <button id="sideBarClose" class="px-2 py-2 text-gray-200 hover:bg-gray-200 focus:outline-none rounded-md mr-1.5 ml-2 closer hidden lg:hidden">
                                        <img src={close} alt="Menu" class="h-6 w-6"/>
                                </button>
                        </nav>
    </header>
  )
}

export default Header;
