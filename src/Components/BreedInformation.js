import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import BreedInformationTable from './BreedInformationTable';
import { useForm } from 'react-hook-form';
import chickenTypes from '../mock_data/chicken_type.json';
import { getFlockBreed } from '../Utils/Funcs';
import { addFlockBreedInformation, handleData } from '../Utils/Funcs';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

function BreedInformation() {
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [breeds, setBreeds] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [key, setKey] = useState(0);

  const submitData = async (data) => {
    if (!errors.breed && !errors.chicken_type &&
      !errors.average_mature_weight_in_kgs &&
      !errors.average_egg_production &&
      !errors.maturity_age_in_weeks
    ) {
      const loader = document.getElementById('query-loader-main');
      const text = document.getElementById('query-text-main');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockBreedInformation(data);
      handleData(res, loader, text, toast, reset)
      .finally(() => {
        setModalState(false);
        setKey((prev) => prev + 1);
      });
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
  }, []);

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);


  return (
    <div className='h-full p-4 w-full overflow-hidden' id='report-view'>
      <Modal 
      isOpen={modalState} onRequestClose={() => { setModalState(false); }}
      style={{
        content: {
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(241 245 249)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
      }}
      >
      <div className="h-fit w-80 lg:w-fit">
      <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Add New Breed Information</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="breed-name" className="font-semibold text-black p-1 mr-2">Breed:</label>
              <select id='breed-name' defaultValue='default'
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
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
            <label htmlFor="chickenType" className="font-semibold text-black p-1 mr-2">Chicken Type:</label>
            <select id='chickenType' defaultValue='default'
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
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
            <label htmlFor="amw" className="font-semibold text-black p-1 mr-2">Average Weight:</label>
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
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.average_mature_weight_in_kgs?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="aep" className="font-semibold text-black p-1 mr-2">Average Eggs:</label>
            <input type="number" id="aep" placeholder='Average Eggs Produced'
            { ...register('average_egg_production', {
              required: 'Input Average Eggs'
            })}
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.average_egg_production?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="maw" className="font-semibold text-black p-1 mr-2">Maturity Age:</label>
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
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.maturity_age_in_weeks?.message }</p>
          <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-white bg-new-green p-2 rounded-xl font-semibold btn-anim">
                <div className="dots hidden" id="query-loader-main">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span id="query-text-main" className='text-center'>Submit Data</span>
              </button>
          </div>
        </form>
      </div>
      </Modal>
      <div className="flex justify-between m-2 ml-0">
        <h2 className='text-3xl'>Breed information</h2>
        <Tippy content='Add new Breed Information'>
          <button onClick={ () => { setModalState(true); } }
          className='fill-black text-black flex w-28 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className='h-6 w-6 ml-1'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
              <span className='text-sm'>New</span>
          </button>
        </Tippy>
      </div>
      <BreedInformationTable key={key} />
    </div>
  )
}

export default BreedInformation;