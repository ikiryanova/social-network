import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '0f9853d5-6fe6-4c72-a983-77e5a3964acc',
  },
});

export enum ResultCodeEmun {
  Success = 0,
  Error = 1,
};

export enum ResultCodeForCaptchaEmun {
  CaptchIsRequired = 10
};

export type APIResponseType<D = {}, RC = ResultCodeEmun> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}