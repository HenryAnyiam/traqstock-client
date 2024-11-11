import React from 'react'

function NewHousingStructure() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">New Housing Structure</p>
        <form>
            <div className="m-4 lg:grid lg:grid-cols-3">
              <label htmlFor="name" className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</label>
              <input type="text" name="name" id="name" placeholder="Name"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="housing-type" className="font-bold font-serif text-hover-gold p-1 mr-2">Type:</label>
                <select id='housing-type' name='housing-type' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Housing Type</option>
                  <option value='Open-Sided Shed'>Open-Sided Shed</option>
                  <option value='Closed Shed'>Closed Shed</option>
                  <option value='Battery Cage System'>Battery Cage System</option>
                  <option value='Deep Litter House'>Deep Litter House</option>
                  <option value='Semi-Intensive Housing'>Semi-Intensive Housing</option>
                  <option value='Pasture Housing'>Pasture Housing</option>
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="feed_intake" className="font-bold font-serif text-hover-gold p-1 mr-2">Category:</label>
                <select id='housing-category' name='housing-category' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Housing Category</option>
                  <option value='Brooder Chick House'>Brooder Chick House</option>
                  <option value='Growers House'>Growers House</option>
                  <option value='Layers House'>Layers House</option>
                  <option value='Broilers House'>Broilers House</option>
                  <option value='Breeders House'>Breeders House</option>
                </select>
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

export default NewHousingStructure;
