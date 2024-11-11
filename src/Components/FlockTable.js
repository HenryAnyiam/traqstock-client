import Tippy from '@tippyjs/react';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function FlockTable() {
  

  return (
    <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[5%]'>S/No</th>
          <th className='p-2 w-[30%] lg:w-[20%]'>Name</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Source</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Breed</th>
          <th className='p-2 w-[30%] lg:w-[20%]'>Date Established</th>
          <th  className='p-2 w-[10%]'></th>
        </tr>
      </thead>
      <tbody className='text-xs lg:text-sm'>
        <tr>
          <td>1</td>
          <td>Virgin Flock</td>
          <td className='hidden lg:table-cell'>Virgin Flock</td>
          <td className='hidden lg:table-cell'>Virgin Flock</td>
          <td>22-10-2024</td>
          <td className='p-2'>
              <Tippy content='View Full Details'>
                <NavLink to='/dashboard/flocks/1/details'>
                  <FaEye />
                </NavLink>
              </Tippy>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default FlockTable;