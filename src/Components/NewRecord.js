import React from 'react';
import { useForm } from 'react-hook-form';
import { addFarmData } from '../Utils/Funcs';
import { toast } from 'react-toastify';


function NewRecord() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const submitData = async (data) => {
    if (!errors.feed_intake &&
        !errors.water_intake &&
        !errors.vaccine_administered) {
        const loader = document.getElementById('query-loader');
        const text = document.getElementById('query-text');
        loader.style.display = 'flex';
        text.style.display = 'none';
        console.log(data)
        const res = await addFarmData(data);
        loader.style.display = 'none';
        text.style.display = 'inline';
        if (res.status === 201) {
          toast.success('Record Added successfully');
          reset();
        } else if (res.status === 500) {
          toast.error('An error occurred');
        } else {
          console.log(res.status);
          const responseData = await res.json();
          console.log(responseData);
          toast.warning("Record adding failed")
        }
    }
  }

  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Add New Record</p>
        <form onSubmit={handleSubmit(submitData)} noValidate>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="feed_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Feed Intake:</label>
                <input type="number" id="feed_intake" placeholder="Feed Intake" { ...register("feed_intake", { required: "Add Feed intake" }) }
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <p className='text-xs text-red-600 mb-3 text-center'>{ errors.feed_intake?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="water_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Water Intake:</label>
                <input type="number" id="water_intake" placeholder="Water Intake" { ...register("water_intake", { required: "Add Water Intake" }) }
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <p className='text-xs text-red-600 mb-3 text-center'>{ errors.water_intake?.message }</p>
            <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label htmlFor="vaccine" className="font-bold font-serif text-hover-gold p-1 mr-2">Vaccine:</label>
                <input type="text" id="vaccine" placeholder="Vaccine" { ...register("vaccine_administered", { required: "Add vaccine" }) }
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <p className='text-xs text-red-600 mb-3 text-center'>{ errors.vaccine_administered?.message }</p>
            <div className="m-4">
                <label htmlFor="additional_notes" className="font-bold font-serif text-hover-gold p-1 mr-2 block">Additional Notes:</label>
                <textarea rows="5"
                className='w-full bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0'></textarea>
            </div>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <div className="dots hidden" id="query-loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span id="query-text">Submit Data</span>
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewRecord