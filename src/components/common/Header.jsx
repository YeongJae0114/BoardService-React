import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MyBoard</Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
