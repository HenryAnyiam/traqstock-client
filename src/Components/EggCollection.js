import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import EggCollectionTable from './EggCollectionTable';

function EggCollection() {
  return (
    <div className='h-full p-4 w-full overflow-hidden' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Egg Collection</h2>
        <Tippy content='Record new Egg Collection'>
          <NavLink className='' to='/dashboard/egg-collection/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <EggCollectionTable />
    </div>
  )
}

export default EggCollection;