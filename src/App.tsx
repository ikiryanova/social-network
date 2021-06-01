import { connect } from 'react-redux';
import { compose } from 'redux';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { AppStateType } from './redux/redux-store';
//import Footer from './components/Footer/Footer';
import HeaderComponent from './components/Header/HeaderComponent';
import { initializeApp } from './redux/app-reducer';
import { LoginPage } from './components/Login/LoginPage';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Preloader from './components/common/Preloader/Preloader';
import Settings from './components/Settings/Settings';
import { withSuspense } from './components/hoc/withSuspense';

import './App.css';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//const Login = React.lazy(() => import('./components/Login/Login'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedContainer = withSuspense(UsersPage);
const SuspendedLogin = withSuspense(LoginPage);

const { Header, Content, Footer, Sider } = Layout;
class App extends React.Component<MapPropsType & DispatchPropsType> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  catchAllUnhedleErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occered');
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhedleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhedleErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      <Layout>
        <Header className="header">
          <div className="logo">
            <HeaderComponent />
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Navbar />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                <Route exact path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route exact path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route exact path="/users" render={() => <SuspendedContainer/>} />
                <Route exact path="/login" render={() => <SuspendedLogin />} />

                <Route exact path="/news" component={News} />
                <Route exact path="/music" component={Music} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>FreeTell ©2021 Created by Irina Kiryanova</Footer>
      </Layout>

      // <div className="container">
      //   <div className="main">
      //     <HeaderContainer />
      //     <div className="wrapper">
      //       <Navbar />
      //       <div className="content">
              // <Switch>
              //   <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
              //   <Route exact path="/profile/:userId?" render={() => <SuspendedProfile />} />
              //   <Route exact path="/dialogs" render={() => <SuspendedDialogs />} />
              //   <Route exact path="/users" render={() => <SuspendedContainer/>} />
              //   <Route exact path="/login" render={() => <SuspendedLogin />} />

              //   <Route exact path="/news" component={News} />
              //   <Route exact path="/music" component={Music} />
              //   <Route exact path="/settings" component={Settings} />
              //   <Route exact path="*" render={() => <div>404 NOT FOUND</div>} />
              // </Switch>
      //       </div>
      //     </div>
      //     <Footer />
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);
