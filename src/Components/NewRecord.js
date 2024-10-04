import React from 'react'

function NewRecord() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-white/[.3] shadow-2xl rounded-xl h-fit w-60 lg:w-fit">
        <p className="text-center rounded-xl font-bold font-serif text-base-brown p-1 w-full mb-2 text-xl">New Record</p>
        <form>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="feed_intake" class="font-bold font-serif text-base-brown p-1 mr-2">Feed Intake:</label>
                <input type="number" name="feed_intake" id="feed_intake" placeholder="Feed Intake"
                class="bg-white border-2 border-hover-gold rounded-lg p-1 w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="water_intake" class="font-bold font-serif text-base-brown p-1 mr-2">Water Intake:</label>
                <input type="number" name="water_intake" id="water_intake" placeholder="Water Intake"
                class="bg-white border-2 border-hover-gold rounded-lg p-1 w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="vaccine" class="font-bold font-serif text-base-brown p-1 mr-2">Vaccine:</label>
                <input type="number" name="vaccine" id="vaccine" placeholder="Vaccine"
                class="bg-white border-2 border-hover-gold rounded-lg p-1 w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4 lg:grid lg:grid-cols-3">
                <label for="feed_intake" class="font-bold font-serif text-base-brown p-1 mr-2">Feed Intake:</label>
                <input type="number" name="feed_intake" id="feed_intake" placeholder="Feed Intake"
                class="bg-white border-2 border-hover-gold rounded-lg p-1 w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div class="m-4">
                <label for="additional_notes" class="font-bold font-serif text-base-brown p-1 mr-2 block">Additional Notes:</label>
                <textarea rows="5"
                className='w-full bg-white border-2 border-hover-gold rounded-lg p-1 w-58 focus:outline-0'></textarea>
            </div>
            <div className="m-4 flex justify-center">
                <button type="submit"
                className="text-center w-full text-base-brown bg-hover-gold p-2 rounded-xl font-bold hover:text-hover-gold hover:bg-base-brown">
                  Submit Data
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default NewRecord