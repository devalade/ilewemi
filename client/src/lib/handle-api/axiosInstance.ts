import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getAccessToken } from '../tokens';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { Authorization: `Bearer ${getAccessToken()}` },
});

console.log(getAccessToken());
