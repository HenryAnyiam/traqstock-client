import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { FaEye } from 'react-icons/fa';
import Loader from './Loader';
import { getFlockSource } from '../Utils/Funcs';

function FlockSource() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlockSource()
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              setSources(data)
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
       <h2 className='text-3xl'>Flock Sources</h2>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
      <tr className='h-10 text-xs lg:text-sm'>
        <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
        <th className='p-2 w-[35%] lg:table-cell'>Source Name</th>
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
    <h2 className='text-3xl'>Flock Sources</h2>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[35%] lg:table-cell'>Source Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[25%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody>
    {
      sources.map((source, index) => <tr key={index} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index + 1 }</td>
        <td className='p-2'>{ source.name }</td>
        <td className='p-2'>{ source.total_registered }</td>
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

export default FlockSource;
