import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function FlockDetails() {
  const params = useParams();
  const flockId = params.flockId;

  return (
    <div className="bg-base-green flex h-fit min-h-full justify-center items-center py-4 lg:py-0">
    <div className="bg-base-brown/[.3] shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
        <p className="text-center rounded-xl font-bold font-serif text-hover-gold p-1 w-full mb-2 text-xl">Details for Flock {flockId}</p>
        <div>
            <div className="m-4 lg:grid lg:grid-cols-2">
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">Name:</p>
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">Virgin Flock</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Source:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Uzima Chicken</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Flock Breed:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Rhode Island Red</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">Hatch Date:</p>
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">22-10-2024</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Chicken Type:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Layers</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">Initial Birds:</p>
              <p className="font-bold font-serif text-hover-gold p-1 mr-2">12</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Rearing method:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Battery Cage System</p>
            </div>
            <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Housing Structure:</p>
                <p className="font-bold font-serif text-hover-gold p-1 mr-2">Housing A</p>
            </div>
            <div className="m-4 flex justify-center">
                <button
                className="flex justify-center items-center text-center text-hover-gold bg-base-brown p-2 mr-4 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <FaPencilAlt/> <span className='ml-2'>Edit Flock</span>
                </button>
                <button
                className="flex justify-center items-center text-center text-hover-gold bg-base-brown p-2 rounded-xl font-bold hover:text-base-brown hover:bg-hover-gold">
                  <FaTrashAlt/> <span className='ml-2'>Delete Flock</span>
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default FlockDetails;
