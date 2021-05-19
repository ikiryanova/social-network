import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';

import { AppStateType } from '../../redux/redux-store';
import { getUsers, follow, unfollow, FilterType } from '../../redux/users-reducer';
import {
  getUsersState,
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getUsersFilter,
} from '../../redux/users-selectors';
import Users from './Users';
import { UserType } from '../../types/types';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
  filter: FilterType
};

type MapDispatchPropsType = {
  getUsers: (curentPage: number, pageSize: number, filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropTypes = {

};

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { getUsers, currentPage, pageSize, filter } = this.props;
    getUsers(currentPage, pageSize, filter);
  }

  onChangePage = (pageNumber: number) => {
    const { getUsers, pageSize, filter } = this.props;
    getUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { getUsers, pageSize } = this.props;
    getUsers(1, pageSize, filter);
  }

  render() {
    const { totalUsersCount, pageSize, currentPage, users, follow, unfollow, isFetching, followingInProgress } = this.props;
    return (
      <Users
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        users={users}
        follow={follow}
        unfollow={unfollow}
        onChangePage={this.onChangePage}
        onFilterChanged={this.onFilterChanged}
        isFetching={isFetching}
        followingInProgress={followingInProgress}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersState(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};


export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropTypes, AppStateType>(mapStateToProps, { follow, unfollow, getUsers }),
  withAuthRedirect,
)(UsersContainer);