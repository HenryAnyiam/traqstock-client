import Tippy from '@tippyjs/react';
import React, { useEffect, useState } from 'react';
import { FaEye, FaPencilAlt, FaTrashAlt, FaTimes } from 'react-icons/fa';
import {
  getFlocks, getFlockSource,
  getFlockBreed, getHousingStructures,
  handleData, updateFlock, deleteFlock,
  handleDelete
} from '../Utils/Funcs';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import chickenTypes from '../mock_data/chicken_type.json';
import rearingMethods from '../mock_data/rearing_method.json';
import { toast } from 'react-toastify';

function FlockTable() {

  const [flocks, setFlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const { register, setValue, reset, handleSubmit } = useForm();
  const [sources, setSources] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    if (editItem !== null) {
      setValue('source', editItem.source.name);
      setValue('breed', editItem.breed.name);
      setValue('date_of_hatching', editItem.date_of_hatching);
      setValue('chicken_type', editItem.chicken_type);
      setValue('initial_number_of_birds', editItem.initial_number_of_birds);
      setValue('current_rearing_method', editItem.current_rearing_method);
      setValue('current_housing_structure', editItem.current_housing_structure);
      setValue('name', editItem.name);
    }
  }, [editItem, setValue]);

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

  useEffect(() => {
    getFlocks()
      .then((res) => {
        res.json()
          .then((data) => {
            setFlocks(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  const toggleModal = () => {
    const holdData = document.getElementById('view-data');
    holdData.classList.toggle('hidden');
  }

  const toggleEditModal = () => {
    const editData = document.getElementById('edit-data');
    editData.classList.toggle('hidden');
  }

  const toggleDeleteModal = () => {
    const editData = document.getElementById('delete-data');
    editData.classList.toggle('hidden');
  }

  const openViewDetails = (data) => {
    setItem(data);
    const editData = document.getElementById('edit-data');
    if (!editData.classList.contains('hidden')) {
      editData.classList.add('hidden');
    }
    const deleteData = document.getElementById('delete-data');
    if (!deleteData.classList.contains('hidden')) {
      deleteData.classList.add('hidden');
    }
    toggleModal();
  }

  const openEditModal = (data) => {
    setEditItem(data);
    const deleteData = document.getElementById('delete-data');
    if (!deleteData.classList.contains('hidden')) {
      deleteData.classList.add('hidden');
    }
    const holdData = document.getElementById('view-data');
    if (!holdData.classList.contains('hidden')) {
      holdData.classList.add('hidden');
    }
    toggleEditModal();
  }

  const openDeleteModal = (data) => {
    setDeleteItem(data);
    const editData = document.getElementById('edit-data');
    if (!editData.classList.contains('hidden')) {
      editData.classList.add('hidden');
    }
    const holdData = document.getElementById('view-data');
    if (!holdData.classList.contains('hidden')) {
      holdData.classList.add('hidden');
    }
    toggleDeleteModal();
  }

  const editFlock = async (data) => {
    const reqData = {}
    if (data.name !== "" && data.name !== editItem.name) reqData.name = data.name;
    if (data.source !== "default" && data.source !== editItem.source.name) reqData.source = { name: data.source };
    if (data.breed !== "default" && data.breed !== editItem.breed.name) reqData.breed = { name: data.breed };
    if (data.date_of_hatching !== "" && data.date_of_hatching !== editItem.date_of_hatching) reqData.date_of_hatching = data.date_of_hatching;
    if (data.chicken_type !== "default" && data.chicken_type !== editItem.chicken_type) reqData.chicken_type = data.chicken_type;
    if (data.initial_number_of_birds !== "" && data.initial_number_of_birds !== editItem.initial_number_of_birds) reqData.initial_number_of_birds = data.initial_number_of_birds;
    if (data.current_rearing_method !== "default" && data.current_rearing_method !== editItem.current_rearing_method) reqData.current_rearing_method = data.current_rearing_method;
    if (data.current_housing_structure !== "default" && data.current_housing_structure !== editItem.current_housing_structure) reqData.current_housing_structure = data.current_housing_structure;
    const loader = document.getElementById("query-loader");
    const text = document.getElementById("query-text");
    loader.style.display = "flex";
    text.style.display = "none";
    console.log(reqData)
    const res = await updateFlock(reqData, editItem.id);
    handleData(res, loader, text, toast, reset, "Flock Updated Successfully")
      .then((res) => {
        getFlocks()
          .then((res) => {
            res.json()
              .then((data) => {
                setFlocks(data);
                setLoading(false);
              })
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          })
      })
      .finally(() => {
        setEditItem(null);
        toggleEditModal();
      })
  }

  const delFlock = async () => {
    const loader = document.getElementById('query-loader-del');
    const text = document.getElementById('query-text-del');
    loader.style.display = 'flex';
    text.style.display = 'none';
    const res = await deleteFlock(deleteItem.id);
    loader.style.display = 'none';
    text.style.display = 'flex';
    handleDelete(res, toast, "Flock Deleted Successfully")
      .then((res) => {
        getFlocks()
          .then((res) => {
            res.json().then((data) => {
              setFlocks(data);
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
        setDeleteItem(null);
        toggleDeleteModal()
      })
  }

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[5%]'>S/No</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Source</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Breed</th>
          <th className='p-2 w-[30%] lg:w-[20%]'>Date Established</th>
          <th  className='p-2 w-[10%]'></th>
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
    <div>
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
            <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Flock Details</p>
            <div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Name:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Flock Source:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.source.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Flock Breed:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.breed.name }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Established Date:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.date_established }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Hatch Date:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.date_of_hatching }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Chicken Type:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.chicken_type }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Initial Birds:</p>
                <p className="font-semibold text-black p-1 mr-2">{ item?.initial_number_of_birds }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Rearing method:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.current_rearing_method }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Housing Structure:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.current_housing_structure }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Age in Weeks:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.age_in_weeks }</p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                  <p className="font-semibold text-black p-1 mr-2">Age in Weeks on Farm:</p>
                  <p className="font-semibold text-black p-1 mr-2">{ item?.age_in_weeks_in_farm }</p>
              </div>
              <div className="m-4 flex justify-center">
                  <button
                  className="flex justify-center items-center text-center text-white bg-new-green p-2 rounded-xl mr-4 btn-anim"
                  aria-label={`Edit ${item?.username}`} onClick={() => openEditModal(item)}>
                    <FaPencilAlt/> <span className='ml-2'>Edit Flock</span>
                  </button>
                  <button
                  className="flex justify-center items-center text-center text-white bg-new-green p-2 rounded-xl font-semibold btn-anim"
                  aria-label={`Delete ${item?.username}`} onClick={() => openDeleteModal(item)}>
                    <FaTrashAlt/> <span className='ml-2'>Delete Flock</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-hold hidden' id="edit-data">
        <div className='modal-content'>
          <div className="bg-slate-100 shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
            <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-new-hover-green btn-anim"
              onClick={() => { toggleEditModal() }}>
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Edit Flock</p>
            <form onSubmit={handleSubmit(editFlock)} noValidate>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="name" className="font-semibold text-black p-1 mr-2">Name:</label>
                    <input type="text" id="name" placeholder='Name'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('name') }/>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="flockSource" className="font-semibold text-black p-1 mr-2">Flock Source:</label>
                    <select id='flockSource' defaultValue='default'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('source') }>
                      <option value='default' disabled>Source</option>
                      {sources.map((source) => <option key={source.id} value={ source.name }>{ source.name }</option>)}
                    </select>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="flockBreed" className="font-semibold text-black p-1 mr-2">Flock Breed:</label>
                    <select id='flockBreed' defaultValue='default' name='flockBreed'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('breed') }>
                      <option value='default' disabled>Breed</option>
                      {breeds.map((breed) => <option key={breed.id} value={breed.name}>{ breed.name }</option>)}
                    </select>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                  <label htmlFor="ageInWeeks" className="font-semibold text-black p-1 mr-2">Age in Weeks:</label>
                  <input type="number" id="ageInWeeks"
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('age_in_weeks') }/>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="chickenType" className="font-semibold text-black p-1 mr-2">Chicken Type:</label>
                    <select id='chickenType' defaultValue='default'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('chicken_type') }>
                      <option value='default' disabled>Chicken Type</option>
                      {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
                    </select>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                  <label htmlFor="initialNumber" className="font-semibold text-black p-1 mr-2">Initial Birds:</label>
                  <input type="number" id="initialNumber" placeholder='Initial Number of Birds' min='0'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" 
                    { ...register('initial_number_of_birds') }/>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="rearingMethod" className="font-semibold text-black p-1 mr-2">Rearing method:</label>
                    <select id='rearingMethod' defaultValue='default'
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('current_rearing_method') }>
                      <option value='default' disabled>Rearing method</option>
                      {rearingMethods.map((method) => <option key={method.id} value={method.name}>{ method.name }</option>)}
                    </select>
                </div>
                <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                    <label htmlFor="housingStructure" className="font-semibold text-black p-1 mr-2">Housing Structure:</label>
                    <select id='housingStructure' defaultValue='default' 
                    className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                    { ...register('current_housing_structure') }>
                      <option value='default' disabled>Housing Structure</option>
                      {structures.map((structure) => <option key={structure.id} value={structure.id}>{ structure.name }</option>)}
                    </select>
                </div>
                <div className="m-4 flex justify-center">
                  <button type="submit"
                  className="text-center w-full text-white bg-new-green p-2 rounded-xl font-semibold btn-anim">
                  <div className="dots hidden" id="query-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                  <span id="query-text" className='text-center'>Submit Data</span>
                </button>
              </div>
            </form>
            </div>
        </div>
      </div>
      <div className='modal-hold hidden' id="delete-data">
        <div className='modal-content'>
        <div className='bg-white p-4 rounded-xl'>
          <div className='flex justify-end'>
              <button
              className="flex justify-center items-center text-center text-black bg-white p-2 mr-4 rounded-xl font-semibold hover:bg-new-hover-green"
              onClick={() => { toggleDeleteModal() }}>
                <FaTimes />
              </button>
            </div>
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {deleteItem?.name} Flock?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-white text-white flex w-28 items-center bg-new-green justify-center rounded-lg shadow-md btn-anim'
          onClick={delFlock}>
            <div className="dots hidden" id="query-loader-del">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div id="query-text-del" className='text-center flex gap-x-1 items-center'>
              <FaTrashAlt /> <span>Continue</span>
            </div>
          </button>
          </div>
        </div>
        </div>
      </div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[5%]'>S/No</th>
          <th className='p-2 w-[20%] table-cell lg:hidden'>Name</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Source</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Breed</th>
          <th className='p-2 w-[20%] hidden lg:table-cell'>Date Established</th>
          <th  className='p-2 w-[10%]'></th>
        </tr>
      </thead>
      <tbody className='text-xs lg:text-sm'>
        {
          flocks.map((flock, index) => <tr key={flock.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
            <td className='p-2'>{ index + 1 }</td>
            <td className='p-2 table-cell lg:hidden'>{ flock.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.source.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.breed.name }</td>
            <td className='p-2 hidden lg:table-cell'>{ flock.date_established }</td>
            <td className='p-2'>
              <Tippy content='View Full Details'>
                <button aria-label={`Edit ${flock.username}`} onClick={() => openViewDetails(flock)}>
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

export default FlockTable;