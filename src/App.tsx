import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/Preloader/Preloader';
import './App.css';
import { withSuspense } from './components/hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedContainer = withSuspense(UsersContainer);
const SuspendedLogin = withSuspense(Login);
class App extends React.Component<MapPropsType & DispatchPropsType> {
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
      <div className="container">
        <div className="main">
          <HeaderContainer />
          <div className="wrapper">
            <Navbar />
            <div className="content">
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
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

