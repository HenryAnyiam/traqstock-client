import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import chickenTypes from '../mock_data/chicken_type.json';
import { getFlockBreed } from '../Utils/Funcs';
import { addFlockBreedInformation, handleData } from '../Utils/Funcs';
import { toast } from 'react-toastify';

function NewBreedInformation() {
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [breeds, setBreeds] = useState([]);

  const submitData = async (data) => {
    if (!errors.breed && !errors.chicken_type &&
      !errors.average_mature_weight_in_kgs &&
      !errors.average_egg_production &&
      !errors.maturity_age_in_weeks
    ) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockBreedInformation(data);
      await handleData(res, loader, text, toast, reset)
    }
  }

  useEffect(() => {
    getFlockBreed()
      .then((res) => {
        res.json()
          .then((data) => {
            setBreeds(data);
          })
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Inspection</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="breed-name" className="font-bold font-serif text-hover-gold p-1 mr-2">Breed:</label>
              <select id='breed-name' defaultValue='default'
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
              { ...register('breed', {
                required: 'Select Breed',
                pattern: {
                  value: /^(?!default$).+$/,
                  message: 'Select Breed'
                }
              })}>
                <option value='default' disabled>Breed Name</option>
                {breeds.map((breed) => <option key={breed.id} value={breed.id}>{ breed.name }</option>)}
              </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.breed?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="chickenType" className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</label>
            <select id='chickenType' defaultValue='default'
            className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
            { ...register('chicken_type', {
              required: 'Select Chicken Type',
              pattern: {
                value: /^(?!default$).+$/,
                message: 'Select Chicken Type'
              }
            })}>
              <option value='default' disabled>Chicken Type</option>
              {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.chicken_type?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="amw" className="font-bold font-serif text-hover-gold p-1 mr-2">Average Weight:</label>
            <input type="number" id="amw" placeholder='Average Mature Weight(kgs)' max='3'
            { ...register('average_mature_weight_in_kgs', {
              required: 'Input Average Weight',
              min: {
                value: 1.50,
                message: 'Minimum Weight is 1.5'
              },
              max: {
                value: 3,
                message: 'Maximum Weight is 3'
              }
            })}
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.average_mature_weight_in_kgs?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="aep" className="font-bold font-serif text-hover-gold p-1 mr-2">Average Eggs:</label>
            <input type="number" id="aep" placeholder='Average Eggs Produced'
            { ...register('average_egg_production', {
              required: 'Input Average Eggs'
            })}
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.average_egg_production?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="maw" className="font-bold font-serif text-hover-gold p-1 mr-2">Maturity Age:</label>
            <input type="number" name="maw" id="maw" placeholder='Maturity Age in Weeks' max='24' min='8'
            { ...register('maturity_age_in_weeks', {
              required: 'Input Maturity Age',
              min: {
                value: 8,
                message: 'Minimum Age is 8'
              },
              max: {
                value: 24,
                message: 'Maximum Age is 24'
              }
            })}
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.maturity_age_in_weeks?.message }</p>
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

export default NewBreedInformation;
