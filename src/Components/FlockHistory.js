import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import FlockHistoryTable from './FlockHistoryTable';
import {
  getHousingStructures,
  getFlocks,
  addFlockHistory,
  handleData,
} from "../Utils/Funcs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import rearingMethods from "../mock_data/rearing_method.json";
import Modal from "react-modal";

function FlockHistory() {
  const [flocks, setFlocks] = useState([]);
  const [structures, setStructures] = useState([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [modalState, setModalState] = useState(false);
  const [key, setKey] = useState(0);
  
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
      const loader = document.getElementById('query-loader-main');
      const text = document.getElementById('query-text-main');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockHistory(data);
      handleData(res, loader, text, toast, reset)
      .finally(() => {
        setModalState(false);
        setKey((prev) => prev + 1);
      })
    }
  }
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
        <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Record New Flock History</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="flock-name" className="font-semibold text-black p-1 mr-2">Flock:</label>
            <select id='flock-name' defaultValue="default" { ...register('flock', {
              required: "Select Flock",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Flock"
              } 
              }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Flock</option>
              {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.name}` }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.flock?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="rearingMethod" className="font-semibold text-black p-1 mr-2">Rearing method:</label>
                <select id='rearingMethod' defaultValue='default'
                className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
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
            <label htmlFor="currentStructure" className="font-semibold text-black p-1 mr-2">Housing:</label>
            <select id='currentStructure' defaultValue="default" { ...register('current_housing_structure', {
              required: "Select Housing Structure",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Housing Structure"
              } 
              })} 
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Housing Structure</option>
              {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.name}` }</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.current_housing_structure?.message }</p>
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
        <h2 className='text-3xl'>Flock History</h2>
        <Tippy content='Record new Flock History'>
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
      <FlockHistoryTable key={key} />
    </div>
  )
}

export default FlockHistory;