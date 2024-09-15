import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // External CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-link">
        <h1>Fruits.ai</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
