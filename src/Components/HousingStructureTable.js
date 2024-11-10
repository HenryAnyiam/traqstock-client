import React from 'react';
import structures from '../mock_data/housing_structure.json'
import Tippy from '@tippyjs/react';
import { FaEye } from 'react-icons/fa';

function HousingStructureTable() {

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[30%] lg:table-cell'>Type</th>
      <th className='p-2 w-[30%] lg:table-cell'>Category</th>
      <th className='p-2 w-[20%] lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[10%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody>
    {
      structures.map((structure, index) => <tr key={index} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index }</td>
        <td className='p-2'>{ structure.type }</td>
        <td className='p-2'>{ structure.category }</td>
        <td className='p-2'>{ structure.registered }</td>
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

export default HousingStructureTable;
