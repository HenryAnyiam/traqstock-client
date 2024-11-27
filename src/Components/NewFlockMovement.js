import React, { useState, useEffect } from 'react';
import { getHousingStructures, getFlocks, addFlockMovement } from '../Utils/Funcs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function NewFlockMovement() {
  const [flocks, setFlocks] = useState([]);
  const [structures, setStructures] = useState([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState

  useEffect(() => {
    Promise.all([getFlocks(), getHousingStructures()])
    .then(([flockRes, structureRes]) => 
      Promise.all([flockRes.json(), structureRes.json()])
    )
    .then(([flockData, structureData]) => {
      setFlocks(flockData);
      setStructures(structureData);
      console.log(flockData, structureData)
    })
    .catch(err => console.log(err));
  }, [])

  const submitData = async (data) => {
    if (!errors.house_type &&
      !errors.to_structure &&
      !errors.from_structure
    ) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockMovement(data);
      console.log(res.status);
      if (res.status === 200) {
        toast.success('Flock movement logged successfuly');
        reset();
      } else if (res.status === 500) {
        toast.error('An unexpected error occurred');
        const text = await res.text();
        console.log('error', text);
      } else {
        toast.warning('Flock movement not logged successfully');
      }
      loader.style.display = 'none';
      text.style.display = 'block';
    }
  }
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Flock Movement</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="housing-type" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
                <select id='housing-type' defaultValue="default" { ...register('flock', {
                  required: "Select House Type",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select House Type"
                  } 
                  }) }
                 className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Flock</option>
                  {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.id}` }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.house_type?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="movedFromStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Moved From:</label>
                <select id='movedFromStructure' defaultValue="default" { ...register('from_structure', {
                  required: "Select Structure Moved From",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Structure Moved From"
                  } 
                  })} 
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Moved From</option>
                  {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.category} - ${structure.house_type}` }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.from_structure?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="MovedToStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Moved To:</label>
                <select id='MovedToStructure' defaultValue="default" { ...register('to_structure', {
                  required: "Select structure moved to",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select structure moved to"
                  } 
                  })}
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Moved To</option>
                  {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.category} - ${structure.house_type}` }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.to_structure?.message }</p>
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

export default NewFlockMovement;
