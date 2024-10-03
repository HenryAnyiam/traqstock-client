import React from 'react'
import DashboardSideBar from './DashBoardSideBar';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Dashboard() {
  return (
    <div className='w-full lg:flex'>
      <DashboardSideBar />
      <div className="">
        <Header extraClass='hidden lg:flex'/>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard;
