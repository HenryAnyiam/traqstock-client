import React from 'react'
import { FaPencilAlt, FaTrashAlt, FaTimes } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';


function FeedPurchase() {
  const staffData = [];
  const loading = false;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const submitData = () => {}

  const toggleModal = () => {
    const holdData = document.getElementById('view-data');
    holdData.classList.toggle('hidden');
  }

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Feed Purchase</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg shadow-md btn-anim'
        onClick={() => { toggleModal() }}>
          <span className='text-sm'>New Purchase</span>
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
            <td className='p-2 w-[25%]'>Name</td>
            <td className='p-2 w-[15%]'>Variety</td>
            <td className='p-2 w-[40%]'>Date Purchased</td>
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
      <div className='modal-hold hidden' id="view-data">
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
                  <label htmlFor="name" className="font-semibold text-black p-1 mr-2">Name:</label>
                  <input type="text" id="name" placeholder="Feed Name" { ...register("name", { required: "Add Name" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.name?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                  <label htmlFor="variety" className="font-semibold text-black p-1 mr-2">Variety:</label>
                  <input type="text" id="variety" placeholder="Feed Variety" { ...register("variety", { required: "Add Variety" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.variety?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="form" className="font-semibold text-black p-1 mr-2">Form:</label>
                    <select id='form' defaultValue="default" { ...register('form', {
                      required: "Select Feed Form",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Select Feed Form"
                      } 
                      }) }
                      className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                      <option value="default" disabled>Feed Form</option>
                      <option value="Crumb/Pellet">Crumb/Pellet</option>
                      <option value="Mash">Mash</option>
                  </select>
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.form?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="chickenType" className="font-semibold text-black p-1 mr-2">Chicken Type:</label>
                    <select id='chickenType' defaultValue="default" { ...register('chicken_type', {
                      required: "Select Chicken Type",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Select Chicken Type"
                      } 
                      }) }
                      className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                      <option value="default" disabled>Chicken Type</option>
                      <option value="Broilers">Broilers</option>
                      <option value="Layers">Layers</option>
                      <option value="Multi-Purpose">Multi-Purpose</option>
                  </select>
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.chicken_type?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="growthStage" className="font-semibold text-black p-1 mr-2">Growth Stage:</label>
                    <select id='growthStage' defaultValue="default" { ...register('growth_stage', {
                      required: "Select Growth Stage",
                      pattern: {
                        value: /^(?!default$).+$/,
                        message: "Select Growth Stage"
                      } 
                      }) }
                      className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                      <option value="default" disabled>Growth Stage</option>
                      <option value="Starter">Starter</option>
                      <option value="Growers">Growers</option>
                      <option value="Finisher">Finisher</option>
                      <option value="Early Laying">Early Laying</option>
                      <option value="Main Laying">Main Laying</option>
                  </select>
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.growth_stage?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="size_of_bags" className="font-semibold text-black p-1 mr-2">Bag Sizes:</label>
                    <input type="number" id="size_of_bags" placeholder="Sizes of Bag in Kg" { ...register("size_of_bags", { required: "Add Bag Sizes" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.size_of_bags?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="unit_price" className="font-semibold text-black p-1 mr-2">Unit Price:</label>
                    <input type="number" id="unit_price" placeholder="Unit Price Per Bag" { ...register("unit_price", { required: "Add Unit Price" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.unit_price?.message }</p>
                
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="veterinarian" className="font-semibold text-black p-1 mr-2">Veterinarian:</label>
                    <input type="text" id="veterinarian" placeholder="Veterinarian" { ...register("veterinarian", { required: "Add Veterinarian" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.veterinarian?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="purchase_date" className="font-semibold text-black p-1 mr-2">Date Purchased:</label>
                    <input type="date" id="purchase_date" placeholder="Date Purchased" { ...register("purchase_date", { required: "Add Purchase Date" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.purchase_date?.message }</p>
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
        <h2 className='text-3xl'>Feed Purchase</h2>
        <button
          className='fill-black text-black flex w-40 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
          onClick={() => toggleModal() }>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className='h-6 w-6 ml-1'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
            <span className='text-sm'>New Purcase</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Name</td>
            <td className='p-2 w-[15%]'>Variety</td>
            <td className='p-2 w-[40%]'>Date Purchased</td>
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

export default FeedPurchase;
