import { axiosInstance } from './axiosInstance';
import { StudentType } from '../types/studentType';

export function getAllStudent() {
  return axiosInstance.get('/api/student').then((res) => res.data);
}

export function getOneStudent(id: string) {
  return axiosInstance.get('/api/student/' + id).then((res) => res.data);
}

export function addStudent(payload: Partial<StudentType>) {
  return axiosInstance.post('/api/student', payload).then((res) => res.data);
}

export function AddMark(payload: Partial<StudentType>) {
  return axiosInstance
    .post('/api/student/mark', payload)
    .then((res) => res.data);
}

export function deleteStudent(id: string) {
  return axiosInstance.delete('/api/student/' + id).then((res) => res.data);
}
