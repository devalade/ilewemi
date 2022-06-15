import { axiosInstance } from './axiosInstance';

export function getAllEventType() {
  return axiosInstance.get('/api/type-event').then((res) => res.data);
}

export function addEventType(payload: { label: string }) {
  return axiosInstance.post('/api/type-event', payload).then((res) => res.data);
}

export function deleteEventType(id) {
  return axiosInstance.delete('/api/type-event/' + id).then((res) => res.data);
}
