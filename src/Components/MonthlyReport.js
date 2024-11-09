import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaChartBar, FaTable, FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';

function MonthlyReport() {
  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <div className='flex justify-start'>
          <NavLink to='table'>
            <FaTable className='mr-1' />
            Table
          </NavLink>
          <NavLink to='chart'>
            <FaChartBar className='mr-1' />
            Chart
          </NavLink>
        </div>
        <Tippy content='Create new farm record'>
          <NavLink className='' to='/dashboard/farm-data/new-record'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      
      <Outlet />
    </div>
  )
}

export default MonthlyReport