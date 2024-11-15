import React from 'react';

function EggCollectionTable() {

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[10%] lg:table-cell '>Collected</th>
      <th className='p-2 w-[10%] lg:table-cell '>Broken</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date</th>
      <th className='p-2 w-[20%] lg:table-cell '>Time</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    <tr>
      <td className='p-2'>1</td>
      <td className='p-2'>Virgin Flock</td>
      <td className='p-2'>16</td>
      <td className='p-2'>2</td>
      <td className='p-2'>22-10-2024</td>
      <td className='p-2'>22:12</td>
    </tr>
  </tbody>
</table>
</div>
}

export default EggCollectionTable;
