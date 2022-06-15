import { axiosInstance } from './axiosInstance';

export function addSchoolFees(payload: { fee: number }) {
  return axiosInstance
    .post('/api/school-fees', payload)
    .then((res) => res.data);
}

export function getAllSchoolFees() {
  return axiosInstance.get('/api/school-fees').then((res) => res.data);
}
