import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import FlockTable from './FlockTable';
import { useAuth } from '../Utils/userAuth';

function ViewFlock() {
  const { user } = useAuth();
  const { role_id } = user;

  useEffect(() => {
    if (role_id < 4) {
      const newData = document.getElementById('newData');
      newData.classList.add('no-show');
    }
  }, [role_id])

  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Flocks</h2>
        <div id="newData">
          <Tippy content='Register new flock'>
            <NavLink className='' to='/dashboard/flocks/flocks/new'>
              <FaPlus className='mr-1' />
              New
            </NavLink>
          </Tippy>
        </div>
      </div>
      <FlockTable />
    </div>
  )
}

export default ViewFlock;