import React from 'react';

function FlockInspectionTable() {

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Date Inspected</th>
      <th className='p-2 w-[25%] lg:table-cell '>Dead Birds</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
  <tr>
          <td className='p-2'>1</td>
          <td className='p-2'>Virgin Flock</td>
          <td className='p-2'>22-10-2024</td>
          <td className='p-2'>2</td>
        </tr>
  </tbody>
</table>
</div>
}

export default FlockInspectionTable;
