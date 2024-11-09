import React from 'react'

function NewRecord() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Add New Record</p>
        <form>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="feed_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Feed Intake:</label>
                <input type="number" name="feed_intake" id="feed_intake" placeholder="Feed Intake"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="water_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Water Intake:</label>
                <input type="number" name="water_intake" id="water_intake" placeholder="Water Intake"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="vaccine" className="font-bold font-serif text-hover-gold p-1 mr-2">Vaccine:</label>
                <input type="text" name="vaccine" id="vaccine" placeholder="Vaccine"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4">
                <label htmlFor="additional_notes" className="font-bold font-serif text-hover-gold p-1 mr-2 block">Additional Notes:</label>
                <textarea rows="5"
                className='w-full bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0'></textarea>
            </div>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  Submit Data
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewRecord