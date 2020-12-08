import { profileAPI, usersAPI } from "../api/api";
import {reset, stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_IS_PROFILE = 'SET_IS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let inicialState = {
  posts: [
    { id: '1', post: '1 Hello world!!!' },
    { id: '2', post: '2 Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    {
      id: '3',
      post:
        '3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque tempore quaerat deleniti eius sed nulla deserunt veniam corrupti ullam odit facilis delectus aperiam error. Perspiciatis necessitatibus cum incidunt.',
    },
    {
      id: '4',
      post:
        '4 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque.',
    },
  ],
  profile: null,
  isProfile: false,
  status: ''
};

const profileReduser = (state = inicialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        post: action.newPostText,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_IS_PROFILE: {
      return {
        ...state,
        isProfile: action.isProfile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: 
      return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
    case SAVE_PHOTO_SUCCESS: 
    return {...state, profile: {...state.profile, photos: action.photos}}
    default:
      return state;
  }
};

export default profileReduser;

export const addNewPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE , profile });
export const setIsProfile = (isProfile) => ({ type: SET_IS_PROFILE, isProfile });
export const setStatus = (status) => ({type: SET_STATUS,  status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setPhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch(setIsProfile(false));
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
  dispatch(setIsProfile(true));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(setPhotoSuccess(response.data.data.photos))
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export const addPost = (post) => (dispatch) => {
  dispatch(addNewPost(post));
  dispatch(reset('profileAddPostForm'));
}