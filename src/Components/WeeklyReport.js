import React from 'react';
import { FaChartBar, FaTable } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

function WeeklyReport() {
  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className='flex justify-start m-2 ml-0'>
        <NavLink to='table'>
          <FaTable className='mr-1' />
          Table
        </NavLink>
        <NavLink to='chart'>
          <FaChartBar className='mr-1' />
          Chart
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default WeeklyReport