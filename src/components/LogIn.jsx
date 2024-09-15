import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();

  const handleLogIn = async(e) =>{
    e.preventDefault();
    let response =  ""
    try{
      response = await axios.post('http://localhost:3001/login',{
        user: {
          email: email,
          password: password,
        },
      })

      const userId = response.data.status.data.user.id;
      navigate(`/homepage/${userId}`);


    }catch (error) {
      if (error.response) {
        alert("Login error" + JSON.stringify(error))

      } else if (error.request){
          alert('No response received:', error.request);
      }else {
        // Something happened in setting up the request that triggered an Error
        alert('Error setting up request:', error.message);
      }
    }
     localStorage.setItem('token', response.data.status.token);
      localStorage.setItem('userId', userId);
  } 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-pink-200 to-pink-300">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">Login</h2>
        
        <form className="space-y-4" onSubmit={handleLogIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>

          <button
            type="button"
            className="text-sm text-pink-500 hover:text-pink-400"
          >
            Forgot password
          </button>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Login
          </button>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            onClick={()=> navigate('/signup')}
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default LogIn;
