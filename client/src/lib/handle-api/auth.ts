import { axiosInstance } from '.';

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
