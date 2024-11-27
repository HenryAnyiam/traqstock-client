import React from 'react';
import { useForm } from 'react-hook-form';
import { addHousingStructure } from '../Utils/Funcs';
import { toast } from 'react-toastify';

function NewHousingStructure() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const submitData = async (data) => {
    if (!errors.house_type && !errors.category) {
      const loader = document.getElementById('query-loader');
      const text = document.getElementById('query-text');
      loader.style.display = 'flex';
      text.style.display = 'none';
      console.log(data);
      const res = await addHousingStructure(data);
      loader.style.display = 'none';
      text.style.display = 'block';
      if (res.status === 201) {
        toast.success("Data saved successfully");
        reset();
      } else if (res.status === 500) {
        toast.error("An unexpected error occurred");
        const text = await res.text();
        console.log(`Error ${text}`);
      } else {
        toast.warning("Data saving unsuccessful");
      }
    }
  }
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">New Housing Structure</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="housing-type" className="font-bold font-serif text-hover-gold p-1 mr-2">Type:</label>
                <select id='housing-type' defaultValue="default" { ...register("house_type", {
                  required: "Select House Type",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select House Type"
                  } 
                  })} className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Housing Type</option>
                  <option value='Open-Sided Shed'>Open-Sided Shed</option>
                  <option value='Closed Shed'>Closed Shed</option>
                  <option value='Battery Cage System'>Battery Cage System</option>
                  <option value='Deep Litter House'>Deep Litter House</option>
                  <option value='Semi-Intensive Housing'>Semi-Intensive Housing</option>
                  <option value='Pasture Housing'>Pasture Housing</option>
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.house_type?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="feed_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Category:</label>
                <select defaultValue="default" id='housing-category' { ...register("category", {
                  required: "Select Category",
                  pattern: {
                    value: /^(?!default$).+$/,
                    message: "Select Category"
                  } 
                  })} className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option value="default" disabled>Housing Category</option>
                  <option value='Brooder Chick House'>Brooder Chick House</option>
                  <option value='Growers House'>Growers House</option>
                  <option value='Layers House'>Layers House</option>
                  <option value='Broilers House'>Broilers House</option>
                  <option value='Breeders House'>Breeders House</option>
                </select>
            </div>
            <p className='text-xs text-red-600 mb-4 text-center'>{ errors.category?.message }</p>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <div className="dots hidden" id="query-loader">
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                    <div className="dot bg-hover-gold"></div>
                  </div>
                  <span id="query-text" className='text-center'>Submit Data</span>
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewHousingStructure;
