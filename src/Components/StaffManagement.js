import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import { FaLock, FaUser, FaUserTag } from 'react-icons/fa';

function StaffManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='h-full p-4 w-full'>
      <Modal 
      isOpen={isModalOpen} onRequestClose={closeModal}
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
        <form>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUser className='text-gray-700'/>
                </div>
                <input type="text" name="username"
                id="username" placeholder="Username"
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaUserTag className='text-gray-700'/>
                </div>
                <select id='role' name='name'
                className="bg-white text-gray-700 h-9 border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0">
                  <option disabled selected className='sticky'>Select User Role</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Worker</option>
                  <option>Viewer</option>
                </select>
            </div>
            <div className="m-4 mb-1 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaLock className='text-gray-700'/>
                </div>
                <input type='text' name="password"
                id="password" placeholder="Password"
                className="bg-white border-2 border-l-0 border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-transparent hover:border-hover-gold hover:border-2">Continue</button>
            </div>
        </form>
      </Modal>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Staff Details</h2>
        <button
        className='fill-hover-gold text-hover-gold flex w-28 items-center bg-base-brown justify-center rounded-lg shadow-md hover:bg-hover-gold hover:text-base-brown hover:fill-base-brown'
        onClick={openModal}>
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
            <td className='p-2 w-[10%]'>S/N</td>
            <td className='p-2 w-[25%]'>Name</td>
            <td className='p-2 w-[15%]'>Role</td>
            <td className='p-2 w-[40%]'>Last Activity</td>
            <td  className='p-2 w-[10%]'>Action</td>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default StaffManagement;
