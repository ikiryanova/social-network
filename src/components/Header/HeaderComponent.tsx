import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../redux/auth-reducer';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import logo from '../../assets/logo.png';

import './header.css';



const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    // <header className="header-">
    //   <div className="header-logo">
    //     <Link to="/profile">
    //       <img src={logo} alt="logo" />
    //       <h1 className="header__title">freeTell</h1>
    //     </Link>
    //   </div>
      <div className="header-login">
        {isAuth ? (
          <div>
            <span className="header-login__login">{login}</span>
            <Button type="primary" onClick={logout}>Log out</Button>
          </div>
        ) : (
          <Button type="primary" onClick={logout}>
            <Link to={'/login'}>
              Login
            </Link>
          </Button>
        )}
      </div>
    // </header>
  );
};

export default HeaderComponent;