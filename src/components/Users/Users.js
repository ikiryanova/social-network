import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import './users.css';

const Users = ({
  users,
  pageSize,
  totalUsersCount,
  currentPage,
  isFetching,
  follow,
  unfollow,
  onChangePage,
  followingInProgress,
}) => {
  return (
    <div>
      <h2 className="users__title">Users</h2>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onChangePage={onChangePage}
      />
      {isFetching ? (
        <Preloader />
      ) : (
        users.map((user) => (
          <User
            user={user}
            key={user.id}
            follow={follow}
            unfollow={unfollow}
            followingInProgress={followingInProgress}
          />
        ))
      )}
    </div>
  );
};

export default Users;