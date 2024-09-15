import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';  // External CSS for Home

const Home = () => {
  const navigate = useNavigate();

  return (

    <div>
        <Navbar />
        <div className="home-container">
      <div className="cards-container">
        <div className="card" onClick={() => navigate('/about')}>
          <h2>About</h2>
        </div>
        <div className="card" onClick={() => navigate('/chat')}>
          <h2>Chat</h2>
        </div>
        <div className="card" onClick={() => navigate('/translate')}>
          <h2>Translate</h2>
        </div>
        <div className="card" onClick={() => navigate('/faq')}>
          <h2>FAQ</h2>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Home;
