import React, { useState, useEffect } from 'react';
import { getHousingStructures, getFlocks, addFlockHistory, handleData } from '../Utils/Funcs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import rearingMethods from '../mock_data/rearing_method.json';

function NewFlockHistory() {
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
    if (!errors.flock &&
      !errors.rearing_method &&
      !errors.current_housing_structure
    ) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockHistory(data);
      await handleData(res, loader, text, toast, reset);
    }
  }
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Flock Movement</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="flock-name" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
            <select id='flock-name' defaultValue="default" { ...register('flock', {
              required: "Select Flock",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Flock"
              } 
              }) }
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Flock</option>
              {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.name}` }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.flock?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="rearingMethod" className="font-bold font-serif text-hover-gold p-1 mr-2">Rearing method:</label>
                <select id='rearingMethod' defaultValue='default'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('rearing_method', {
                  required: "Select Rearing method",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Rearing method"
                  } 
                  }) }>
                  <option value='default' disabled>Rearing method</option>
                  {rearingMethods.map((method) => <option key={method.id} value={method.name}>{ method.name }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.rearing_method?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="currentStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Moved From:</label>
            <select id='currentStructure' defaultValue="default" { ...register('current_housing_structure', {
              required: "Select Housing Structure",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Housing Structure"
              } 
              })} 
            className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Housing Structure</option>
              {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.name}` }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.current_housing_structure?.message }</p>
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

export default NewFlockHistory;
