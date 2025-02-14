import React, { useEffect } from 'react';
import logo from '../Assets/img/traqstock_logo1.png';
import hamburger from '../Assets/img/hamburger.svg';
import close from '../Assets/img/close_icon.svg';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Utils/userAuth';
import Header from './Header';
import { GiFarmTractor, GiChicken, GiEasterEgg, GiPlantRoots, GiTreehouse } from "react-icons/gi";
import { MdHouseSiding, MdGroups, MdOutlineManageHistory } from "react-icons/md";
import { PiFarmThin, PiBarnThin } from "react-icons/pi";
import { FcInspection } from "react-icons/fc";
import { BsInfoCircle } from "react-icons/bs";
import { BiInjection, BiFoodTag } from "react-icons/bi";
import { RiFundsBoxLine } from "react-icons/ri";

function DashboardSideBar() {
  const { logout, user } = useAuth();
  const { role_id } = user;

  useEffect(() => {
    if (role_id < 4) {
      const housing = document.getElementById('housingLink');
      housing.classList.add('no-show');
      const staff = document.getElementById('staffLink');
      staff.classList.add('no-show');
      const movement = document.getElementById('movementLink');
      movement.classList.add('no-show');
      const breedInfo = document.getElementById('breedInfoLink')
      breedInfo.classList.add('no-show');
      const history = document.getElementById('historyLink');
      history.classList.add('no-show');
    }
  }, [role_id])

  const displayDropMenu = (e) => {
    e.preventDefault();
    closeDropFarms(e);
    const selectedMenu = document.querySelectorAll('.dropFlocks');
    selectedMenu.forEach((e) => {
      e.classList.toggle("hidden");
      e.classList.toggle("flex");
    })
  }

  const displayFarmMenu = (e) => {
    e.preventDefault();
    closeDropFlocks(e);
    const selectedMenu = document.querySelectorAll(".dropFarms");
    selectedMenu.forEach((e) => {
      e.classList.toggle("hidden");
      e.classList.toggle("flex");
    });
  };

  const closeDropDown = (e) => {
    closeDropFlocks(e);
    closeDropFarms(e);
  }

  const closeDropFlocks = (e) => {
    const selectedMenu = document.querySelectorAll(".dropFlocks");
    selectedMenu.forEach((e) => {
      if (!e.classList.contains("hidden")) {
        e.classList.add("hidden");
      }
      if (e.classList.contains("flex")) {
        e.classList.remove("flex");
      }
    });
  }

  const closeDropFarms = (e) => {
    const selectedMenu = document.querySelectorAll(".dropFarms");
    selectedMenu.forEach((e) => {
      if (!e.classList.contains("hidden")) {
        e.classList.add("hidden");
      }
      if (e.classList.contains("flex")) {
        e.classList.remove("flex");
      }
    });
  };

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
        className="bg-white h-screen-minus-nav lg:h-screen min-w-56 grid-rows-9 grid-flow-col gap-4 shadow-xl hidden lg:grid absolute lg:relative overflow-hidden"
        id="menu"
      >
        <div className="py-2 px-2 w-full items-center">
          <img src={logo} alt="logo" className="h-8 w-40 ml-2" />
          <hr />
        </div>
        <nav className="row-span-7 px-2 text-left tracking-widest" id="navList">
          <NavLink
            to="farm"
            className="w-full hover:bg-base-brown p-2 rounded-xl flex"
            onClick={displayFarmMenu}
          >
            <GiFarmTractor className="text-2xl" /> <span>Manage Farm</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/sources"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
          >
            <GiPlantRoots className="text-xl" /> <span>Source</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/breeds"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
          >
            <GiTreehouse className="text-xl" /> <span>Breed</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/breed-information"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
            id="breedInfoLink"
          >
            <BsInfoCircle className="text-xl" /> <span>Breed Info</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/housing-structure"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
            id="housingLink"
          >
            <MdHouseSiding className="text-2xl" /> <span>Housing</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/feed-purchase"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
          >
            <BiFoodTag className="text-2xl" />
            <span>Feed Purchase</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/egg-sales"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
          >
            <GiEasterEgg className="text-2xl" />
            <span>Egg Sales</span>
          </NavLink>
          <NavLink
            to="/dashboard/farm/finance"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFarms"
            onClick={closeDropDown}
          >
            <RiFundsBoxLine className="text-2xl" />
            <span>Finance</span>
          </NavLink>
          <NavLink
            to="flocks"
            className="w-full hover:bg-base-brown p-2 rounded-xl flex"
            onClick={displayDropMenu}
          >
            <GiChicken className="text-2xl" /> <span>Manage Flock</span>
          </NavLink>
          <NavLink
            to="/dashboard/flocks/flocks"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
          >
            <PiFarmThin className="text-xl" /> <span>Flock</span>
          </NavLink>

          <NavLink
            to="/dashboard/flocks/movement"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
            id="movementLink"
          >
            <PiBarnThin className="text-xl" /> <span>Movement</span>
          </NavLink>
          <NavLink
            to="/dashboard/flocks/history"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
            id="historyLink"
          >
            <MdOutlineManageHistory className="text-xl" />
            <span>Flock History</span>
          </NavLink>
          <NavLink
            to="/dashboard/flocks/inspection"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
          >
            <FcInspection className="text-xl" /> <span>Inspection</span>
          </NavLink>

          <NavLink
            to="/dashboard/flocks/egg-collection"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
          >
            <GiEasterEgg className="text-2xl" />
            <span>Egg Collection</span>
          </NavLink>
          <NavLink
            to="/dashboard/flocks/treatment"
            className="block p-2 pl-4 text-sm rounded-xl my-1 hidden dropFlocks"
            onClick={closeDropDown}
          >
            <BiInjection className="text-2xl" />
            <span>Treatment</span>
          </NavLink>
          <NavLink
            to="manage-staffs"
            className="block p-2 rounded-xl my-1 flex"
            id="staffLink"
            onClick={closeDropDown}
          >
            <MdGroups className="text-2xl" /> <span>Staff</span>
          </NavLink>
        </nav>
        <div className="text-center p-2 text-black rounded-xl logout-btn">
          <button
            className="w-full hover:bg-[#DCFCE7] p-2 rounded-xl flex items-center justify-center scale-100 transition-all duration-300 ease-out hover:scale-105"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
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
