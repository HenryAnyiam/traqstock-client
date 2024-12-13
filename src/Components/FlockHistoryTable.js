import React, { useState, useEffect, useReducer } from 'react';
import { getFlockHistory, convertDate, deleteFlockHistory, handleDelete } from '../Utils/Funcs';
import Loader from './Loader';
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Tippy from '@tippyjs/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';


const initialModalState = { edit: false, delete: false };
const reducer = (state, action) => {
  switch (action) {
    case "openDelete":
      return { ...state, delete: true };
    case "closeDelete":
      return { ...state, delete: false };
    case "openEdit":
      return { ...state, edit: true };
    case "closeEdit":
      return { ...state, edit: false };
    default:
      return state;
  }
};


function FlockHistoryTable() {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [modalState, dispatch] = useReducer(reducer, initialModalState);
  const [delItem, setDelItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    getFlockHistory()
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data);
            setCollection(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  useEffect(() => {
    Modal.setAppElement("#dashboard-body");

    return () => {
      Modal.setAppElement(undefined);
    };
  }, []);

  const openEditModal = (data) => {
    setEditItem(data);
    dispatch("openEdit");
  };

  const openDelModal = (data) => {
    setDelItem(data);
    dispatch("openDelete");
  };

  const delHistory = async () => {
    const res = await deleteFlockHistory(delItem.id);
    handleDelete(res, toast, "History Deleted Successfully")
      .then((res) => {
        getFlockHistory()
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
        setEditItem(null);
        dispatch("closeDelete");
      });
  };

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[15%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[15%] lg:table-cell '>Rearing Method</th>
      <th className='p-2 w-[15%] lg:table-cell '>Housing</th>
      <th className='p-2 w-[15%] lg:table-cell '>Date</th>
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

  return <div className=''>
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
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {delItem?.flock_name} history?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
          onClick={delHistory}>
            Continue
          </button>
          </div>
        </div>
      </Modal>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] table-cell'>S/No</th>
      <th className='p-2 w-[15%] table-cell'>Flock Name</th>
      <th className='p-2 w-[15%] table-cell '>Rearing Method</th>
      <th className='p-2 w-[15%] table-cell '>Housing</th>
      <th className='p-2 w-[15%] table-cell '>Date</th>
      <th className='p-2 w-[15%] table-cell '></th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      collection.map((data, index) => <tr key={data.id}  className='h-10 border-b-2 font-normal text-sm lg:text-base'>
      <td className='p-2'>{ index + 1 }</td>
      <td className='p-2'>{ data.flock_name }</td>
      <td className='p-2'>{ data.rearing_method }</td>
      <td className='p-2'>{ data.housing_structure_name }</td>
      <td className='p-2'>{ convertDate(data.date_changed) }</td>
        <td className='p-2'>
          <Tippy content={`Edit history details`}>
            <button  aria-label={`Edit history`} onClick={() => openEditModal(data)}><FaPencilAlt /></button>
          </Tippy>
          <Tippy content={`Delete history`}>
            <button aria-label={`Delete history`} className='ml-2' onClick={() => openDelModal(data)}><FaTrashAlt /></button>
          </Tippy>
      </td>
    </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockHistoryTable;
