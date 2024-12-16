import React, { useEffect, useState, useReducer } from 'react';
import {
  getHousingStructures, deleteHousingStructures,
  handleDelete, updateHousingStructure,
  handleData, addHousingStructure
} from '../Utils/Funcs';
import Loader from './Loader';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const initialModalState = { edit: false, delete: false, main: false }
const reducer = (state, action) => {
  switch(action) {
    case 'openEdit':
      return { ...state, edit: true }
    case 'closeEdit':
      return { ...state, edit: false }
    case 'openDelete':
      return { ...state, delete: true }
    case 'closeDelete':
      return { ...state, delete: false }
    case 'openMain':
      return { ...state, main: true }
    case 'closeMain':
      return { ...state, main: false }
    default:
      return state
  }
}

function HousingStructureTable() {
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, dispatch] = useReducer(reducer, initialModalState);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [ delItem, setDelItem ] = useState(null);
  const [ editItem, setEditItem ] = useState(null);
  const mainForm = useForm();

  useEffect(() => {
      Promise.all([getHousingStructures()])
      .then(([structure]) => 
        Promise.all([structure.json()])
      )
      .then(([structureData]) => {
        setStructures(structureData);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const openEditModal = (structureIndex) => {
    setEditItem(structureIndex);
    dispatch('openEdit');
  }

  const openDelModal = (structureIndex) => {
    setDelItem(structureIndex);
    dispatch('openDelete')
  };

  const delStructure = async () => {
    const val = structures[delItem];
    const res = await deleteHousingStructures(val.id);
    handleDelete(res, toast, "Structure Deleted Successfully")
    .then((res) => {
      getHousingStructures()
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
            setStructures(data);
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
      dispatch("closeDelete");
    })
  }

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  useEffect(() => {
    if (editItem !== null && structures[editItem]) {
        setValue('id', structures[editItem].id || '');
        setValue('name', structures[editItem].name || '');
        setValue('house_type', structures[editItem].house_type || '');
        setValue('category', structures[editItem].category || '');
    }
  }, [editItem, structures, setValue]);

  const editStructure = async (data) => {
    const val = structures[editItem];
    const reqData = {}
    console.log(data);
    if (data.name !== "" && data.name !== val.name) reqData.name = data.name;
    if (data.house_type !== "" && data.house_type !== "default" && data.house_type !== val.house_type) reqData.house_type = data.house_type;
    if (data.category !== "" && data.category !== val.category) reqData.category = data.category;
    const loader = document.getElementById("query-loader");
    const text = document.getElementById("query-text");
    loader.style.display = "flex";
    text.style.display = "none";
    const res = await updateHousingStructure(reqData, val.id);
    handleData(res, loader, text, toast, reset, "Structure Updated Successfully")
      .then((res) => {
        getHousingStructures()
          .then((res) => {
            res.json().then((data) => {
              setStructures(data);
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
        setEditItem(null);
        dispatch("closeEdit");
      })
  }

  const submitData = async (data) => {
    if (!mainForm.formState.errors.house_type &&
      !mainForm.formState.errors.category &&
      !mainForm.formState.errors.name) {
      console.log(mainForm.formState)
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      console.log(data);
      const res = await addHousingStructure(data);
      handleData(res, loader, text, toast, mainForm.reset)
      .then((res) => {
        getHousingStructures()
          .then((res) => {
            res.json().then((data) => {
              setStructures(data);
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
        dispatch("closeMain");
      })
    }
  }

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
          <th className='p-2 w-[25%] lg:table-cell'>Type</th>
          <th className='p-2 w-[25%] lg:table-cell'>Category</th>
          <th className='p-2 w-[15%] hidden lg:table-cell '>Total Registered</th>
          <th className='p-2 w-[15%] table-cell lg:hidden'>Total</th>
          <th className='p-2 w-[10%] lg:table-cell '></th>
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

  return <div className='h-full p-4 w-full'>
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
          <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">New Housing Structure</p>
          <form onSubmit={mainForm.handleSubmit(submitData)} noValidate>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="name" className="font-semibold text-black p-1 mr-2">Name:</label>
              <input type="text" id="name" placeholder='Name'
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
              { ...mainForm.register('name', { required: "Input Name"}) }/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ mainForm.formState.errors.name?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="housing-type" className="font-semibold text-black p-1 mr-2">Type:</label>
              <select id='housing-type' defaultValue="default" { ...mainForm.register("house_type", {
                required: "Select House Type",
                pattern: {
                  value: /^(?!default$).+$/,
                  message: "Select House Type"
                } 
                })} className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option value="default" disabled>Housing Type</option>
                <option value='Open-Sided Shed'>Open-Sided Shed</option>
                <option value='Closed Shed'>Closed Shed</option>
                <option value='Battery Cage System'>Battery Cage System</option>
                <option value='Deep Litter House'>Deep Litter House</option>
                <option value='Semi-Intensive Housing'>Semi-Intensive Housing</option>
                <option value='Pasture Housing'>Pasture Housing</option>
              </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ mainForm.formState.errors.house_type?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="feed_intake" className="font-semibold text-black p-1 mr-2">Category:</label>
              <select defaultValue="default" id='housing-category' { ...mainForm.register("category", {
                required: "Select Category",
                pattern: {
                  value: /^(?!default$).+$/,
                  message: "Select Category"
                } 
                })} className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option value="default" disabled>Housing Category</option>
                <option value='Brooder Chick House'>Brooder Chick House</option>
                <option value='Growers House'>Growers House</option>
                <option value='Layers House'>Layers House</option>
                <option value='Broilers House'>Broilers House</option>
                <option value='Breeders House'>Breeders House</option>
              </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ mainForm.formState.errors.category?.message }</p>
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
    </Modal>
    <Modal 
      isOpen={modalState.delete} onRequestClose={() => { dispatch('closeDelete') }}
      style={{
        content: {
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
      }}
      >
        <div>
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {structures[delItem]?.name}?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-white text-white flex w-28 items-center bg-new-green justify-center rounded-lg shadow-md btn-anim'
          onClick={delStructure}>
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
    </Modal>
    <Modal 
      isOpen={modalState.edit} onRequestClose={() => { dispatch('closeEdit'); }}
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
      <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Update Housing Structure</p>
      <form onSubmit={handleSubmit(editStructure)} noValidate>
        <input type="hidden" { ...register('id') } />
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="name" className="font-semibold text-black p-1 mr-2">Name:</label>
                <input type="text" id="name" placeholder='Name'
                className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('name') }/>
            </div>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="housing-type" className="font-semibold text-black p-1 mr-2">Type:</label>
                <select id='housing-type' defaultValue="default" { ...register("house_type")} className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Housing Type</option>
                  <option value='Open-Sided Shed'>Open-Sided Shed</option>
                  <option value='Closed Shed'>Closed Shed</option>
                  <option value='Battery Cage System'>Battery Cage System</option>
                  <option value='Deep Litter House'>Deep Litter House</option>
                  <option value='Semi-Intensive Housing'>Semi-Intensive Housing</option>
                  <option value='Pasture Housing'>Pasture Housing</option>
                </select>
            </div>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="feed_intake" className="font-semibold text-black p-1 mr-2">Category:</label>
                <select defaultValue="default" id='housing-category' { ...register("category")} className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Housing Category</option>
                  <option value='Brooder Chick House'>Brooder Chick House</option>
                  <option value='Growers House'>Growers House</option>
                  <option value='Layers House'>Layers House</option>
                  <option value='Broilers House'>Broilers House</option>
                  <option value='Breeders House'>Breeders House</option>
                </select>
            </div>
            <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-white bg-new-green p-2 rounded-xl font-bold btn-anim">
              <div className="dots hidden" id="query-loader-edit">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
              <span id="query-text-edit" className='text-center'>Submit Data</span>
            </button>
            </div>
        </form>
    </Modal>
    <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Housing Structure</h2>
        <button onClick={ () => { dispatch('openMain') } }
        className='fill-black text-black flex w-28 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            <span className='text-sm'>New</span>
        </button>
    </div>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[5%] lg:table-cell'>S/N</th>
      <th className='p-2 w-[20%] lg:table-cell'>Name</th>
      <th className='p-2 w-[25%] lg:table-cell'>Type</th>
      <th className='p-2 w-[25%] lg:table-cell'>Category</th>
      <th className='p-2 w-[15%] hidden lg:table-cell '>Total Registered</th>
      <th className='p-2 w-[10%] table-cell lg:hidden'>Total</th>
      <th className='p-2 w-[10%] table-cell'></th>
    </tr>
  </thead>
  <tbody>
    {
      structures.map((structure, index) => <tr key={structure.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index + 1 }</td>
        <td className='p-2'>{ structure.name }</td>
        <td className='p-2'>{ structure.house_type }</td>
        <td className='p-2'>{ structure.category }</td>
        <td className='p-2'>{ structure.total_registered }</td>
        <td className='p-2'>
          <Tippy content='Edit Housing Structure'>
            <button aria-label={`Edit ${structure.name}`} className='ml-2' onClick={() => openEditModal(index)}>
              <FaPencilAlt />
            </button>
          </Tippy>
          <Tippy content='Delete Housing Structure'>
            <button aria-label={`Delete ${structure.name}`} className='ml-2' onClick={() => openDelModal(index)}>
              <FaTrashAlt />
            </button>
          </Tippy>
        </td>
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default HousingStructureTable;
