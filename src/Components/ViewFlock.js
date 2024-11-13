import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import FlockTable from './FlockTable';

function ViewFlock() {
  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Flocks</h2>
        <Tippy content='Register new flock'>
          <NavLink className='' to='/dashboard/flocks/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <FlockTable />
    </div>
  )
}

export default ViewFlock;