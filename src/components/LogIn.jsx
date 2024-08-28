import React, { useState } from 'react';
import axios from 'axios';

function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <>    
      <h2>login</h2>
      <br></br>
      <p>Email:</p>
      <form>
        <input 
          type = 'email'
          value = {email}
          onChange = {(e)=>setEmail(e.target.value)}
          placeholder='email'
        />
      </form>
      <p>Password:</p>
      <form>
        <input
          type ='password'
          value ={password}
          onChange = {(e)=> setPassword(e.target.value)}
          placeholder='password'
        />
      </form>
      <button type='submit'>Login</button>
    </>

  );
};

export default LogIn;
