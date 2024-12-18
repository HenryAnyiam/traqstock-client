import React, { useState, useEffect, useReducer } from 'react';
import {
  getFlockHistory,
  convertDate,
  deleteFlockHistory,
  handleDelete,
  getHousingStructures,
  getFlocks,
  updateFlockHistory,
  handleData
} from "../Utils/Funcs";
import Loader from './Loader';
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Tippy from '@tippyjs/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import rearingMethods from "../mock_data/rearing_method.json";


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
  const [flocks, setFlocks] = useState([]);
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    Promise.all([getFlocks(), getHousingStructures(), getFlockHistory()])
      .then(([flockRes, structureRes, historyRes]) =>
        Promise.all([flockRes.json(), structureRes.json(), historyRes.json()])
      )
      .then(([flockData, structureData, historyData]) => {
        setFlocks(flockData);
        setStructures(structureData);
        setCollection(historyData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (editItem !== null) {
      setValue("flock", editItem.flock);
      setValue('rearing_method', editItem.rearing_method);
      setValue('current_housing_structure', editItem.current_housing_structure);
    }
  }, [editItem, setValue]);



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

  const editHistory = async (data) => {
      const reqData = {}
      if (data.flock !== "" && data.flock !== editItem.flock) reqData.flock = data.flock;
      if (data.rearing_method !== "" && data.rearing_method !== "default" && data.rearing_method !== editItem.rearing_method) reqData.rearing_method = data.rearing_method;
      if (data.current_housing_structure !== "" && data.current_housing_structure !== editItem.current_housing_structure) reqData.current_housing_structure = data.current_housing_structure;
      const loader = document.getElementById("query-loader");
      const text = document.getElementById("query-text");
      loader.style.display = "flex";
      text.style.display = "none";
      const res = await updateFlockHistory(reqData, editItem.id);
      handleData(res, loader, text, toast, reset, "History Updated Successfully")
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
          dispatch("closeEdit");
        })
    }

  const delHistory = async () => {
    const loader = document.getElementById("query-loader-del");
    const text = document.getElementById("query-text-del");
    loader.style.display = "flex";
    text.style.display = "none";
    const res = await deleteFlockHistory(delItem.id);
    loader.style.display = "none";
    text.style.display = "flex";
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
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
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
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
      }}
      >
        <div>
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete {delItem?.flock_name} history?</h2>
          <div className='w-full flex justify-end my-4'>
          <button
          className='p-2 fill-white text-white flex w-28 items-center bg-new-green justify-center rounded-lg shadow-md btn-anim'
          onClick={delHistory}>
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
      <div className="h-fit w-80 lg:w-fit">
        <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Edit Flock History</p>
        <form onSubmit={handleSubmit(editHistory)} noValidate>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="flock-name" className="font-semibold text-black p-1 mr-2">Flock:</label>
            <select id='flock-name' defaultValue="default" { ...register('flock') }
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Flock</option>
              {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.name}` }</option>)}
            </select>
          </div>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="rearingMethod" className="font-semibold text-black p-1 mr-2">Rearing method:</label>
                <select id='rearingMethod' defaultValue='default'
                className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                { ...register('rearing_method') }>
                  <option value='default' disabled>Rearing method</option>
                  {rearingMethods.map((method) => <option key={method.id} value={method.name}>{ method.name }</option>)}
                </select>
            </div>
          <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="currentStructure" className="font-semibold text-black p-1 mr-2">Housing:</label>
            <select id='currentStructure' defaultValue="default" { ...register('current_housing_structure')} 
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option value="default" disabled>Housing Structure</option>
              {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.name}` }</option>)}
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
    </Modal>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] table-cell'>S/No</th>
      <th className='p-2 w-[15%] table-cell'>Flock Name</th>
      <th className='p-2 w-[15%] table-cell '>Rearing Method</th>
      <th className='p-2 w-[15%] table-cell '>Housing</th>
      <th className='p-2 w-[15%] table-cell '>Date</th>
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
    </tr>)
    }
  </tbody>
</table>
</div>
}

export default FlockHistoryTable;
