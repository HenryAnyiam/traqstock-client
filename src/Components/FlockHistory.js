import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import FlockHistoryTable from './FlockHistoryTable';

function FlockHistory() {
  return (
    <div className='h-full p-4 w-full overflow-hidden' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Flock History</h2>
        <Tippy content='Record new Flock History'>
          <NavLink className='' to='/dashboard/flocks/history/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <FlockHistoryTable />
    </div>
  )
}

export default FlockHistory;