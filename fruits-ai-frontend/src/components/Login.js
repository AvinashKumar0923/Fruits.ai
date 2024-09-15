import React, { useState } from 'react';
import './Login.css';
import Navbar from './Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'dummy@email.com' && password === 'dummy#1234') {
            window.location.href = '/home'; // Redirect to the home page
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
      <div><Navbar/>
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <button type="submit" className="button">Login</button>
                <div className="note-card">
                    <p>Note: Login using the dummy email: <strong>dummy@email.com</strong> and dummy password: <strong>dummy#1234</strong></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;
