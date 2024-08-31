
import React, { useState } from 'react';
import GroomerDisplay from './GroomerDisplay';
import VetDisplay from './VetDisplay';

function Profile() {
  const [flagGroom, setFlagGroom] = useState(true);
  const [flagVet, setFlagVet] = useState(false);
  const [flagVax, setFlagVax] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300">
      <div className="flex space-x-6 p-10">
      
      {/* left side of the scree */}
        <div className="w-1/3 space-y-6">
          <p className="bg-pink-500 p-4 rounded-lg text-center text-white text-xl font-bold border-none focus:outline-none w-full">Pet Name</p>
          <p className="bg-pink-200 h-60 rounded-lg flex items-center justify-center"> image here</p>
          <p className="bg-pink-200 h-32 rounded-lg p-4 text-center">description</p>
          <button className="text-pink-800 underline">← BACK TO DASHBOARD</button>
        </div>

        {/* //next column */}
        <div className="w-2/3 bg-pink-200 p-8 rounded-lg">
          <div className="flex w-full">
            <p className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                  flagGroom ? 'bg-pink-400 text-slate-900' : 'bg-pink-300 text-slate-900 hover:bg-pink-300'
                }`} onClick={() => { setFlagGroom(true); setFlagVet(false); setFlagVax(false); }}>
              Grooming
            </p>
            <p className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                  flagVet ? 'bg-pink-400 text-slate-900' : 'bg-pink-300 text-slate-900 hover:bg-pink-300'
                }`} onClick={() => { setFlagGroom(false); setFlagVet(true); setFlagVax(false); }}>
              Vet
            </p>
            <p className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                  flagVax ? 'bg-pink-400 text-slate-900' : 'bg-pink-300 text-slate-900 hover:bg-pink-300'
                }`} onClick={() => { setFlagGroom(false); setFlagVet(false); setFlagVax(true); }}>
              Vax Card
            </p>
          </div>

          <div className='bg-pink-400 w-full h-96 p-6 overflow-y-auto'>
            {flagGroom && (<GroomerDisplay />)}
            {flagVet && (<VetDisplay />)}
          </div>
        </div>

      </div>
    </div>
  );
}
export default Profile;
