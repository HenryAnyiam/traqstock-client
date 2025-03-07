import React, { useState, useEffect } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { getFinance } from '../Utils/Funcs'


function Finance() {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState } = useForm();
  const [item, setItem] = useState(null);
  const [financeData, setFinanceData] = useState([])
  const { errors } = formState;

  const submitData = () => {}

  useEffect(() => {
    getFinance()
      .then((res) => res.json())
      .then((data) => {
        setFinanceData(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const toggleViewModal = () => {
    const holdData = document.getElementById('view-data');
    holdData.classList.toggle('hidden');
  }

  const openViewDetails = (data) => {
    setItem(data);
    const editData = document.getElementById('new-data');
    if (!editData.classList.contains('hidden')) {
      editData.classList.add('hidden');
    }
    toggleViewModal();
  }

  const toggleModal = () => {
    const holdData = document.getElementById('new-data');
    holdData.classList.toggle('hidden');
  }

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Finance</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg shadow-md btn-anim'
        onClick={() => { toggleModal() }}>
          <span className='text-sm'>New Record</span>
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
            <td className='p-2 w-[25%]'>Category</td>
            <td className='p-2 w-[20%]'>Amount</td>
            <td className='p-2 w-[20%]'>Date Occured</td>
            <td  className='p-2 w-[10%]'></td>
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
      <div className='modal-hold hidden' id="view-data">
        <div className='modal-content'>
          <div className={`shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4 ${item?.category === 'Expense' ? 'bg-red-500' : 'bg-new-green'}`}>
            <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-slate-100 btn-anim"
              onClick={() => { toggleViewModal() }}>
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Finance Details</p>
            <div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Category:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.category }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Type:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.finance_type }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Amount:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.amount }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Date Occurred:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.date_occurred }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Beneficiary:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.beneficiary }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Description:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.description === null ? 'No Description' : item?.description }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-hold hidden' id="new-data">
        <div className='modal-content'>
          <div className="bg-slate-100 shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
            <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-new-green btn-anim"
              onClick={() => { toggleModal() }}>
                <FaTimes />
              </button>
            </div>
              <p className="text-center font-semibold rounded-xl text-black p-1 w-full mb-2 text-xl">Add New Record</p>
              <form onSubmit={handleSubmit(submitData)} noValidate>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="category" className="font-semibold text-black p-1 mr-2">Category:</label>
                    <select id='category' defaultValue="default" { ...register('category', {
                      required: "Select Category",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Select Category"
                      } 
                      }) }
                      className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                      <option value="default" disabled>Category</option>
                      <option value="Expense">Expense</option>
                      <option value="Revenue">Revenue</option>
                  </select>
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.category?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="finance_type" className="font-semibold text-black p-1 mr-2">Finance Type:</label>
                    <select id='finance_type' defaultValue="default" { ...register('finance_type', {
                      required: "Select Finance Type",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Select Finance Type"
                      } 
                      }) }
                      className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                      <option value="default" disabled>Finance Type</option>
                  </select>
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.finance_type?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="amount" className="font-semibold text-black p-1 mr-2">Amount:</label>
                    <input type="number" id="amount" placeholder="Amount Involved" { ...register("amount", { required: "Add Amount" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.amount?.message }</p>
                
                
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="beneficiary" className="font-semibold text-black p-1 mr-2">Beneficiary:</label>
                    <input type="text" id="beneficiary" placeholder="Beneficiary" { ...register("beneficiary", { required: "Add Beneficiary" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.beneficiary?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="date_occurred" className="font-semibold text-black p-1 mr-2">Date Occurred:</label>
                    <input type="date" id="date_occurred" placeholder="Date Occurred" { ...register("date_occurred", { required: "Add Date Occurred" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.date_occurred?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="description" className="font-semibold text-black p-1 mr-2">Note/Remark:</label>
                    <textarea id="description" rows="3" placeholder="Add Brief Description" { ...register("description") }
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
        </div>
      </div>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Finance</h2>
        <button
          className='fill-black text-black flex w-40 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
          onClick={() => toggleModal() }>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className='h-6 w-6 ml-1'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
            <span className='text-sm'>New Record</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Category</td>
            <td className='p-2 w-[20%]'>Amount</td>
            <td className='p-2 w-[20%]'>Date Occured</td>
            <td  className='p-2 w-[10%]'></td>
          </tr>
        </thead>
        <tbody>
          {
            financeData.map((data, index) => <tr key={data.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
              <td className='p-2 hidden lg:table-cell font-normal'>{ index + 1 }</td>
              <td className='p-2'>
                <span className={`p-1 rounded-md text-slate-100 ${data?.category === 'Expense' ? 'bg-red-500' : 'bg-new-green'}`}>{ data.category }</span>
              </td>
              <td className='p-2'>{ data.amount }</td>
              <td className='p-2'>{ data.date_occurred }</td>
              <td className='p-2'>
                <Tippy content='View Full Details'>
                  <button aria-label={`View ${data.username}`} onClick={() => openViewDetails(data)}>
                    <FaEye />
                  </button>
                </Tippy>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Finance;
