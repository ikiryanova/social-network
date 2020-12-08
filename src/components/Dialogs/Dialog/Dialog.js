import React from 'react';
import { NavLink } from 'react-router-dom';
import './dialog.css';

const Dialog = ({ name, id }) => {
  let path = `/dialogs/${id}`;
  return (
    <li className="dialog">
      <NavLink to={path} activeClassName="dialog_active">
        {name}
      </NavLink>
    </li>
  );
};

export default Dialog;