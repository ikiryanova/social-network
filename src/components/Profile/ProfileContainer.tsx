import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { AppStateType } from '../../redux/redux-store';
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profile-reducer';
import Profile from './Profile';
import { ProfileType } from '../../types/types';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamType = {
  userId: string
};

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    const { match, authorizedUserId, history, getUserProfile, getStatus } = this.props;

    let userId: number | null = +match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        history.push('/login');
      }
    }

    getUserProfile(userId as number);
    getStatus(userId as number);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        isProfile={this.props.isProfile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
};

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  isProfile: state.profilePage.isProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);