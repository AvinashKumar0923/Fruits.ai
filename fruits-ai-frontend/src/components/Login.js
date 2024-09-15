import React, { useState } from 'react';
import './Login.css';  // External CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the credentials match the admin's credentials
    if (email === 'dummy@email.com' && password === 'dummy#1234') {
      window.location.href = '/home'; // Redirect to home page
    } else {
      setErrorMessage('Invalid email id or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-container">
          <label>Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
