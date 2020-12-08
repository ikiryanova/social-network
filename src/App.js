import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { inicializeApp } from './redux/app-reduser';
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
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
  catchAllUnhedleErrors = (promiseRejectionEvent) => {
    alert('Some error occered');
  };

  componentDidMount() {
    this.props.inicializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhedleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhedleErrors);
  }

  render() {
    if (!this.props.inicialized) return <Preloader />;

    return (
      <div className="container">
        <div className="main">
          <HeaderContainer />
          <div className="wrapper">
            <Navbar />
            <div className="content">
              <Switch>
                <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                <Route exact path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                <Route exact path="/dialogs" render={withSuspense(DialogsContainer)} />
                <Route exact path="/users" render={withSuspense(UsersContainer)} />
                <Route exact path="/login" render={withSuspense(Login)} />

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


const mapStateToProps = (state) => ({
  inicialized: state.app.inicialized
})

export default compose (
  withRouter,
  connect(mapStateToProps, { inicializeApp }),
)(App);

