import Tippy from '@tippyjs/react';
import React, { useEffect, useState, useReducer } from 'react';
import {
  getFlockBreedInformation, convertDate,
  getFlockBreed, updateFlockBreedInformation,
  deleteFlockBreedInformation, handleData,
  handleDelete
} from '../Utils/Funcs';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import chickenTypes from '../mock_data/chicken_type.json';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

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

function BreedInformationTable() {

  const [breedInformation, setBreedInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, dispatch] = useReducer(reducer, initialModalState);
  const [breeds, setBreeds] = useState([]);
  const { register, handleSubmit, setValue, reset, formState } = useForm();
  const [ delItem, setDelItem ] = useState(null);
  const [ editItem, setEditItem ] = useState(null);
  const { errors } = formState;

  useEffect(() => {
    if (editItem !== null ) {
        setValue('breed', editItem.breed || '');
        setValue('chicken_type', editItem.chicken_type || '');
        setValue('average_mature_weight_in_kgs', editItem.average_mature_weight_in_kgs || '');
        setValue('average_egg_production', editItem.average_egg_production || '');
        setValue('maturity_age_in_weeks', editItem.maturity_age_in_weeks || '');
    }
  }, [editItem, setValue]);

  const editBreedInfo = async (data) => {
    if (!errors.average_mature_weight_in_kgs &&
      !errors.maturity_age_in_weeks
    ) {
      const reqData = {}
      if (data.breed !== "" && data.breed !== "default" && data.breed !== editItem.breed) reqData.breed = data.breed;
      if (data.chicken_type !== "" && data.chicken_type !== "default" && data.chicken_type !== editItem.chicken_type) reqData.chicken_type = data.chicken_type;
      if (data.average_mature_weight_in_kgs !== "" && data.average_mature_weight_in_kgs !== editItem.average_mature_weight_in_kgs) reqData.average_mature_weight_in_kgs = data.average_mature_weight_in_kgs;
      if (data.average_egg_production !== "" && data.average_egg_production !== editItem.average_egg_production) reqData.average_egg_production = data.average_egg_production;
      if (data.maturity_age_in_weeks !== "" && data.maturity_age_in_weeks !== editItem.maturity_age_in_weeks) reqData.maturity_age_in_weeks = data.maturity_age_in_weeks;
      const loader = document.getElementById("query-loader-edit");
      const text = document.getElementById("query-text-edit");
      loader.style.display = "flex";
      text.style.display = "none";
      const res = await updateFlockBreedInformation(reqData, editItem.id);
      handleData(res, loader, text, toast, reset, "Breed Info Updated Successfully")
        .then((res) => {
          getFlockBreedInformation()
            .then((res) => {
              res.json().then((data) => {
                setBreedInformation(data);
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
  }

  useEffect(() => {
    Promise.all([getFlockBreedInformation(), getFlockBreed()])
    .then(([info, breed]) => 
      Promise.all([info.json(), breed.json()])
    )
    .then(([infoData, breedData]) => {
      setBreedInformation(infoData);
      setBreeds(breedData);
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false);
    })
  }, []);

  const openEditModal = (data) => {
    setEditItem(data);
    dispatch('openEdit');
  }

  const openDelModal = (data) => {
    setDelItem(data);
    dispatch('openDelete')
  };

  const delBreedInfo = async () => {
    const loader = document.getElementById('query-loader-del');
    const text = document.getElementById('query-text-del');
    loader.style.display = 'flex';
    text.style.display = 'none';
    const res = await deleteFlockBreedInformation(delItem.id);
    loader.style.display = 'none';
    text.style.display = 'flex';
    handleDelete(res, toast, "Breed Info Deleted Successfully")
    .then((res) => {
      getFlockBreedInformation()
        .then((res) => {
          res.json().then((data) => {
            setBreedInformation(data);
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

  if (loading) {
    return <div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[10%] hidden lg:table-cell'>S/No</th>
          <th className='p-2 w-[20%] lg:table-cell'>Breed</th>
          <th className='p-2 w-[20%] lg:table-cell'>Type</th>
          <Tippy content='Average Mature Weight in Kgs'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AMW(kgs)</th>
          </Tippy>
          <Tippy content='Average Egg Production'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AEP</th>
          </Tippy>
          <Tippy content='Maturity Age in Weeks'>
            <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>MAW</th>
          </Tippy>
          <th className='p-2 w-[20%] hidden lg:table-cell '>Date Added</th>
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
    <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">Edit Breed Information</p>
      <form onSubmit={handleSubmit(editBreedInfo)} noValidate>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
            <label htmlFor="breed-name" className="font-semibold text-black p-1 mr-2">Breed:</label>
            <select id='breed-name' defaultValue='default'
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
            { ...register('breed')}>
              <option value='default' disabled>Breed Name</option>
              {breeds.map((breed) => <option key={breed.id} value={breed.id}>{ breed.name }</option>)}
            </select>
        </div>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
          <label htmlFor="chickenType" className="font-semibold text-black p-1 mr-2">Chicken Type:</label>
          <select id='chickenType' defaultValue='default'
          className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
          { ...register('chicken_type')}>
            <option value='default' disabled>Chicken Type</option>
            {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
          </select>
        </div>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
          <label htmlFor="amw" className="font-semibold text-black p-1 mr-2">Average Weight:</label>
          <input type="number" id="amw" placeholder='Average Mature Weight(kgs)' max='3'
          { ...register('average_mature_weight_in_kgs', {
            min: {
              value: 1.50,
              message: 'Minimum Weight is 1.5'
            },
            max: {
              value: 3,
              message: 'Maximum Weight is 3'
            }
          })}
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
        </div>
        <p className='text-xs text-red-600 mb-4 text-center'>{ errors.average_mature_weight_in_kgs?.message }</p>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
          <label htmlFor="aep" className="font-semibold text-black p-1 mr-2">Average Eggs:</label>
          <input type="number" id="aep" placeholder='Average Eggs Produced'
          { ...register('average_egg_production')}
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" />
        </div>
        <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
          <label htmlFor="maw" className="font-semibold text-black p-1 mr-2">Maturity Age:</label>
          <input type="number" name="maw" id="maw" placeholder='Maturity Age in Weeks' max='24' min='8'
          { ...register('maturity_age_in_weeks', {
            min: {
              value: 8,
              message: 'Minimum Age is 8'
            },
            max: {
              value: 24,
              message: 'Maximum Age is 24'
            }
          })}
            className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
        </div>
        <p className='text-xs text-red-600 mb-4 text-center'>{ errors.maturity_age_in_weeks?.message }</p>
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
          <h2 className='text-sm lg:text-xl text-nowrap'>Are you sure you want to delete this breed information?</h2>
          <div className='w-full flex justify-end my-4'>
          <button onClick={delBreedInfo}
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
  <table className='table-auto w-full border-collapse'>
  <thead className='shadow-lg text-left bg-slate-100 text-black font-semibold'>
    <tr className='h-10 text-xs lg:text-sm'>
      <th className='p-2 w-[10%] hidden lg:table-cell'>S/No</th>
      <th className='p-2 w-[20%] lg:table-cell'>Breed</th>
      <th className='p-2 w-[20%] lg:table-cell'>Type</th>
      <Tippy content='Average Mature Weight in Kgs'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AMW(kgs)</th>
      </Tippy>
      <Tippy content='Average Egg Production'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>AEP</th>
      </Tippy>
      <Tippy content='Maturity Age in Weeks'>
        <th className='p-2 w-[5%] lg:w-[10%] lg:table-cell'>MAW</th>
      </Tippy>
      <th className='p-2 w-[20%] hidden lg:table-cell '>Date Added</th>
      <th className='p-2 w-[10%] lg:table-cell'></th>
    </tr>
  </thead>
  <tbody className='text-sm'>
    {
      breedInformation.map((info, index) => <tr key={info.id} className='h-10 border-b-2 font-normal text-sm lg:text-base'>
      <td className='p-2 hidden lg:table-cell'>{ index + 1 }</td>
      <td className='p-2'>{ info.breed_name }</td>
      <td className='p-2'>{ info.chicken_type }</td>
      <td className='p-2'>{ info.average_mature_weight_in_kgs }</td>
      <td className='p-2'>{ info.average_egg_production }</td>
      <td className='p-2'>{ info.maturity_age_in_weeks }</td>
      <td className='p-2 hidden lg:table-cell'>{ convertDate(info.date_added) }</td>
      <td className='p-2'>
        <Tippy content='Edit Information'>
            <button aria-label={`Edit Information`} className='ml-2' onClick={() => openEditModal(info)}>
              <FaPencilAlt />
            </button>
          </Tippy>
          <Tippy content='Delete Information'>
            <button aria-label={`Delete Information`} className='ml-2' onClick={() => openDelModal(info)}>
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

export default BreedInformationTable;
