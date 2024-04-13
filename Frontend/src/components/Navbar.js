import React from 'react';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <h2> Dashboard</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
