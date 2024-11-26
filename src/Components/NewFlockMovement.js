import React from 'react';
import structures from '../mock_data/housing_structure.json';

function NewFlockMovement() {
  return (
    <div className="bg-base-green flex h-full justify-center items-center">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Record New Flock Movement</p>
        <form noValidate>
        <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="housing-type" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Moved:</label>
                <select id='housing-type' name='housing-type' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Flock Name</option>
                  <option value='Virgin Flock'>Virgin Flock</option>
                  <option value='Large Roosters'>Large Roosters</option>
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="movedFromStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Moved From:</label>
                <select id='movedFromStructure' name='movedFromStructure' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Moved From</option>
                  {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.category} - ${structure.type}` }</option>)}
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="MovedToStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Moved To:</label>
                <select id='MovedToStructure' name='MovedToStructure' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Moved To</option>
                  {structures.map((structure) => <option key={structure.id} value={structure.id}>{ `${structure.category} - ${structure.type}` }</option>)}
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

export default NewFlockMovement;
