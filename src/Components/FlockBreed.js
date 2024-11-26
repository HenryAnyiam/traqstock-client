import React, { useEffect, useState } from 'react';
import breeds from '../mock_data/flock_breed.json';
import Tippy from '@tippyjs/react';
import { FaEye } from 'react-icons/fa';
import Loader from './Loader';
import { getFlockBreed } from '../Utils/Funcs';

function FlockBreed() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlockBreed()
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              setBreeds(data)
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
    return <div className='lg:p-4'>
       <h2 className='text-3xl'>Flock Breeds</h2>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
      <tr className='h-10 text-xs lg:text-sm'>
        <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
        <th className='p-2 w-[35%] lg:table-cell'>Breed Name</th>
        <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
        <th className='p-2 w-[25%] lg:table-cell '></th>
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

  return <div className='lg:p-4'>
    <h2 className='text-3xl'>Flock Breeds</h2>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[35%] lg:table-cell'>Breed Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[25%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody>
    {
      breeds.map((breed, index) => <tr key={index} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index }</td>
        <td className='p-2'>{ breed.name }</td>
        <td className='p-2'>{ breed.registered }</td>
        <td className='p-2'>
          <Tippy content='View registered flocks'>
            <button>
              <FaEye />
            </button>
          </Tippy>
        </td>
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockBreed;
