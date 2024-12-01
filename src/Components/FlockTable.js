import Tippy from '@tippyjs/react';
import React, { useEffect, useState } from 'react';
import { FaEye, FaPencilAlt, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { getFlocks } from '../Utils/Funcs';
import Loader from './Loader';

function FlockTable() {

  const [flocks, setFlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    getFlocks()
      .then((res) => {
        res.json()
          .then((data) => {
            setFlocks(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  const toggleModal = () => {
    const holdData = document.getElementById('hold-data');
    holdData.classList.toggle('hidden')
  }

  const openViewDetails = (data) => {
    setItem(data);
    toggleModal();
  }

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[5%]'>S/No</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Source</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Breed</th>
          <th className='p-2 w-[30%] lg:w-[20%]'>Date Established</th>
          <th  className='p-2 w-[10%]'></th>
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
  
  return (
    <div>
      <div className='modal-hold hidden' id="hold-data">
        <div className='modal-content'>
          <div className="bg-base-brown shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
            <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-hover-gold bg-base-brown p-2 mr-4 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold"
              onClick={() => { toggleModal() }}>
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Flock Details</p>
            <div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Source:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.source.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Breed:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.breed.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Established Date:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.date_established }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Hatch Date:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.date_of_hatching }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.chicken_type }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Initial Birds:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.initial_number_of_birds }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Rearing method:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.current_rearing_method }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Housing Structure:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.current_housing_structure }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Age in Weeks:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.age_in_weeks }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">Age in Weeks on Farm:</p>
                  <p className="font-bold font-serif text-hover-gold p-1 mr-2">{ item?.age_in_weeks_in_farm }</p>
              </div>
              <div className="m-4 flex justify-center">
                  <button
                  className="flex justify-center items-center text-center text-hover-gold bg-base-brown p-2 mr-4 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                    <FaPencilAlt/> <span className='ml-2'>Edit Flock</span>
                  </button>
                  <button
                  className="flex justify-center items-center text-center text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                    <FaTrashAlt/> <span className='ml-2'>Delete Flock</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[5%]'>S/No</th>
          <th className='p-2 w-[20%] table-cell lg:hidden'>Name</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Source</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Breed</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Date Established</th>
          <th  className='p-2 w-[10%]'></th>
        </tr>
      </thead>
      <tbody className='text-xs lg:text-sm'>
        {
          flocks.map((flock, index) => <tr key={flock.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
            <td className='p-2'>{ index + 1 }</td>
            <td className='p-2 table-cell lg:hidden'>{ flock.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.source.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.breed.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.date_established }</td>
            <td className='p-2'>
              <Tippy content='View Full Details'>
                <button aria-label={`Edit ${flock.username}`} onClick={() => openViewDetails(flock)}>
                  <FaEye />
                </button>
              </Tippy>
          </td>
          </tr>)
        }
      </tbody>
    </table>
    </div>
  )
}

export default FlockTable;