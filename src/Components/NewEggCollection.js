import React, { useState, useEffect } from 'react';
import { addEggCollection, getFlocks, handleData } from '../Utils/Funcs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function NewEggCollection() {
  const [flocks, setFlocks] = useState([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const submitData = async (data) => {
    if (!errors.flock && !errors.collected_eggs &&
      !errors.broken_eggs
    ) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addEggCollection(data);
      await handleData(res, loader, text, toast, reset);
    }
  }

  useEffect(() => {
    getFlocks()
      .then((res) => {
        res.json()
          .then((data) => {
            setFlocks(data);
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Egg Collection</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="flock" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
                <select id='flock' defaultValue='default'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('flock', {
                  required: 'Select Flock',
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: 'Select Flock'
                  }
                })}
                >
                  <option value='default' disabled>Flock Name</option>
                  { flocks.map((flock) => <option key={flock.id} value={flock.id}>{flock.name}</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.flock?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="collectedEggs" className="font-bold font-serif text-hover-gold p-1 mr-2">Eggs Collected:</label>
              <input type="number" id="collectedEggs" placeholder='Number of Eggs Collected' { ...register('collected_eggs', {
                required: 'Input Nymber of Collected Eggs',
                min: {
                  value: 0,
                  message: 'Minimum value is 0'
                }
              })}
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.collected_eggs?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="brokenEggs" className="font-bold font-serif text-hover-gold p-1 mr-2">Broken Eggs:</label>
              <input type="number" id="brokenEggs" placeholder='Number of Broken Eggs' { ...register('broken_eggs', {
                required: 'Input Nymber of Broken Eggs',
                min: {
                  value: 0,
                  message: 'Minimum value is 0'
                }
              })}
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.broken_eggs?.message }</p>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <div className="dots hidden" id="query-loader">
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                  </div>
                  <span id="query-text" className='text-center'>Submit Data</span>
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewEggCollection;
