import React, { useEffect, useState } from 'react';
import { getFlocks, addFlockInspection, handleData } from '../Utils/Funcs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function NewFlockInspection() {
  const [flocks, setFlocks] = useState([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  useEffect(() => {
    Promise.all([getFlocks()])
    .then(([flockRes]) => 
      Promise.all([flockRes.json()])
    )
    .then(([flockData]) => {
      setFlocks(flockData);
      console.log(flockData)
    })
    .catch(err => console.log(err));
  }, [])

  const submitData = async (data) => {
    if (!errors.flock &&
      !errors.number_of_dead_birds
    ) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockInspection(data);
      await handleData(res, loader, text, toast, reset);
    }
  }

  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Inspection</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="flock-name" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
            <select id='flock-name' defaultValue="default" { ...register('flock', {
              required: "Select House Type",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select House Type"
              } 
              }) }
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Flock Name</option>
              {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.name}` }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.flock?.message }</p>
          <div className="m-4 lg:grid lg:grid-cols-3">
            <label htmlFor="deadBirds" className="font-bold font-serif text-hover-gold p-1 mr-2">Dead Birds:</label>
            <input type="number" id="deadBirds" placeholder='Number of Dead Birds' min='0' defaultValue="default" { ...register('number_of_dead_birds', {
              required: "Input Number of Dead Birds",
              min: {
                value: 0,
                message: 'Minimum number is 0'
              }
              }) }
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.number_of_dead_birds?.message }</p>
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

export default NewFlockInspection;
