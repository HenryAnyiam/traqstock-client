import React from 'react'

function WeeklyReportTable() {
  return (
    <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <td className='p-2 w-[15%]'>From</td>
          <td className='p-2 w-[15%]'>To</td>
          <td className='p-2 w-[13%]'>Feed Intake</td>
          <td className='p-2 w-[13%]'>Water Intake</td>
          <td  className='p-2 w-[13%]'>Mortality</td>
          <td  className='p-2 w-[20%]'>Vaccination</td>
          <td  className='p-2 w-[5%]'></td>
        </tr>
      </thead>
    </table>
  )
}

export default WeeklyReportTable