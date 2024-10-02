import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShoppingList() {
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
        const response = await axios.get('${API_URL}pets', {
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
      Coming Soon...
      

      
      
      
    </div>
  );
}

export default ShoppingList;
