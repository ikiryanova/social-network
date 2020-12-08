import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '0f9853d5-6fe6-4c72-a983-77e5a3964acc',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response.data);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  getProfile(userId) {
    return profileAPI.getProfile(userId);
  }
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {
      status
    });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile);
  }
};


export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, remeberMe = false, captcha = null) {
    return instance.post(`auth/login`, {
        email,
        password,
        remeberMe,
        captcha
      })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

