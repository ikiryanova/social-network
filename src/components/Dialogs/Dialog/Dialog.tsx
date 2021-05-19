import React from 'react';
import { NavLink } from 'react-router-dom';

import './dialog.css';

type PropsType = {
  name: string
  id: number
}

const Dialog: React.FC<PropsType> = ({ name, id }) => {
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