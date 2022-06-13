import { SubjectType } from '../types/subjectType';
import { axiosInstance } from './axiosInstance';

export function getAllSubject() {
  return axiosInstance.get('/api/subject').then((res) => res.data);
}

export function addManySubject(payload: { subjects: SubjectType[] }) {
  return axiosInstance
    .post('/api/subject/many', payload)
    .then((res) => res.data);
}
