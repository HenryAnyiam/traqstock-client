import React from 'react'
import REPORT from '../mock_data/MOCK_REPORT_DATA.json'
import Tippy from '@tippyjs/react';
import { FaPencilAlt } from 'react-icons/fa';

function MothlyReportTable() {
  const reportData = REPORT.slice(0, 10);

  return (
    <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[15%] hidden lg:table-cell'>From</th>
          <th className='p-2 w-[15%] hidden lg:table-cell'>To</th>
          <th className='p-2 w-[15%] table-cell lg:hidden'>Date</th>
          <th className='p-2 w-[13%]'>Feed Intake</th>
          <th className='p-2 w-[13%]'>Water Intake</th>
          <th  className='p-2 w-[13%]'>Mortality</th>
          <th  className='p-2 w-[20%]'>Vaccination</th>
          <th  className='p-2 w-[5%]'></th>
        </tr>
      </thead>
      <tbody>
        {
          reportData.map((report) => <tr key={report.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
            <td className='p-2'>{ report.from }</td>
            <td className='p-2 hidden lg:table-cell'>{ report.to }</td>
            <td className='p-2'>{ report.feed_intake }</td>
            <td className='p-2'>{ report.water_intake }</td>
            <td className='p-2'>{ report.mortality }</td>
            <td className='p-2'>{ report.vaccination }</td>
            <td className='p-2'>
              <Tippy content='Edit Report'>
                <button>
                  <FaPencilAlt />
                </button>
              </Tippy>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

export default MothlyReportTable;