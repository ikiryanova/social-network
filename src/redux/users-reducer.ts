import { UserType } from '../types/types';
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { InferActionsType, BaseThunkType } from './redux-store';
import { Dispatch } from 'react';
import { APIResponseType } from '../api/api';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
};

export type InitialStateType = typeof initialState;

export const usersReduсer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
      };
    }
    case 'UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    }
    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'SET_TOTAL_COUNT': {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.payload.filter };
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export default usersReduсer;

export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: { filter } } as const),
  setTotalCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_COUNT',
    totalUsersCount,
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching,
  } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId,
  } as const)
};

type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
export type FilterType = typeof initialState.filter;

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setFilter(filter));

  const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalCount(data.totalCount));
};

const _followUnfollow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  await _followUnfollow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess);
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  await _followUnfollow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess);
};