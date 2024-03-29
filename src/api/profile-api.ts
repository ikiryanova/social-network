import { instance } from './api';
import { ProfileType, PhotosType } from './../types/types';
import { APIResponseType } from './api';

type SavePhotoResponseDataType = {
  photos: PhotosType
}
export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status/`, {
      status,
    }).then((response) => response.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile).then((response) => response.data);
  },
};
