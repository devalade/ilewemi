import { AcademicYearType } from '../types/academicYearType';
import { axiosInstance } from './axiosInstance';

export function addAcademicYear(payload: { startDate: any; endDate: any }) {
  return axiosInstance
    .post('/api/academic-year', payload)
    .then((res) => res.data);
}

export function getAllAcademicYear() {
  return axiosInstance.get('/api/academic-year').then((res) => res.data);
}

export function deleteOneAcademicYear(id) {
  return axiosInstance
    .delete('/api/academic-year/' + id)
    .then((res) => res.data);
}
