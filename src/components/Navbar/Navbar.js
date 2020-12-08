import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active" to="/profile">Profile</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/dialogs">Dialogs</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/users">Users</NavLink>
        </li>
        {/* <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/news">News</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/music">Music</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/settings">Settings</NavLink>
        </li> */}
      </ul>
    </nav>
  )
}

export default Navbar;