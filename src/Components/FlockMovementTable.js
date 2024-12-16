import React, { useEffect, useState } from 'react';
import { getFlockMovement, convertDate } from '../Utils/Funcs';
import Loader from './Loader';

function FlockMovementTable() {
  const [movement, setMovement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlockMovement()
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              console.log(data);
              if (!(JSON.stringify(data) === JSON.stringify({detail: 'No flock movement records available.'}))) {
                setMovement(data)
              }
              setLoading(false);
            })
        }
        setLoading(false);
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
        <th className='p-2 w-[25%] lg:table-cell '>Moved From</th>
        <th className='p-2 w-[25%] lg:table-cell '>Moved To</th>
        <th className='p-2 w-[20%] lg:table-cell '>Date Moved</th>
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
      <th className='p-2 w-[25%] lg:table-cell '>Moved From</th>
      <th className='p-2 w-[25%] lg:table-cell '>Moved To</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date Moved</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
  {
      movement.map((move, index) => <tr key={ move.id } className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index }</td>
        <td className='p-2'>{ move.flock_name }</td>
        <td className='p-2'>{ move.from_structure_name }</td>
        <td className='p-2'>{ move.to_structure_name }</td>
        <td className='p-2'>{ convertDate(move.movement_date) }</td>
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockMovementTable;
