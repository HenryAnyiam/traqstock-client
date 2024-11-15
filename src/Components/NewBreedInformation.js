import React from 'react';
import chickenTypes from '../mock_data/chicken_type.json';

function NewBreedInformation() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Inspection</p>
        <form>
          <div className="m-4 lg:grid lg:grid-cols-3">
              <label htmlFor="housing-type" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
              <select id='housing-type' name='housing-type' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                <option selected disabled>Flock Name</option>
                <option value='Virgin Flock'>Virgin Flock</option>
                <option value='Large Roosters'>Large Roosters</option>
              </select>
          </div>
          <div className="m-4 lg:grid lg:grid-cols-3">
            <label htmlFor="chickenType" className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</label>
            <select id='chickenType' name='chickenType' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
              <option selected disabled>Chicken Type</option>
              {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
            </select>
          </div>
          <div className="m-4 lg:grid lg:grid-cols-3">
            <label htmlFor="amw" className="font-bold font-serif text-hover-gold p-1 mr-2">Average Weight:</label>
            <input type="number" name="amw" id="amw" placeholder='Average Mature Weight(kgs)' max='3'
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
          </div>
          <div className="m-4 lg:grid lg:grid-cols-3">
            <label htmlFor="aep" className="font-bold font-serif text-hover-gold p-1 mr-2">Average Eggs:</label>
            <input type="number" name="aep" id="aep" placeholder='Average Eggs Produced'
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" />
          </div>
          <div className="m-4 lg:grid lg:grid-cols-3">
            <label htmlFor="maw" className="font-bold font-serif text-hover-gold p-1 mr-2">Maturity Age:</label>
            <input type="number" name="maw" id="maw" placeholder='Maturity Age in Weeks' max='24' min='8'
              className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
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

export default NewBreedInformation;
