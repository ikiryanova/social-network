import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'; 
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let inicialState = {
  users: [
    // {
    //   id: '1',
    //   fullName: 'Irina',
    //   avatar: 'https://vk.vkfaces.com/855416/v855416314/fdbdd/Qrw_cK_qPf8.jpg',
    //   followed: true,
    //   status: 'I like React!',
    //   location: { country: 'Russia', city: 'Moscow' },
    // },
    // {
    //   id: '2',
    //   fullName: 'Vadim',
    //   avatar: 'https://pbs.twimg.com/profile_images/430448527454793728/gih1pMg5.jpeg',
    //   followed: false,
    //   status: 'I like football!',
    //   location: { country: 'Russia', city: 'Rostov' },
    // },
    // {
    //   id: '3',
    //   fullName: 'Andrew',
    //   avatar: 'https://i.pinimg.com/736x/5a/3f/4f/5a3f4f6d1be3b1c4e3659e350a1a4a7b.jpg',
    //   followed: false,
    //   status: 'I am prommer',
    //   location: { country: 'Russia', city: 'Moscow' },
    // },
    // {
    //   id: '4',
    //   fullName: 'Alina',
    //   avatar: 'https://vraki.net/sites/default/files/inline/images/1551511784_4.jpg',
    //   followed: true,
    //   status: 'I am disigner',
    //   location: { country: 'Russia', city: 'Kazan' },
    // },
  ],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

const usersReduser = (state = inicialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_COUNT: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

export default usersReduser;

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalCount(data.totalCount));
};

export const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId));
};

export const unfollow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess);
}

export const follow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
};