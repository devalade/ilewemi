import getParameterByName from '../utils';
import { axiosInstance } from './axiosInstance';

export function registerUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return axiosInstance
    .post('/auth/local/signup', payload)
    .then((res) => res.data);
}

export function loginUser(payload: { email: string; password: string }) {
  return axiosInstance
    .post('/auth/local/login', payload)
    .then((res) => res.data);
}

export function setPassword(payload: {
  password: string;
  confirmPassword: string;
}) {
  const token = getParameterByName('token');
  // const urlParams = new URLSearchParams(location.search);
  // const myParam = urlParams.get('token');

  return axiosInstance
    .post('/auth/set-password?token=' + token, payload)
    .then((res) => res.data);
}

export function verifyEmailToken(token: string) {
  return axiosInstance
    .get('/auth/verify-email-token?token=' + token)
    .then((res) => res.data);
}
