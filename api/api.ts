import Axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const api = Axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response?.status === 401) {
      Router.push('/login');
    } else {
      return Promise.reject(error);
    }
  },
);

export const addBearerToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};
export const removeBearerToken = () => {
  delete api.defaults.headers.Authorization;
};

export default api;
