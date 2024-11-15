import React from 'react';

function FlockMovementTable() {

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Moved From</th>
      <th className='p-2 w-[25%] lg:table-cell '>Moved To</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date Moved</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
  <tr>
          <td className='p-2'>1</td>
          <td className='p-2'>Virgin Flock</td>
          <td className='p-2'>Chick Structure</td>
          <td className='p-2'>Rooster Housing</td>
          <td className='p-2'>22-10-2024</td>
        </tr>
  </tbody>
</table>
</div>
}

export default FlockMovementTable;
