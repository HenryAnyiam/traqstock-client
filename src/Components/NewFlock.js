import React, { useEffect, useState } from 'react';
import chickenTypes from '../mock_data/chicken_type.json';
import rearingMethods from '../mock_data/rearing_method.json';
import { useForm } from 'react-hook-form';
import {
  getFlockSource, getFlockBreed,
  getHousingStructures, addFlockData,
  handleData
} from '../Utils/Funcs';
import { toast } from 'react-toastify';

function NewFlock() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [sources, setSources] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    Promise.all([getFlockSource(), getFlockBreed(), getHousingStructures()])
    .then(([sourceRes, breedRes, structureRes]) => 
      Promise.all([sourceRes.json(), breedRes.json(), structureRes.json()])
    )
    .then(([sourceData, breedData, structureData]) => {
      setSources(sourceData);
      setBreeds(breedData);
      setStructures(structureData);
    })
    .catch(err => console.log(err));
  }, [])

  const sumbitFlockData = async (data) => {
    if (!errors.source && !errors.breed &&
      !errors.date_of_hatching && !errors.chicken_type &&
      !errors.initial_number_of_birds && !errors.current_rearing_method &&
      !errors.current_housing_structure && !errors.name
    ) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      console.log(data);
      const refinedData = { ...data, ...{ source: { name: data.source }, breed: { name: data.breed }}}
      console.log(refinedData);
      try {
        const res = await addFlockData(refinedData);
        await handleData(res, loader, text, toast, reset);
      } catch(err) {
        console.error(err);
      }
      
    }
  }

  return (
    <div className="bg-base-green flex h-fit min-h-full justify-center items-center py-4 lg:py-0">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Register New Flock</p>
        <form onSubmit={handleSubmit(sumbitFlockData)} noValidate>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="name" className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</label>
                <input type="text" id="name" placeholder='Name'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('name', { required: "Input Name"}) }/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.name?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="flockSource" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Source:</label>
                <select id='flockSource' defaultValue='default'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('source', {
                  required: "Select Source",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Source"
                  } 
                  }) }>
                  <option value='default' disabled>Source</option>
                  {sources.map((source) => <option key={source.id} value={ source.name }>{ source.name }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.source?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="flockBreed" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Breed:</label>
                <select id='flockBreed' defaultValue='default' name='flockBreed'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('breed', {
                  required: "Select Breed",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Breed"
                  } 
                  }) }>
                  <option value='default' disabled>Breed</option>
                  {breeds.map((breed) => <option key={breed.id} value={breed.name}>{ breed.name }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.breed?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="hatchDate" className="font-bold font-serif text-hover-gold p-1 mr-2">Hatch Date:</label>
              <input type="date" id="hatchDate"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('date_of_hatching', { required: "Select Hatch Date"}) }/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.date_of_hatching?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="chickenType" className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</label>
                <select id='chickenType' defaultValue='default'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('chicken_type', {
                  required: "Select Chicken Type",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Chicken Type"
                  } 
                  }) }>
                  <option value='default' disabled>Chicken Type</option>
                  {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.chicken_type?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="initialNumber" className="font-bold font-serif text-hover-gold p-1 mr-2">Initial Birds:</label>
              <input type="number" id="initialNumber" placeholder='Initial Number of Birds' min='0'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" 
                { ...register('initial_number_of_birds', {
                  required: "Input Initial number of birds",
                  pattern: {
                    value: /^(0|[1-9]\d*)$/,
                    message: "Input Initial number of birds"
                  } 
                  }) }/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.initial_number_of_birds?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="rearingMethod" className="font-bold font-serif text-hover-gold p-1 mr-2">Rearing method:</label>
                <select id='rearingMethod' defaultValue='default'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('current_rearing_method', {
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
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.current_rearing_method?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="housingStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Housing Structure:</label>
                <select id='housingStructure' defaultValue='default' 
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('current_housing_structure', {
                  required: "Select Housing Structure",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Housing Structure"
                  } 
                  }) }>
                  <option value='default' disabled>Housing Structure</option>
                  {structures.map((structure) => <option key={structure.id} value={structure.id}>{ structure.name }</option>)}
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{errors.current_housing_structure?.message }</p>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <div className="dots hidden" id="query-loader">
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                  </div>
                  <span id="query-text">Submit Data</span>
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewFlock;
