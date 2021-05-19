import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserData, logoutUser } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header, { MapPropsType, DispatchPropsType } from './Header';

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});


export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  getAuthUserData,
  logoutUser
})(HeaderContainer);