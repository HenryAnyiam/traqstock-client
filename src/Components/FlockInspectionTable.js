import React, { useState, useEffect } from 'react';
import { getFlockInspection, convertDateTime } from '../Utils/Funcs';
import Loader from './Loader';

function FlockInspectionTable() {
  const [inspections, setInspection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlockInspection()
      .then((res) => {
        res.json()
          .then((data) => {
            setInspection(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  if (loading) {
    return <div className=''>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
          <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
          <th className='p-2 w-[25%] lg:table-cell '>Date Inspected</th>
          <th className='p-2 w-[25%] lg:table-cell '>Dead Birds</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td colSpan="2" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td className='table-cell lg:hidden' colSpan="4">
            <Loader className='' />
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  }

  return <div className=''>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Date Inspected</th>
      <th className='p-2 w-[25%] lg:table-cell '>Dead Birds</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      inspections.map((inspection, index) => 
        <tr key={inspection.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
          <td className='p-2'>{ index + 1 }</td>
          <td className='p-2'>{ inspection.flock_name }</td>
          <td className='p-2'>{ convertDateTime(inspection.date_of_inspection) }</td>
          <td className='p-2'>{ inspection.number_of_dead_birds }</td>
        </tr>
      )
    }
  
  </tbody>
</table>
</div>
}

export default FlockInspectionTable;
