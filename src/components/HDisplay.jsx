import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HDisplay() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPets = async () => {
      if (!token) {
        alert('Please log in.');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(response.data);
      } catch (error) {
        alert('Error fetching pets');
      }
    };
    fetchPets();
  }, [token, navigate]);



  return (
    <div className="border-2 border-pink-500 h-96 mx-20 mb-20 p-6 rounded-lg grid grid-cols-3 grid-rows-2 gap-10">
 
      {pets.map(pet => (
        <div key={pet.id} className="flex items-center justify-center col-span-1 row-span-1">
          {pet.name ? (
            <div className= 'flex flex-col items-center'>
              <span className="text-auto text-pink-500 bg-pink-200 w-24 h-24 flex items-center justify-center rounded-full"
              onClick={() => navigate(`/pets/${pet.id}`)}
              >
                <img 
                src = {pet.profile_picture_url}
                alt = {pet.name}
                className = 'w-full h-full object-cover rounded-full'
                />
              </span>
              <span>{pet.name}</span>
            </div>
          ) : (

            <button 
              className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-24 h-24 rounded-full flex items-center justify-center"
              onClick={() => navigate('/pets')} >
              +
            </button>
          )}
        </div>
      ))}

      
      <div className="flex items-center justify-center col-span-1 row-span-1">
          <button 
            className="text-3xl text-pink-500 hover:text-white hover:bg-pink-400 bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center"
            onClick={() => navigate('/pets')} >
            +
          </button>
      </div>
      
    </div>
  );
}

export default HDisplay;
