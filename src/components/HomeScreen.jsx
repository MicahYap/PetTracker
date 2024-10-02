import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomeScreen.css';
import HDisplay from './HDisplay';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import ShoppingList from './ShoppingList';
import { API_URL } from '../constants/constants';


function HomeScreen() {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');  // Redirect to login if token is not available
          return;
        }
        const userResponse = await axios.get(`${API_URL}current_user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(userResponse.data); // You may want to handle the user data
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, [navigate]);

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in.');
        navigate('/login');
        return;
      }
      const response = await axios.delete(`${API_URL}logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed', error);
      alert('Logout failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-pink-200 to-pink-300">
      
      <header className="bg-pink-500 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">

         
          <Notification />

         
            <div id="siteName"className="text-3xl font-bold text-white">
            Pet Tracker
          </div>



         
          <button
            className="text-xl text-white bg-pink-800 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md focus:outline-none transition-all"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-grow">
        <div id="picker" className="flex justify-around text-3xl text-slate-100 mt-3">
          <p
            className={`px-6 py-2 rounded-t-lg cursor-pointer ${
              !flag ? 'bg-pink-400 text-slate-900' : 'bg-pink-200 text-slate-900 hover:bg-pink-300'
            }`}
            onClick={() => setFlag(false)}
          >
            Pets
          </p>
          <p
            className={`px-6 py-2 rounded-t-lg cursor-pointer ${
              flag ? 'bg-pink-400 text-slate-900' : 'bg-pink-200 text-slate-900 hover:bg-pink-300'
            }`}
            onClick={() => setFlag(true)}
          >
            Shopping List
          </p>
        </div>
        {
          flag ? <ShoppingList/> :<HDisplay />
        }
        
      </div>

   
      <footer className="bg-pink-300 text-slate-900 py-4 mt-10 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="my-2">
              <h3 className="font-semibold text-lg">About Us</h3>
              <p className="text-sm">
                Keeping track of your pets made easy.
              </p>
            </div>
            <div className="my-2">
              <h3 className="font-semibold text-lg">Contact Us</h3>
              <p className="text-sm">Email: support@pettracker.com</p>
              <p className="text-sm">Phone: +1 123 456 7890</p>
            </div>
            <div className="my-2">
              <h3 className="font-semibold text-lg">&copy; 2024 Pet Tracker</h3>
              <p className="text-sm">All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;
