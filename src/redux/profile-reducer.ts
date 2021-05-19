import {FormAction, reset, stopSubmit} from 'redux-form';

import { BaseThunkType, InferActionsType } from './redux-store';
import { PhotosType, PostType, ProfileType } from "../types/types";
import { profileAPI } from "../api/profile-api";

let initialState = {
  posts: [
    { id: 1, post: '1 Hello world!!!' },
    { id: 2, post: '2 Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    {
      id: 3,
      post:
        '3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque tempore quaerat deleniti eius sed nulla deserunt veniam corrupti ullam odit facilis delectus aperiam error. Perspiciatis necessitatibus cum incidunt.',
    },
    {
      id: 4,
      post:
        '4 Lorem ipsum, dolor sit amet consectetur adipisicing elit. A odit neque expedita quos saepe magni? Quas voluptatum nisi autem voluptatem totam ad aspernatur quibusdam? Asperiores accusamus ea aut dolore, nostrum doloremque.',
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  isProfile: false as boolean,
  status: '' as string
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 5,
        post: action.newPostText,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_IS_PROFILE': {
      return {
        ...state,
        isProfile: action.isProfile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'DELETE_POST': 
      return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
    case 'SAVE_PHOTO_SUCCESS': 
    return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
    default:
      return state;
  }
};

export default profileReducer;

export const actions = {
  addNewPost: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE' , profile } as const),
  setIsProfile: (isProfile: boolean) => ({ type: 'SET_IS_PROFILE', isProfile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
  setPhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
}

type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  dispatch(actions.setIsProfile(false));
  let data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
  dispatch(actions.setIsProfile(true));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.setPhotoSuccess(data.data.photos))
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  
  if (data.resultCode === 0) {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  } else {
    dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export const addPost = (post: string): ThunkType => async(dispatch) => {
  dispatch(actions.addNewPost(post));
  dispatch(reset('profileAddPostForm'));
}