import React from 'react'

function StaffManagement() {
  return (
    <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Staff Details</h2>
        <button
        className='fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'>
          <span className='text-sm'>New Staff</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%]'>S/N</td>
            <td className='p-2 w-[35%]'>Name</td>
            <td className='p-2 w-[35%]'>Role</td>
            <td  className='p-2 w-[20%]'>Action</td>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default StaffManagement;
