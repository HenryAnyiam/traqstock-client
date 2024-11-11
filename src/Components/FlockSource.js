import React from 'react';
import sources from '../mock_data/flock_source.json';
import Tippy from '@tippyjs/react';
import { FaEye } from 'react-icons/fa';

function FlockSource() {

  return <div className='lg:p-4'>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[35%] lg:table-cell'>Source Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[25%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody>
    {
      sources.map((source, index) => <tr key={index} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index }</td>
        <td className='p-2'>{ source.name }</td>
        <td className='p-2'>{ source.registered }</td>
        <td className='p-2'>
          <Tippy content='View registered flocks'>
            <button>
              <FaEye />
            </button>
          </Tippy>
        </td>
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockSource;
