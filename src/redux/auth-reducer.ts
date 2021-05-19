import { FormAction, stopSubmit } from "redux-form";

import { BaseThunkType, InferActionsType } from "./redux-store";
import { authAPI } from "../api/auth-api";
import { ResultCodeEmun } from "../api/api";
import { ResultCodeForCaptchaEmun } from '../api/api';
import { securityAPI } from '../api/security-api';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  loginStatus: false as boolean,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, ...action.payload };
    case 'GET_CAPTCHA_URL_SUCCESS': 
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default authReducer;

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: { userId, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl },
  } as const),
};

type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodeEmun.Success) {
    const { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodeEmun.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptchaEmun.CaptchIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('login',{ _error:  message}));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logoutUser = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

 