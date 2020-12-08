import React from 'react';
import Users from './Users';
import { connect } from "react-redux";
import { getUsers,  follow, unfollow } from '../../redux/users-reduser';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
  getUsersState,
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { getUsers, currentPage, pageSize } = this.props;
    getUsers(currentPage, pageSize);
  }

  onChangePage = (pageNumber) => {
    const { getUsers, pageSize } = this.props;
    getUsers(pageNumber, pageSize);
  };

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
        isFetching={isFetching}
        followingInProgress={followingInProgress}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersState(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    isAuth: state.auth.isAuth,
  };
};


export default compose(
  connect(mapStateToProps, { follow, unfollow, getUsers }),
  withAuthRedirect,
)(UsersContainer);