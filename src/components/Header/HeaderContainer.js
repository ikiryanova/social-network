import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserData, logoutUser } from '../../redux/auth-reduser';
import Header from './Header';

class HeaderContainer extends React.Component {
  componentDidMount()  {
    this.props.getAuthUserData();
  }

  render() {
    return (
      <Header {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});


export default connect(mapStateToProps, { getAuthUserData, logoutUser })(HeaderContainer);