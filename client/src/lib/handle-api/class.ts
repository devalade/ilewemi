import { ClassType } from '../types/classType';
import { SubjectType } from '../types/subjectType';
import { axiosInstance } from './axiosInstance';

export function getAllClass() {
  return axiosInstance.get('/api/class').then((res) => res.data);
}

export function addClass(payload: {
  name: string;
  group: string;
  fee: number;
  subjects: ClassType[];
}) {
  return axiosInstance.post('/api/class', payload).then((res) => res.data);
}

export function deleteClass(id) {
  return axiosInstance.delete('/api/class/' + id).then((res) => res.data);
}
