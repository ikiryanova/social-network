import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import './header.css';

export type MapPropsType = {
  login: string | null, 
  isAuth: boolean,
}

export type DispatchPropsType = {
  logoutUser: () => void;
  getAuthUserData: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = ({ login, isAuth, logoutUser }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/profile">
          <img src={logo} alt="logo" />
          <h1 className="header__title">freeTell</h1>
        </Link>
      </div>
      <div className="header-login">
        {isAuth ? (
          <div>
            <span className="header-login__login">{login}</span>
            <button className="header-login__logout btn" onClick={logoutUser}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink className="header-login__link btn" to={'/login'}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;