import React, { useEffect, useState, useReducer } from 'react';
import {
  getHousingStructures, getFlocks,
  getFlockMovement, convertDate,
  updateFlockMovement, handleData,
  deleteFlockMovement, handleDelete
} from '../Utils/Funcs';
import Loader from './Loader';
import Modal from 'react-modal';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



const initialModalState = { edit: false, delete: false }
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
    default:
      return state
  }
}

function FlockMovementTable() {
  const [movement, setMovement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, dispatch] = useReducer(reducer, initialModalState);
  const [ delItem, setDelItem ] = useState(null);
  const [ editItem, setEditItem ] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [flocks, setFlocks] = useState([]);
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    getFlockMovement()
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              console.log(data);
              if (!(JSON.stringify(data) === JSON.stringify({detail: 'No flock movement records available.'}))) {
                setMovement(data)
              }
              setLoading(false);
            })
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  useEffect(() => {
    if (editItem !== null ) {
        setValue('flock', editItem.flock || '');
        setValue('from_structure', editItem.from_structure || '');
        setValue('to_structure', editItem.to_structure || '');
    }
  }, [editItem, structures, setValue]);

  useEffect(() => {
    Promise.all([getFlocks(), getHousingStructures()])
    .then(([flockRes, structureRes]) => 
      Promise.all([flockRes.json(), structureRes.json()])
    )
    .then(([flockData, structureData]) => {
      setFlocks(flockData);
      setStructures(structureData);
      console.log(flockData, structureData)
    })
    .catch(err => console.log(err));
  }, [])

  const openEditModal = (structureIndex) => {
    setEditItem(structureIndex);
    dispatch('openEdit');
  }

  const openDelModal = (structureIndex) => {
    setDelItem(structureIndex);
    dispatch('openDelete')
  };

  const delStructure = async () => {
    const loader = document.getElementById('query-loader-del');
    const text = document.getElementById('query-text-del');
    loader.style.display = 'flex';
    text.style.display = 'none';
    const res = await deleteFlockMovement(delItem.id);
    loader.style.display = 'none';
    text.style.display = 'flex';
    handleDelete(res, toast, "Movement Deleted Successfully")
    .then((res) => {
      getFlockMovement()
        .then((res) => {
          res.json().then((data) => {
            setMovement(data);
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

  const editStructure = async (data) => {
    const reqData = {}
    if (data.flock !== "" && data.flock !== editItem.flock) reqData.flock = data.flock;
    if (data.from_structure !== "" && data.from_structure !== "default" && data.from_structure !== editItem.from_structure) reqData.from_structure = data.from_structure;
    if (data.to_structure !== "" && data.to_structure !== "default" && data.to_structure !== editItem.to_structure) reqData.to_structure = data.to_structure;
    const loader = document.getElementById("query-loader-edit");
    const text = document.getElementById("query-text-edit");
    loader.style.display = "flex";
    text.style.display = "none";
    const res = await updateFlockMovement(reqData, editItem.id);
    handleData(res, loader, text, toast, reset, "Movement Updated Successfully")
      .then((res) => {
        getFlockMovement()
          .then((res) => {
            res.json().then((data) => {
              setMovement(data);
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

  if (loading) {
    return <div className=''>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
        <tr className='h-10 text-xs lg:text-sm'>
        <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
        <th className='p-2 w-[25%] lg:table-cell'>Flock Name</th>
        <th className='p-2 w-[25%] lg:table-cell '>Moved From</th>
        <th className='p-2 w-[25%] lg:table-cell '>Moved To</th>
        <th className='p-2 w-[20%] lg:table-cell '>Date Moved</th>
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
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete this record?</h2>
          <div className='w-full flex justify-end my-4'>
          <button onClick={delStructure}
          className='p-2 fill-white text-white flex w-28 items-center bg-new-green justify-center rounded-lg shadow-md btn-anim'
          >
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
          <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Record New Flock Movement</p>
          <form onSubmit={handleSubmit(editStructure)} noValidate>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="flock-name" className="font-semibold text-black p-1 mr-2">Flock Moved:</label>
              <select id='flock-name' { ...register('flock') }
                className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option value="default" disabled>Flock</option>
                {flocks.map((flock) => <option key={flock.id} value={flock.id}>{ `${flock.name}` }</option>)}
              </select>
            </div>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="movedFromStructure" className="font-semibold text-black p-1 mr-2">Moved From:</label>
              <select id='movedFromStructure' { ...register('from_structure')} 
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option value="default" disabled>Moved From</option>
                {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.name}` }</option>)}
              </select>
            </div>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
              <label htmlFor="MovedToStructure" className="font-semibold text-black p-1 mr-2">Moved To:</label>
              <select id='MovedToStructure' { ...register('to_structure')}
              className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option value="default" disabled>Moved To</option>
                {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.name}` }</option>)}
              </select>
            </div>
            <div className="m-4 flex justify-center">
              <button type="submit"
              className="text-center w-full text-white bg-new-green p-2 rounded-xl font-semibold btn-anim">
                <div className="dots hidden" id="query-loader-edit">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span id="query-text-edit" className='text-center'>Submit Data</span>
              </button>
            </div>
          </form>
        </div>
    </Modal>
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] lg:table-cell'>S/No</th>
      <th className='p-2 w-[20%] lg:table-cell'>Flock Name</th>
      <th className='p-2 w-[20%] lg:table-cell '>Moved From</th>
      <th className='p-2 w-[20%] lg:table-cell '>Moved To</th>
      <th className='p-2 w-[20%] lg:table-cell '>Date Moved</th>
      <th className='p-2 w-[10%] lg:table-cell '></th>
    </tr>
  </thead>
  <tbody className='text-sm'>
  {
      movement.map((move, index) => <tr key={ move.id } className='h-10 border-b-2 font-normal text-sm lg:text-base'>
        <td className='p-2'>{ index + 1 }</td>
        <td className='p-2'>{ move.flock_name }</td>
        <td className='p-2'>{ move.from_structure_name }</td>
        <td className='p-2'>{ move.to_structure_name }</td>
        <td className='p-2'>{ convertDate(move.movement_date) }</td>
        <td className='p-2'>
        <Tippy content='Edit Movement'>
            <button aria-label={`Edit Movement`} className='ml-2' onClick={() => openEditModal(move)}>
              <FaPencilAlt />
            </button>
          </Tippy>
          <Tippy content='Delete Movement'>
            <button aria-label={`Delete Movement`} className='ml-2' onClick={() => openDelModal(move)}>
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

export default FlockMovementTable;
