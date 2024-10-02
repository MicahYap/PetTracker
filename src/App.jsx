import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';


// Components
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import Error from './components/Error';
import HomeScreen from './components/HomeScreen';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        
        <Route path="/homepage/:userId" element={<HomeScreen />} />
        <Route path="/pets" element={<CreateProfile />} />
        <Route path="/pets/:id/edit_profile" element={<EditProfile />} />
        <Route path="/pets/:id" element={<Profile />} />
        
      
        <Route path="*" element={<Error />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

