import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profile-reduser';
import Profile from './Profile';


class ProfileContainer extends React.Component {

  refreshProfile() {
    const { match, authorizedUserId, history, getUserProfile, getStatus } = this.props;

    let userId = match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        history.push('/login');
      }
    }

    getUserProfile(userId);
    getStatus(userId);
  }
  
  componentDidMount() {
   this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }
  
  render() {
    return (
      <Profile
        savePhoto={this.props.savePhoto}
        saveProfile={saveProfile}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        isProfile={this.props.isProfile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        {...this.props}
      />
    );
  }
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isProfile: state.profilePage.isProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);