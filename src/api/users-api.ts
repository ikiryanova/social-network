import { instance, GetItemsType, APIResponseType } from './api';

export const usersAPI = {
  getUsers(currentPage:number = 1, pageSize:number = 10, term: string = '', friend: null | boolean = null) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data) as Promise<APIResponseType>;
  },
  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`).then((response) => response.data);
  },
  // getProfile(userId: number) {
  //   return profileAPI.getProfile(userId);
  // },
};
