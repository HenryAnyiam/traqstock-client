import React from 'react'
import DashboardSideBar from './DashBoardSideBar';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Dashboard() {
  return (
    <div className='w-full lg:flex'>
      <DashboardSideBar />
      <div className="grow">
        <Header extraClass='hidden lg:flex'/>
        <div className='overflow-auto h-screen-minus-nav' id='dashboard-body'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
