import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import FlockMovementTable from './FlockMovementTable';

function FlockMovement() {
  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Flock Movement</h2>
        <Tippy content='Record new Flock Movement'>
          <NavLink className='' to='/dashboard/flocks/movement/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <FlockMovementTable />
    </div>
  )
}

export default FlockMovement;