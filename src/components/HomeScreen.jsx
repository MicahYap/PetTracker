import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomeScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import HDisplay from './HDisplay';
import { useNavigate } from 'react-router-dom';

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
        const userResponse = await axios.get('http://localhost:3001/current_user', {
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
        alert('No token found. Please log in.');
        navigate('/login');
        return;
      }
      const response = await axios.delete('http://localhost:3001/logout', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      if (response.status === 200) {
        alert('Logout successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed', error);
      alert('Logout failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300">
      <div className="grid grid-cols-3">

        <div id="siteName" className="col-start-2 text-center text-4xl text-slate-100 py-10">
          Pet Tracker
        </div>

        <section className="col-start-3 justify-self-center self-start ">
          <button className="py-2 px-5 text-1xl text-slate-100 bg-pink-500 hover:bg-pink-400 rounded-full">
            <FontAwesomeIcon icon={faBell} />
          </button>

          {/* LOGOUT BUTTON */}
          <button
            className="py-2 px-5 my-10 text-xl text-slate-100 bg-pink-500 hover:bg-pink-400 rounded-full"
            onClick={logout}
          >
            Logout
          </button>
        </section>
      </div>

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
      <HDisplay />
    </div>
  );
}

export default HomeScreen;
