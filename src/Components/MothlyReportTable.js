import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { FaPencilAlt, FaHeartbeat } from 'react-icons/fa';
import { FaWheatAwn, FaFaucetDrip } from "react-icons/fa6";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { fetchFarmData } from '../Utils/Funcs';
import Loader from './Loader';

function MothlyReportTable() {
  const [modalState, setModalState] = useState(false);
  const [editData, setEditData] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Modal.setAppElement('#dashboard-body');

    return () => {
      Modal.setAppElement(undefined);
    }
  }, []);

  useEffect(() => {
    fetchFarmData()
      .then((res) => {
        console.log(res.status);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [reportData, loading])

  const editReport = (index) => {
    setEditData(index);
    setModalState(true);
  }

  const submitReportEdit = (e) => {
    e.preventDefault();
    setEditData(null);
    setModalState(false);
    toast.success(`Report Updated Successfully`);
  }

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[15%]'>Date</th>
          <th className='p-2 w-[13%]'>Feed Intake</th>
          <th className='p-2 w-[13%]'>Water Intake</th>
          <th  className='p-2 w-[13%]'>Mortality</th>
          <th  className='p-2 w-[5%]'></th>
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
      <Modal 
      isOpen={modalState} onRequestClose={() => { setModalState(false) }}
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
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Edit Report</p>
        <form>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaWheatAwn className='text-gray-700'/>
                </div>
                <input type="number" name="feed_intake" id="feed_intake"
                placeholder="Feed Intake" defaultValue={reportData[editData]?.feed_intake}
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaFaucetDrip className='text-gray-700'/>
                </div>
                <input type="number" name="water_intake" id="water_intake"
                placeholder="Water Intake" defaultValue={reportData[editData]?.water_intake}
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex items-center">
                <div className="bg-white h-9 flex items-center p-1 border-2 border-r-0 border-hover-gold rounded-l-lg">
                    <FaHeartbeat className='text-gray-700'/>
                </div>
                <input type="number" name="mortality" id="mortality"
                placeholder="Mortality" defaultValue={reportData[editData]?.mortality}
                className="bg-white border-2 border-l-0  border-hover-gold rounded-r-lg p-1 w-52 lg:w-72 focus:outline-0"/>
            </div>
            <div className="m-4 flex justify-center">
                <button type="submit" onClick={submitReportEdit}
                className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-transparent hover:border-hover-gold hover:border-2"
                >Continue</button>
            </div>
        </form>
      </Modal>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-hover-gold text-base-brown font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[15%]'>Date</th>
          <th className='p-2 w-[13%]'>Feed Intake</th>
          <th className='p-2 w-[13%]'>Water Intake</th>
          <th  className='p-2 w-[13%]'>Mortality</th>
          <th  className='p-2 w-[5%]'></th>
        </tr>
      </thead>
      <tbody>
        {
          reportData.map((report, index) => <tr key={report.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
            <td className='p-2'>{ report.from }</td>
            <td className='p-2'>{ report.feed_intake }</td>
            <td className='p-2'>{ report.water_intake }</td>
            <td className='p-2'>{ report.mortality }</td>
            <td className='p-2'>
              <Tippy content='Edit Report'>
                <button onClick={() => editReport(index) }>
                  <FaPencilAlt />
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

export default MothlyReportTable;