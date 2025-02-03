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

function EggSales() {
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
        <h2 className='text-3xl'>Egg Sales</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg shadow-md btn-anim'
        onClick={() => { dispatch('openMain') }}>
          <span className='text-sm'>New Egg Sale</span>
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
            <td className='p-2 w-[25%]'>Crates</td>
            <td className='p-2 w-[15%]'>Unit Price</td>
            <td className='p-2 w-[40%]'>Date Sold</td>
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
              <label htmlFor="no_of_crates" className="text-black p-1 mr-2">Crates:</label>
              <input type="number" id="no_of_crates" placeholder="Number Of Crates" { ...register("no_of_crates", { required: "Add Number Of Crates" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.no_of_crates?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="unit_price" className="text-black p-1 mr-2">Unit Price:</label>
              <input type="number" id="unit_price" placeholder="Unit Price Of Crate" { ...register("unit_price", { required: "Add Associated Cost" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.unit_price?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="date_sold" className="text-black p-1 mr-2">Date Sold:</label>
              <input type="date" id="date_sold" placeholder="Date Sold" { ...register("date_sold", { required: "Add Date Sold" }) }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <p className='text-xs text-red-600 mb-3 text-center'>{ errors.date_sold?.message }</p>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="note" className="text-black p-1 mr-2">Note/Remark:</label>
              <textarea id="note" rows="3" placeholder="Note" { ...register("note") }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"></textarea>
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
        <h2 className='text-3xl'>Egg Sales</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
        onClick={() => { dispatch('openMain') }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            <span className='text-sm'>New Record</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Crates</td>
            <td className='p-2 w-[15%]'>Unit Price</td>
            <td className='p-2 w-[40%]'>Date Sold</td>
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

export default EggSales;
