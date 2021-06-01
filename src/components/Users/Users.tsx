import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as queryString from 'querystring';

import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter, getUsersState } from '../../redux/users-selectors';
import { FilterType, getUsers } from '../../redux/users-reducer';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User/User';
import { UsersSearchForm } from './UsersSearchForm';

import './users.css';

type QueryParamsType = {term?: string; page?: string; friend?: string};

export const Users: React.FC = () => {
  const users = useSelector(getUsersState);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  }
  const follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    let actualPage = currentPage;
    let actualFilter = filter;

    if (parsed.page) actualPage = Number(parsed.page);
    if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};
    if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false};

    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  return (
    <div>
      <h2 className="users__title">Users</h2>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
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
