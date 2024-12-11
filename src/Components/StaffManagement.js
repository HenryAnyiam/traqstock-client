import Modal from 'react-modal';
import React, { useEffect, useState, useReducer } from 'react'
import { FaLock, FaUser, FaUserTag, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { getStaffs, addStaff, handleData, updateStaff, deleteStaff, handleDelete } from '../Utils/Funcs';
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

function StaffManagement() {
  const [ modalState, dispatch ] = useReducer(reducer, initialModalState);
  const [ delItem, setDelItem ] = useState(null);
  const [ editItem, setEditItem ] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState, reset } = useForm();
  const editForm = useForm();
  const { errors } = formState;

  useEffect(() => {
    getStaffs()
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data)
            setStaffData(data);
            setLoading(false);
          })
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  const openDelModal = (staffIndex) => {
    setDelItem(staffIndex);
    dispatch('openDelete')
  }

  const delStaff = async () => {
    const val = staffData[delItem];
    const res = await deleteStaff(val.id);
    handleDelete(res, toast, "Staff Deleted Successfully")
      .then((res) => {
        getStaffs()
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              setStaffData(data);
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
      })
  }

  const newStaff = async (data) => {
    if (!errors.username && !errors.role && !errors.password) {
      console.log(data);
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      const res = await addStaff(data);
      handleData(res, loader, text, toast, reset)
        .then((res) => {
          getStaffs()
            .then((res) => {
              res.json()
                .then((data) => {
                  console.log(data)
                  setStaffData(data);
                  setLoading(false);
                })
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            })
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  const openEditModal = (staffIndex) => {
    setEditItem(staffIndex);
    dispatch('openEdit')
  }

  const editStaff = async (data) => {
    const val = staffData[editItem];
    const reqData = {}
    console.log(data);
    if (data.username !== "" && data.username !== val.username) reqData.username = data.username;
    if (data.role !== "" && data.role !== "default" && data.role !== val.role) reqData.role = data.role;
    if (data.password !== "" && data.password !== val.password) reqData.password = data.password;
    const loader = document.getElementById("query-loader-edit");
    const text = document.getElementById("query-text-edit");
    loader.style.display = "flex";
    text.style.display = "none";
    const res = await updateStaff(reqData, val.id);
    handleData(res, loader, text, toast, reset, "Staff Updated Successfully")
      .then((res) => {
        getStaffs()
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              setStaffData(data);
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

  useEffect(() => {
    if (editItem !== null && staffData[editItem]) {
        editForm.setValue('id', staffData[editItem].id || '');
        editForm.setValue('username', staffData[editItem].username || '');
        editForm.setValue('role', staffData[editItem].role || '');
    }
  }, [editItem, staffData, editForm]);

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Staff Details</h2>
        <button
        className='fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
        onClick={() => { dispatch('openMain') }}>
          <span className='text-sm'>New Staff</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Name</td>
            <td className='p-2 w-[15%]'>Role</td>
            <td className='p-2 w-[40%]'>Last Activity</td>
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
          backgroundColor: 'rgb(97, 58, 18)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(49, 112, 35, 0.4)'
        }
      }}
      >
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Create New Staff</p>
        <form onSubmit={handleSubmit(newStaff)} noValidate>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUser className='text-gray-700'/>
                </div>
                <input type="text" id="username" placeholder="Username"
                { ...register('username', {
                  required: 'Input staff username'
                })}
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.username?.message }</p>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUserTag className='text-gray-700'/>
                </div>
                <select id='role' defaultValue='default'
                { ...register('role', {
                  required: 'Select Staff Role',
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: 'Select Staff Role'
                  }
                })}
                className="bg-white text-gray-700 h-9 border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0">
                  <option disabled value='default'>Select User Role</option>
                  <option value='5'>Owner</option>
                  <option value='4'>Manager</option>
                  <option value='3'>Asst Manager</option>
                  <option value='2'>Team Leader</option>
                  <option value='1'>Worker</option>
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.role?.message }</p>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaLock className='text-gray-700'/>
                </div>
                <input type='text' id="password" placeholder="Password"
                { ...register('password', {
                  required: 'Input Staff Password'
                })}
                className="bg-white border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.password?.message }</p>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-transparent hover:border-hover-gold hover:border-2">
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
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {staffData[delItem]?.username}?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
          onClick={delStaff}>
            Continue
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
          backgroundColor: 'rgb(97, 58, 18)',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        overlay: {
          backgroundColor: 'rgba(49, 112, 35, 0.4)'
        }
      }}
      >
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Update Staff Details</p>
        <form onSubmit={editForm.handleSubmit(editStaff)} noValidate>
          <input type="hidden" { ...editForm.register('id') } />
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUser className='text-gray-700'/>
                </div>
                <input type="text"
                id="username" placeholder="Username"
                { ...editForm.register("username") }
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
          </div>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUserTag className='text-gray-700'/>
                </div>
                <select id='role' { ...editForm.register("role") }
                className="bg-white text-gray-700 h-9 border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0">
                  <option disabled value='default'>Select User Role</option>
                  <option value='5'>Owner</option>
                  <option value='4'>Manager</option>
                  <option value='3'>Asst Manager</option>
                  <option value='2'>Team Leader</option>
                  <option value='1'>Worker</option>
                </select>
          </div>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaLock className='text-gray-700'/>
                </div>
            <input type='text' id="password" placeholder="Password"
              { ...editForm.register("password") }
                className="bg-white border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-transparent hover:border-hover-gold hover:border-2">
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
        <h2 className='text-3xl'>Staff Details</h2>
        <button
        className='fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
        onClick={() => { dispatch('openMain') }}>
          <span className='text-sm'>New Staff</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className='h-6 w-6 ml-1'>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
        <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
          <tr className='h-10'>
            <td className='p-2 w-[10%] hidden lg:table-cell'>S/N</td>
            <td className='p-2 w-[25%]'>Name</td>
            <td className='p-2 w-[15%]'>Role</td>
            <td className='p-2 w-[40%]'>Last Activity</td>
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
                  <button  aria-label={`Edit ${staff.username}`} onClick={() => openEditModal(index)}><FaPencilAlt /></button>
                </Tippy>
                <Tippy content={`Delete ${staff.username}`}>
                  <button aria-label={`Delete ${staff.username}`} className='ml-2' onClick={() => openDelModal(index)}><FaTrashAlt /></button>
                </Tippy>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default StaffManagement;
