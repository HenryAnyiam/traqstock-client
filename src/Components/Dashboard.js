import React from 'react'
import DashboardSideBar from './DashBoardSideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='w-full flex'>
      <DashboardSideBar />
      <Outlet />
    </div>
  )
}

export default Dashboard;
