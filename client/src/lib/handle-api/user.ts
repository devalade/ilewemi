import { USER_ROLE } from '../types/userType';
import { axiosInstance } from './axiosInstance';

export function addUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: USER_ROLE;
}) {
  return axiosInstance.post('/api/user', payload).then((res) => res.data);
}

export function getAllUser(role: string) {
  return axiosInstance.get('/api/user?role=' + role).then((res) => res.data);
}

export function deleteUser(id: string) {
  return axiosInstance.delete('/api/user/' + id).then((res) => res.data);
}

export function me(id: string) {
  return axiosInstance.get('/api/user/' + id).then((res) => res.data);
}
