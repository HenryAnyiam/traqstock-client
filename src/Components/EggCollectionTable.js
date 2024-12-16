import React, { useState, useEffect, useReducer } from 'react';
import Modal from 'react-modal';
import {
  getEggCollection, convertDate,
  convertTime, getFlocks,
  addEggCollection, handleData,
  deleteEggCollection, handleDelete
} from '../Utils/Funcs';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PiEggCrackFill, PiEggFill } from "react-icons/pi";
import { PiBirdFill } from "react-icons/pi";
import Tippy from '@tippyjs/react';
import { FaTrashAlt } from 'react-icons/fa';

const initialModalState = { main: false, delete: false }
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
    default:
      return state
  }
}

function EggCollectionTable() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [ modalState, dispatch ] = useReducer(reducer, initialModalState);
  const [flocks, setFlocks] = useState([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [ delItem, setDelItem ] = useState(null);


  useEffect(() => {
    Promise.all([getEggCollection(), getFlocks()])
    .then(([collection, flocks]) => 
      Promise.all([collection.json(), flocks.json()])
    )
    .then(([collectionData, flockData]) => {
      setCollection(collectionData);
      setFlocks(flockData);
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  const openDelModal = (collectionId) => {
    setDelItem(collectionId);
    dispatch('openDelete');
  }

  const submitData = async (data) => {
    if (!errors.flock && !errors.collected_eggs &&
      !errors.broken_eggs
    ) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addEggCollection(data);
      handleData(res, loader, text, toast, reset)
      .then((res) => {
        getEggCollection()
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              setCollection(data);
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
        setDelItem(null);
        dispatch("closeMain");
      })
    }
  }

  const delCollection = async () => {
    const loader = document.getElementById('query-loader-del');
    const text = document.getElementById('query-text-del');
    loader.style.display = 'flex';
    text.style.display = 'none';
    const res = await deleteEggCollection(delItem);
    loader.style.display = 'none';
    text.style.display = 'flex';
    handleDelete(res, toast, "Collection Deleted Successfully")
      .then((res) => {
        getEggCollection()
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              setCollection(data);
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
        setDelItem(null);
        dispatch("closeDelete");
      })
  }

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[10%] lg:table-cell '>Collected</th>
      <th className='p-2 w-[10%] lg:table-cell '>Broken</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date</th>
      <th className='p-2 w-[20%] lg:table-cell '>Time</th>
    </tr>
  </thead>
      <tbody>
        <tr>
          <td colSpan="3" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td colSpan="3" className='hidden lg:table-cell'>
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
        <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">New Egg Collection</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 flex items-center">
            <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-black rounded-l-lg">
              <PiBirdFill className='text-gray-700'/>
            </div>
            <select id='flock' defaultValue='default'
            className="bg-white border-2 border-l-0  border-black rounded-r-lg p-1 w-52 lg:w-64 focus:outline-0 h-9"
            { ...register('flock', {
              required: 'Select Flock',
              pattern: {
                value: /^(?!default$).+$/,
                message: 'Select Flock'
              }
            })}
            >
              <option value='default' disabled>Flock Name</option>
              { flocks.map((flock) => <option key={flock.id} value={flock.id}>{flock.name}</option>)}
            </select>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.flock?.message }</p>
          <div className="m-4 mb-1 flex items-center">
              <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-black rounded-l-lg">
                <PiEggFill className='text-gray-700'/>
              </div>
            <input type="number" id="collectedEggs" placeholder='Number of Eggs Collected' { ...register('collected_eggs', {
              required: 'Input Nymber of Collected Eggs',
              min: {
                value: 0,
                message: 'Minimum value is 0'
              }
            })}
              className="bg-white border-2 border-l-0  border-black rounded-r-lg p-1 w-52 lg:w-64 focus:outline-0" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.collected_eggs?.message }</p>
          <div className="m-4 mb-1 flex items-center">
            <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-black rounded-l-lg">
              <PiEggCrackFill className='text-gray-700'/>
            </div>
            <input type="number" id="brokenEggs" placeholder='Number of Broken Eggs' { ...register('broken_eggs', {
              required: 'Input Nymber of Broken Eggs',
              min: {
                value: 0,
                message: 'Minimum value is 0'
              }
            })}
              className="bg-white border-2 border-l-0  border-black rounded-r-lg p-1 w-52 lg:w-64 focus:outline-0" required />
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.broken_eggs?.message }</p>
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
          backgroundColor: 'rgb(241 245 249)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
      }}
      >
        <div>
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete this collection?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-black text-white flex gap-x-1 w-28 items-center bg-new-green justify-center rounded-lg shadow-md btn-anim'
          onClick={delCollection}>
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
    <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Egg Collection</h2>
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
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[15%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[10%] lg:table-cell '>Collected</th>
      <th className='p-2 w-[10%] lg:table-cell '>Broken</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date</th>
      <th className='p-2 w-[20%] lg:table-cell '>Time</th>
      <th className='p-2 w-[5%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      collection.map((data, index) => <tr key={data.id}  className='h-10 border-b-2 font-normal text-sm lg:text-base'>
      <td className='p-2'>{ index + 1 }</td>
      <td className='p-2'>{ data.flock_name }</td>
      <td className='p-2'>{ data.collected_eggs }</td>
      <td className='p-2'>{ data.broken_eggs }</td>
      <td className='p-2'>{ convertDate(data.date_of_collection) }</td>
      <td className='p-2'>{ convertTime(data.time_of_collection) }</td>
      <td className='p-2'>
        <Tippy content={`Delete Collection`}>
          <button aria-label={`Delete Collection`} className='ml-2' onClick={() => openDelModal(data.id)}><FaTrashAlt /></button>
        </Tippy>
      </td>
    </tr>)
    }
  </tbody>
  </table>
</div>
}

export default EggCollectionTable;
