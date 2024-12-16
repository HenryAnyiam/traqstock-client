import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaChartBar, FaTable } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { addFarmData, handleData } from '../Utils/Funcs';
import { toast } from 'react-toastify';

function FarmData() {
  const [modalState, setModalState] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [key, setKey] = useState(0);

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  const submitData = async (data) => {
    if (!errors.feed_intake &&
        !errors.water_intake &&
        !errors.vaccine_administered) {
        const loader = document.getElementById('query-loader');
        const text = document.getElementById('query-text');
        loader.style.display = 'flex';
        text.style.display = 'none';
        const res = await addFarmData(data);
        handleData(res, loader, text, toast, reset)
        .finally(() => {
          setKey((prevKey) => prevKey + 1);
          setModalState(false);
        });
    }
  }

  return (
    <div className='h-full p-4 w-full' id='report-view'>
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
        <p className="text-center rounded-xl text-black p-1 w-full mb-2 text-xl">Add New Record</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="feed_intake" className="text-black p-1 mr-2">Feed Intake:</label>
              <input type="number" id="feed_intake" placeholder="Feed Intake" { ...register("feed_intake", { required: "Add Feed intake" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.feed_intake?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="water_intake" className="text-black p-1 mr-2">Water Intake:</label>
              <input type="number" id="water_intake" placeholder="Water Intake" { ...register("water_intake", { required: "Add Water Intake" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.water_intake?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="vaccine" className="text-black p-1 mr-2">Vaccine:</label>
              <input type="text" id="vaccine" placeholder="Vaccine" { ...register("vaccine_administered", { required: "Add vaccine" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.vaccine_administered?.message }</p>
          <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-white bg-new-green p-2 rounded-xl btn-anim">
                <div className="dots hidden" id="query-loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span id="query-text">Submit Data</span>
              </button>
          </div>
        </form>
      </div>
    </Modal>
      <div className="flex justify-between m-2 ml-0">
        <div className='flex justify-start'>
          <NavLink to='table'>
            <FaTable className='mr-1' />
            Table
          </NavLink>
          <NavLink to='chart'>
            <FaChartBar className='mr-1' />
            Chart
          </NavLink>
        </div>
        <Tippy content='Create new farm record'>
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
      <Outlet key={key} />
    </div>
  )
}

export default FarmData;
