import axios from 'axios';
import Router from 'next/router';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  function (error) {
    if (401 === error.response.status) {
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
