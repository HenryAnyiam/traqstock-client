import Modal from 'react-modal';
import React, { useEffect, useReducer } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';

const initialModalState = { main: false, edit: false, delete: false }
const reducer = (state, action) => {
  switch(action) {
    case 'openMain':
      return { ...state, main: true }
    case 'closeMain':
      return { ...state, main: false }
    case 'openDelete':
      return { ...state, delete: true }
    case 'closeDelete':
      return { ...state, delete: false }
    case 'openEdit':
      return { ...state, edit: true }
    case 'closeEdit':
      return { ...state, edit: false }
    default:
      return state
  }
}

function Treatment() {
  const [ modalState, dispatch ] = useReducer(reducer, initialModalState);
  const staffData = [];
  const loading = false;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  const submitData = () => {}

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Treatment Details</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg shadow-md btn-anim'
        onClick={() => { dispatch('openMain') }}>
          <span className='text-sm'>New Treatment</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-bold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Flock</td>
            <td className='p-2 w-[15%]'>Treatment Type</td>
            <td className='p-2 w-[40%]'>Date Treated</td>
            <td  className='p-2 w-[10%]'>Action</td>
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
    <div className='h-full p-4 w-full'>
      <Modal 
      isOpen={modalState.main} onRequestClose={() => { dispatch('closeMain') }}
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
            <label htmlFor="flock-name" className="font-semibold text-black p-1 mr-2">Flock Fed:</label>
            <select id='flock-name' defaultValue="default" { ...register('flock', {
              required: "Select Flock",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Flock"
              } 
              }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Flock</option>
            </select>
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.flock?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="treatmentType" className="font-semibold text-black p-1 mr-2">Treament Type:</label>
            <select id='treatmentType' defaultValue="default" { ...register('treatment_type', {
              required: "Select Treament Type",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Treament Type"
              } 
              }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Treament Type</option>
              <option value="Medication">Medication</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Supplements">Supplements</option>
            </select>
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.treatment_type?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="details" className="text-black p-1 mr-2">Details:</label>
              <input type="text" id="details" placeholder="Treatment Details" { ...register("details", { required: "Add Details" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.details?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="dosage" className="text-black p-1 mr-2">Dosage:</label>
              <input type="text" id="dosage" placeholder="Treatment Dosage" { ...register("dosage", { required: "Add Dosage" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.dosage?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="associated_cost" className="text-black p-1 mr-2">Associated Cost:</label>
              <input type="number" id="associated_cost" placeholder="Associated cost for Treatment" { ...register("associated_cost", { required: "Add Associated Cost" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.associated_cost?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="treatmentMethod" className="font-semibold text-black p-1 mr-2">Treament Method:</label>
            <select id='treatmentMethod' defaultValue="default" { ...register('treatment_method', {
              required: "Select Treament Method",
              pattern: {
                value: /^(?!default$).+$/,
                message: "Select Treament Method"
              } 
              }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Treament Method</option>
              <option value="Intramuscular">Intramuscular</option>
              <option value="Oral">Oral</option>
              <option value="Subcutaneous">Subcutaneous</option>
              <option value="Topical">Topical</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.treatment_method?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="birds_treated" className="text-black p-1 mr-2">Birds Treated:</label>
              <input type="number" id="birds_treated" placeholder="Number of Birds Treated" { ...register("birds_treated", { required: "Add Number of Birds Treated" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.birds_treated?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="veterinarian" className="text-black p-1 mr-2">Veterinarian:</label>
              <input type="text" id="veterinarian" placeholder="Veterinarian" { ...register("veterinarian", { required: "Add Veterinarian" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.veterinarian?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="date_administered" className="text-black p-1 mr-2">Date Fed:</label>
              <input type="date" id="date_administered" placeholder="Date Administered" { ...register("date_administered", { required: "Add vaccine" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.date_administered?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="time_administered" className="text-black p-1 mr-2">Time Administered:</label>
              <input type="time" id="time_administered" placeholder="Time Administered" { ...register("time_administered", { required: "Add Time Administered" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.time_administered?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="note" className="text-black p-1 mr-2">Note/Remark:</label>
              <textbox id="note" placeholder="Note" { ...register("note") }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"></textbox>
          </div>
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
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Treatment Details</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
        onClick={() => { dispatch('openMain') }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            <span className='text-sm'>New Treatment</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Flock</td>
            <td className='p-2 w-[15%]'>Treatment Type</td>
            <td className='p-2 w-[40%]'>Date Treated</td>
            <td  className='p-2 w-[10%]'>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            staffData.map((staff, index) => <tr key={staff.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
              <td className='p-2 hidden lg:table-cell font-normal'>{ index + 1 }</td>
              <td className='p-2'>{ staff.username }</td>
              <td className='p-2'>{ staff.users_role }</td>
              <td className='p-2'>{ staff.last_activity }</td>
              <td className='p-2'>
                <Tippy content={`Edit ${staff.username} details`}>
                  <button  aria-label={`Edit ${staff.username}`}><FaPencilAlt /></button>
                </Tippy>
                <Tippy content={`Delete ${staff.username}`}>
                  <button aria-label={`Delete ${staff.username}`} className='ml-2'><FaTrashAlt /></button>
                </Tippy>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Treatment;
