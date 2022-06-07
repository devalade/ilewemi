import { UserType } from './userType';

export interface Tokens {
  refresh_token: string;
  access_token: string;
}

export interface LoginResponse {
  user: UserType;
  tokens: Tokens;
}
