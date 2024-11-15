import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import BreedInformationTable from './BreedInformationTable';

function BreedInformation() {
  return (
    <div className='h-full p-4 w-full overflow-hidden' id='report-view'>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Breed information</h2>
        <Tippy content='Add new Breed Information'>
          <NavLink className='' to='/dashboard/flocks/breed-information/new'>
            <FaPlus className='mr-1' />
            New
          </NavLink>
        </Tippy>
      </div>
      <BreedInformationTable />
    </div>
  )
}

export default BreedInformation;