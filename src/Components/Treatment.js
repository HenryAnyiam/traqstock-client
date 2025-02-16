import React, { useState, useEffect } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getFlocks, getTreatment, addTreatment, handleData } from '../Utils/Funcs'


function Treatment() {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState, reset } = useForm();
  const [flocks, setFlocks] = useState([]);
  const { errors } = formState;
  const [item, setItem] = useState(null);

  const submitData = async (data) => {
    if (!errors.flock && !errors.treatment_type &&
      !errors.details && !errors.dosage && !errors.associated_cost
      && !errors.treatment_method && !errors.birds_treated &&
      !errors.veterinarian && !errors.date_administered &&
      !errors.time_administered
    ) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addTreatment(data);
      handleData(res, loader, text, toast, reset)
      .then((res) => {
        getTreatment()
          .then((res) => {
            res.json().then((data) => {
              setTreatmentData(data);
              setLoading(false);
            });
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        toggleModal();
      })
    }
  }

  const toggleModal = () => {
    const holdData = document.getElementById('new-data');
    holdData.classList.toggle('hidden');
  }

  useEffect(() => {
    Promise.all([getFlocks(), getTreatment()])
      .then(([flocksRes, treatmentRes]) =>
        Promise.all([flocksRes.json(), treatmentRes.json()])
      )
      .then(([flockResData, treatmentResData]) => {
        console.log(treatmentResData);
        setFlocks(flockResData);
        setTreatmentData(treatmentResData);
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

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Treatment Details</h2>
        <button
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg shadow-md btn-anim'
        onClick={() => { toggleModal() }}>
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
            <td className='p-2 w-[15%]'>Flock</td>
            <td className='p-2 w-[15%]'>Associated Cost</td>
            <td className='p-2 w-[15%]'>Date Treated</td>
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
          <div className='shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4 bg-slate-100'>
            <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-new-green btn-anim"
              onClick={() => { toggleViewModal() }}>
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Treatment Details</p>
            <div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">flock:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.flock_name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Treatment Type:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.treatment_type }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Details:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.details }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Dosage:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.dosage }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Associated Cost:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.associated_cost }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Treatment Method:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.treatment_method }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Total Birds Treated:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.birds_treated }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Veterinarian:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.veterinarian }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Date Administered:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.date_administered }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Time Administered:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.time_administered }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Notes:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.notes === null ? 'No Notes' : item?.notes }</p>
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
                    { flocks.map((flock) => <option key={flock.id} value={flock.id}>{flock.name}</option>)}
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
                    <label htmlFor="details" className="font-semibold text-black p-1 mr-2">Details:</label>
                    <input type="text" id="details" placeholder="Treatment Details" { ...register("details", { required: "Add Details" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.details?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="dosage" className="font-semibold text-black p-1 mr-2">Dosage:</label>
                    <input type="text" id="dosage" placeholder="Treatment Dosage" { ...register("dosage", { required: "Add Dosage" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.dosage?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="associated_cost" className="font-semibold text-black p-1 mr-2">Associated Cost:</label>
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
                    <label htmlFor="birds_treated" className="font-semibold text-black p-1 mr-2">Birds Treated:</label>
                    <input type="number" id="birds_treated" placeholder="Number of Birds Treated" { ...register("birds_treated", { required: "Add Number of Birds Treated" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.birds_treated?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="veterinarian" className="font-semibold text-black p-1 mr-2">Veterinarian:</label>
                    <input type="text" id="veterinarian" placeholder="Veterinarian" { ...register("veterinarian", { required: "Add Veterinarian" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.veterinarian?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="date_administered" className="font-semibold text-black p-1 mr-2">Date Administered:</label>
                    <input type="date" id="date_administered" placeholder="Date Administered" { ...register("date_administered", { required: "Add vaccine" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.date_administered?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="time_administered" className="font-semibold text-black p-1 mr-2">Time Administered:</label>
                    <input type="time" id="time_administered" placeholder="Time Administered" { ...register("time_administered", { required: "Add Time Administered" }) }
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
                </div>
                <p className='text-xs text-red-600 mb-3 text-center'>{ errors.time_administered?.message }</p>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="note" className="font-semibold text-black p-1 mr-2">Note/Remark:</label>
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
        </div>
      </div>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Treatment Details</h2>
        <button
          className='fill-black text-black flex w-40 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
          onClick={() => toggleModal() }>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className='h-6 w-6 ml-1'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
            <span className='text-sm'>New Treatment</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[15%]'>Flock</td>
            <td className='p-2 w-[15%]'>Associated Cost</td>
            <td className='p-2 w-[15%]'>Date Treated</td>
            <td  className='p-2 w-[10%]'></td>
          </tr>
        </thead>
        <tbody>
          {
            treatmentData.map((data, index) => <tr key={data.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
              <td className='p-2 hidden lg:table-cell font-normal'>{ index + 1 }</td>
              <td className='p-2'>{ data.flock_name }</td>
              <td className='p-2'>{ data.associated_cost }</td>
              <td className='p-2'>{ data.date_administered }</td>
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

export default Treatment;
