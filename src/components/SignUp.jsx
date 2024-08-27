import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>    
      <h2>Sign Up</h2>
      <br />
      <p>Email:</p>
      <form>
        <input 
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
      </form>
      <p>Password:</p>
      <form>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
      </form>
      <p>Confirm Password:</p>
      <form>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='confirm password'
        />
      </form>
      <button type='submit'>Sign Up!</button>
    </>
  );
}

export default SignUp;