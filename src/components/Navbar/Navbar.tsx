import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, UserSwitchOutlined } from '@ant-design/icons';

import './navbar.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Navbar: React.FC = () => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<MessageOutlined />}>
        <Link to="/dialogs">Dialogs</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserSwitchOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;

// <nav className="navbar">
//   <ul className="navbar-menu">
//     <li className="navbar-menu__item">
//       <NavLink activeClassName="link_active" to="/profile">Profile</NavLink>
//     </li>
//     <li className="navbar-menu__item">
//       <NavLink activeClassName="link_active"to="/dialogs">Dialogs</NavLink>
//     </li>
//     <li className="navbar-menu__item">
//       <NavLink activeClassName="link_active"to="/users">Users</NavLink>
//     </li>
{
  /* <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/news">News</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/music">Music</NavLink>
        </li>
        <li className="navbar-menu__item">
          <NavLink activeClassName="link_active"to="/settings">Settings</NavLink>
        </li> */
}
//   </ul>
// </nav>
