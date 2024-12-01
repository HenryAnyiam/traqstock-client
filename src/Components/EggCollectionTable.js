import React, { useState, useEffect } from 'react';
import { getEggCollection, convertDate, convertTime  } from '../Utils/Funcs';
import Loader from './Loader';

function EggCollectionTable() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getEggCollection()
      .then((res) => {
        res.json()
          .then((data) => {
            setCollection(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  if (loading) {
    return <div>
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
      <tbody>
        <tr>
          <td colSpan="3" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td colSpan="3" className='hidden lg:table-cell'>
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
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[10%] lg:table-cell '>Collected</th>
      <th className='p-2 w-[10%] lg:table-cell '>Broken</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date</th>
      <th className='p-2 w-[20%] lg:table-cell '>Time</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      collection.map((data, index) => <tr key={data.id}  className='h-10 border-b-2 font-normal text-sm lg:text-base'>
      <td className='p-2'>{ index + 1 }</td>
      <td className='p-2'>{ data.flock_name }</td>
      <td className='p-2'>{ data.collected_eggs }</td>
      <td className='p-2'>{ data.broken_eggs }</td>
      <td className='p-2'>{ convertDate(data.date_of_collection) }</td>
      <td className='p-2'>{ convertTime(data.time_of_collection) }</td>
    </tr>)
    }
  </tbody>
</table>
</div>
}

export default EggCollectionTable;
