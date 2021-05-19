import { instance, APIResponseType, ResultCodeForCaptchaEmun, ResultCodeEmun } from './api';

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then((response) => response.data);
  },
  login(email: string, password: string, remeberMe = false, captcha: null | string = null) {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodeEmun | ResultCodeForCaptchaEmun>>(`auth/login`, {
        email,
        password,
        remeberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};
