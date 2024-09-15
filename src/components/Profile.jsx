
import React, { useEffect, useState } from 'react';
import GroomerDisplay from './GroomerDisplay';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [flagGroom, setFlagGroom] = useState(true);
  const [flagVet, setFlagVet] = useState(false);
  const [flagVax, setFlagVax] = useState(false);
  const {id} = useParams();
  const [pet, setPet] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPet(response.data); // Set the pet data
      } catch (error) {
        alert('Error fetching pet details: ' + JSON.stringify(error));
      }
    };
  
    fetchPet();
  }, [id, token]); // Dependency array includes id to refetch if it changes
  

  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300">
      <div className="flex space-x-6 p-10">
      
      {/* left side of the scree */}
        <div className="w-1/3 space-y-6">
          <p className="bg-pink-500 p-4 rounded-lg text-center text-white text-xl font-bold border-none focus:outline-none w-full">{pet ? pet.name : 'Loading...'}</p>
          <p className="bg-pink-200 h-60 rounded-lg flex items-center justify-center"> image here</p>
          <div className="bg-pink-200 h-32 rounded-lg p-4 text-center">
            <p>{pet ? `Breed: ${pet.breed}` : 'Loading...'}</p>
            <p>{pet ? `Birthday: ${pet.birthday}` : 'Loading...'}</p>
            <p>{pet ? `Gotcha Day: ${pet.gotcha_day}` : 'Loading...'}</p>
            <p>{pet ? `Gender: ${pet.gender}` : 'Loading...'}</p>

          </div>
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
          </div>
        </div>

      </div>
    </div>
  );
}
export default Profile;
