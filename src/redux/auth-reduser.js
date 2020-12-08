import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const CHANGE_FOLLOW = 'CHANGE_FOLLOW';
const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let inicialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  loginStatus: false,
  captchaUrl: null
};

const authReduser = (state = inicialState, action) => {
  switch (action.type) {
    case CHANGE_FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    }
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case GET_CAPTCHA_URL_SUCCESS: 
      return { ...state, captchaUrl: action.payload };
    default:
      return state;
  }
};

export default authReduser;

export const changeFollowUser = (userId) => ({ type: CHANGE_FOLLOW, userId });
export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl });


export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const loginUser = (email, password, remeberMe, captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, remeberMe, captcha)
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('login',{ _error:  message}));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logoutUser = () => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

 