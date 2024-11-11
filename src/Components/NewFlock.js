import React from 'react';
import sources from '../mock_data/flock_source.json';
import breeds from '../mock_data/flock_breed.json';
import chickenTypes from '../mock_data/chicken_type.json';
import rearingMethods from '../mock_data/rearing_method.json';
import structures from '../mock_data/housing_structure.json';

function NewFlock() {
  return (
    <div className="bg-base-green flex h-fit min-h-full justify-center items-center py-4 lg:py-0">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Register New Flock</p>
        <form>
            <div className="m-4 lg:grid lg:grid-cols-3">
              <label htmlFor="name" className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</label>
              <input type="text" name="name" id="name" placeholder="Name"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="flockSource" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Source:</label>
                <select id='flockSource' name='flockSource' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Source</option>
                  {sources.map((source) => <option key={source.id} value={ source.id }>{ source.name }</option>)}
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="flockBreed" className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Breed:</label>
                <select id='flockBreed' name='flockBreed' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Breed</option>
                  {breeds.map((breed) => <option key={breed.id} value={breed.id}>{ breed.name }</option>)}
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
              <label htmlFor="hatchDate" className="font-bold font-serif text-hover-gold p-1 mr-2">Hatch Date:</label>
              <input type="date" name="hatchDate" id="hatchDate"
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="chickenType" className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</label>
                <select id='chickenType' name='chickenType' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Chicken Type</option>
                  {chickenTypes.map((type) => <option key={type.id} value={type.name}>{ type.name }</option>)}
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
              <label htmlFor="initialNumber" className="font-bold font-serif text-hover-gold p-1 mr-2">Initial Birds:</label>
              <input type="number" name="initialNumber" id="initialNumber" placeholder='Initial Number of Birds' min='0'
                className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2" required />
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="rearingMethod" className="font-bold font-serif text-hover-gold p-1 mr-2">Rearing method:</label>
                <select id='rearingMethod' name='rearingMethod' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Rearing method</option>
                  {rearingMethods.map((method) => <option key={method.id} value={method.name}>{ method.name }</option>)}
                </select>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-3">
                <label htmlFor="housingStructure" className="font-bold font-serif text-hover-gold p-1 mr-2">Housing Structure:</label>
                <select id='housingStructure' name='housingStructure' className="bg-white border-2 border-base-brown rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2">
                  <option selected disabled>Housing Structure</option>
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

export default NewFlock;
