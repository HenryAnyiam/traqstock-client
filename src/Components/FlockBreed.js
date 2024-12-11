import React, { useEffect, useState, useReducer } from 'react';
import Tippy from '@tippyjs/react';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
import Loader from './Loader';
import { getFlockBreed, addFlockBreed, handleData, deleteFlockBreed, handleDelete } from '../Utils/Funcs';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../Utils/userAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

function FlockBreed() {
  const [breeds, setBreeds] = useState([]);
  const [ modalState, dispatch ] = useReducer(reducer, initialModalState);
  const [loading, setLoading] = useState(true);
  const [ delItem, setDelItem ] = useState(null);
  const { user } = useAuth();
  const { role_id } = user;
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  useEffect(() => {
    getFlockBreed()
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              setBreeds(data)
              setLoading(false);
            })
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, []);

  const openDelModal = (staffIndex) => {
    setDelItem(staffIndex);
    dispatch('openDelete')
  };

  const delSource = async () => {
    const val = breeds[delItem];
    const res = await deleteFlockBreed(val.id);
    handleDelete(res, toast, "Source Deleted Successfully")
    .then((res) => {
      getFlockBreed()
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
            setBreeds(data);
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

  const submitData = async (data) => {
    if (!errors.name) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addFlockBreed(data);
      handleData(res, loader, text, toast, reset)
      .then((res) => {
        getFlockBreed()
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              setBreeds(data);
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
    return <div className='lg:p-4' id="report-view">
       <div className='flex justify-between m-2 ml-0'>
      <h2 className='text-3xl'>Flock Breeds</h2>
    </div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
      <tr className='h-10 text-xs lg:text-sm'>
        <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
        <th className='p-2 w-[35%] lg:table-cell'>Breed Name</th>
        <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
        <th className='p-2 w-[25%] lg:table-cell '></th>
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

  return <div className='lg:p-4' id="report-view">
    <Modal 
      isOpen={modalState.main} onRequestClose={() => { dispatch('closeMain') }}
      style={{
        content: {
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(97, 58, 18)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(49, 112, 35, 0.4)'
        }
      }}
      >
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Add New Flock Source</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="name" className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</label>
              <input type="text" id="name" placeholder='Name'
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
              { ...register('name', { required: "Input Name"}) }/>
          </div>
          <p className='text-xs text-red-600 mb-4 text-center'>{ errors.name?.message }</p>
          <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-transparent hover:border-hover-gold hover:border-2">
                  <div className="dots hidden" id="query-loader">
                    <div className="dot bg-brown"></div>
                    <div className="dot bg-brown"></div>
                    <div className="dot bg-brown"></div>
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
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(49, 112, 35, 0.4)'
        }
      }}
      >
        <div>
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {breeds[delItem]?.name}?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
          onClick={delSource}>
            Continue
          </button>
          </div>
        </div>
      </Modal>
    <div className='flex justify-between m-2 ml-0'>
      <h2 className='text-3xl'>Flock Breeds</h2>
      {
        role_id > 4 ? <div id="newData">
          <Tippy content='Add new Flock Breed'>
            <button className='fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown p-2'
            onClick={() => { dispatch('openMain') }}>
              <FaPlus className='mr-1' />
              New
            </button>
          </Tippy>
        </div> : <></>
      }
    </div>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[35%] lg:table-cell'>Breed Name</th>
      <th className='p-2 w-[25%] lg:table-cell '>Total Registered</th>
      {
        role_id > 4 ? <th className='p-2 w-[25%] lg:table-cell '></th> : <></>
      }
    </tr>
  </thead>
  <tbody>
    {
      breeds.map((breed, index) => <tr key={breed.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index + 1 }</td>
        <td className='p-2'>{ breed.name }</td>
        <td className='p-2'>{ breed.total_registered }</td>
        {
          role_id > 4 ? <td className='p-2'>
          <Tippy content='Delete Flock Source'>
              <button aria-label={`Delete ${breed.name}`} className='ml-2' onClick={() => openDelModal(index)}>
                <FaTrashAlt />
              </button>
            </Tippy>
          </td> : <></>
        }
      </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockBreed;
