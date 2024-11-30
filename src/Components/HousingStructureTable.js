import React, { useEffect, useState } from 'react';
import { getHousingStructures } from '../Utils/Funcs';
import Loader from './Loader';

function HousingStructureTable() {
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHousingStructures()
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data);
            setStructures(data);
            setLoading(false)
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
          <th className='p-2 w-[25%] lg:table-cell'>Type</th>
          <th className='p-2 w-[25%] lg:table-cell'>Category</th>
          <th className='p-2 w-[15%] hidden lg:table-cell '>Total Registered</th>
          <th className='p-2 w-[15%] table-cell lg:hidden'>Total</th>
          <th className='p-2 w-[10%] lg:table-cell '></th>
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
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Name</th>
      <th className='p-2 w-[25%] lg:table-cell'>Type</th>
      <th className='p-2 w-[25%] lg:table-cell'>Category</th>
      <th className='p-2 w-[15%] hidden lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[15%] table-cell lg:hidden'>Total</th>
    </tr>
  </thead>
  <tbody>
    {
      structures.map((structure, index) => <tr key={structure.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index + 1 }</td>
        <td className='p-2'>{ structure.name }</td>
        <td className='p-2'>{ structure.house_type }</td>
        <td className='p-2'>{ structure.category }</td>
        <td className='p-2'>{ structure.total_registered }</td>
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default HousingStructureTable;
