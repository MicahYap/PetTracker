import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProfile() {
  const [petName, setPetName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const navigate =useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');



  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      name: petName,
      pet_type: type,
      breed: breed,
      birthday: birthday,
      gotcha_day: gotcha,
      gender: gender,
      user_id: userId
    };
  
    try {
      const response = await axios.post('http://localhost:3001/pets', petData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Pet profile created!');
      navigate('/homepage/:userId');
    } catch (error) {
      if (error.response) {
        // Log the entire error response to understand the issue
        console.error('Error response:', error.response);
        alert('Pet profile creation unsuccessful: ' + JSON.stringify(error.response.data));
      } else if (error.request) {
        alert('No response received: ' + error.request);
      } else {
        alert('Error setting up request: ' + error.message);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300 p-6">
      <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">Create Pet Profile</h2>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Pet Name:</label>
            <input 
              type='text'
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder='Pet Name'
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Type:</label>
            <input
              type='text'
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder='Type of Animal'
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Breed:</label>
            <input
              type='text'
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder='Breed'
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Birthday:</label>
            <input
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              max= {new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Gotcha Day:</label>
            <input
              type='date'
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
              max= {new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Gender:</p>
            <div className="flex items-center mb-2">
              <input
                type='radio'
                value='male'
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                id='male'
                className="mr-2"
              />
              <label htmlFor='male' className="text-gray-700">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type='radio'
                value='female'
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                id='female'
                className="mr-2"
              />
              <label htmlFor='female' className="text-gray-700">Female</label>
            </div>
          </div>

          <button type='submit' className="w-full py-2 px-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
