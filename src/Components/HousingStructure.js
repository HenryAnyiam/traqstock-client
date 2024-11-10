import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import HousingStructureTable from './HousingStructureTable';

function HousingStructure() {
  return (
    <div className='h-full p-4 w-full' id='report-view'>
      <div className="flex justify-end m-2 ml-0">
        <Tippy content='Create new housing structure'>
          <NavLink className='' to='/dashboard/housing-structure/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <HousingStructureTable />
    </div>
  )
}

export default HousingStructure;