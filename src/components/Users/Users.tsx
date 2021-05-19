import React from 'react';

import { FilterType } from '../../redux/users-reducer';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User/User';
import { UsersSearchForm } from './UsersSearchForm';
import { UserType } from '../../types/types';

import './users.css';

type PropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onChangePage: (page: number) => void;
  onFilterChanged: (filter: FilterType) => void
  followingInProgress: Array<number>;
};

const Users: React.FC<PropsType> = ({
  users,
  pageSize,
  totalUsersCount,
  currentPage,
  isFetching,
  follow,
  unfollow,
  onChangePage,
  onFilterChanged,
  followingInProgress
}) => {
  return (
    <div>
      <h2 className="users__title">Users</h2>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
