import Tippy from '@tippyjs/react';
import React from 'react';

function BreedInformationTable() {

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] hidden lg:table-cell'>S/No</th>
      <th className='p-2 w-[20%] lg:table-cell'>Breed</th>
      <th className='p-2 w-[20%] lg:table-cell'>Type</th>
      <Tippy content='Average Mature Weight in Kgs'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AMW(kgs)</th>
      </Tippy>
      <Tippy content='Average Egg Production'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AEP</th>
      </Tippy>
      <Tippy content='Maturity Age in Weeks'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>MAW</th>
      </Tippy>
      <th className='p-2 w-[20%] hidden lg:table-cell '>Date Added</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    <tr>
      <td className='p-2 hidden lg:table-cell'>1</td>
      <td className='p-2'>Rhode Island Red</td>
      <td className='p-2'>Rooster</td>
      <td className='p-2'>1.7</td>
      <td className='p-2'>12</td>
      <td className='p-2'>10</td>
      <td className='p-2 hidden lg:table-cell'>22-10-2024</td>
    </tr>
  </tbody>
</table>
</div>
}

export default BreedInformationTable;
