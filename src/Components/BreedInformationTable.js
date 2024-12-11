import Tippy from '@tippyjs/react';
import React, { useEffect, useState } from 'react';
import { getFlockBreedInformation, convertDate } from '../Utils/Funcs';
import Loader from './Loader';

function BreedInformationTable() {

  const [breedInformation, setBreedInformation] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFlockBreedInformation()
      .then((res) => {
        res.json()
          .then((data) => {
            setBreedInformation(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[10%] hidden lg:table-cell'>S/No</th>
          <th className='p-2 w-[20%] lg:table-cell'>Breed</th>
          <th className='p-2 w-[20%] lg:table-cell'>Type</th>
          <Tippy content='Average Mature Weight in Kgs'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AMW(kgs)</th>
          </Tippy>
          <Tippy content='Average Egg Production'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AEP</th>
          </Tippy>
          <Tippy content='Maturity Age in Weeks'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>MAW</th>
          </Tippy>
          <th className='p-2 w-[20%] hidden lg:table-cell '>Date Added</th>
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
      <th className='p-2 w-[10%] hidden lg:table-cell'>S/No</th>
      <th className='p-2 w-[20%] lg:table-cell'>Breed</th>
      <th className='p-2 w-[20%] lg:table-cell'>Type</th>
      <Tippy content='Average Mature Weight in Kgs'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AMW(kgs)</th>
      </Tippy>
      <Tippy content='Average Egg Production'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AEP</th>
      </Tippy>
      <Tippy content='Maturity Age in Weeks'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>MAW</th>
      </Tippy>
      <th className='p-2 w-[20%] hidden lg:table-cell '>Date Added</th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      breedInformation.map((info, index) => <tr key={info.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
      <td className='p-2 hidden lg:table-cell'>{ index + 1 }</td>
      <td className='p-2'>{ info.breed_name }</td>
      <td className='p-2'>{ info.chicken_type }</td>
      <td className='p-2'>{ info.average_mature_weight_in_kgs }</td>
      <td className='p-2'>{ info.average_egg_production }</td>
      <td className='p-2'>{ info.maturity_age_in_weeks }</td>
      <td className='p-2 hidden lg:table-cell'>{ convertDate(info.date_added) }</td>
    </tr>)
    }
  </tbody>
</table>
</div>
}

export default BreedInformationTable;
