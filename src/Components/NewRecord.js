import React from 'react'

function NewRecord() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Add New Record</p>
        <form>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="feed_intake" class="font-bold font-serif text-hover-gold p-1 mr-2">Feed Intake:</label>
                <input type="number" name="feed_intake" id="feed_intake" placeholder="Feed Intake"
                class="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="water_intake" class="font-bold font-serif text-hover-gold p-1 mr-2">Water Intake:</label>
                <input type="number" name="water_intake" id="water_intake" placeholder="Water Intake"
                class="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="vaccine" class="font-bold font-serif text-hover-gold p-1 mr-2">Vaccine:</label>
                <input type="text" name="vaccine" id="vaccine" placeholder="Vaccine"
                class="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="mortality" class="font-bold font-serif text-hover-gold p-1 mr-2">Mortality:</label>
                <input type="number" name="mortality" id="mortality" placeholder="Mortality"
                class="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4">
                <label for="additional_notes" class="font-bold font-serif text-hover-gold p-1 mr-2 block">Additional Notes:</label>
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