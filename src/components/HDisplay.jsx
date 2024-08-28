import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HDisplay() {
  const navigate =useNavigate();
  return(       
  <div className="border-2 border-pink-500 mx-20 mb-20 p-6 rounded-lg grid grid-cols-3 grid-rows-2 gap-10">
      {/* The + button occupies the 1st column, 1st row */}
      <div className="flex items-center justify-center col-span-1 row-span-1">
        <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
      </div>

      {/* Add additional grid items here as needed */}
      <div className="flex items-center justify-center col-span-1 row-span-1">
      <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
        {/* Example content for the 2nd column, 1st row */}
      </div>
      <div className="flex items-center justify-center col-span-1 row-span-1">
      <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
        {/* Example content for the 3rd column, 1st row */}
      </div>
      <div className="flex items-center justify-center col-span-1 row-span-1">
      <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
        {/* Example content for the 4th column, 1st row */}
      </div>
      <div className="flex items-center justify-center col-span-1 row-span-1">
      <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
        {/* Example content for the 1st column, 2nd row */}
      </div>
      <div className="flex items-center justify-center col-span-1 row-span-1">
      <button 
          className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
          onClick={() => navigate('/create_profile')}
        >
          +
        </button>
        {/* Example content for the 2nd column, 2nd row */}
      </div>
    </div>
  );
}

export default HDisplay;
