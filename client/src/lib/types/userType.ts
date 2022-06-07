export enum USER_ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PARENT = 'parent',
}

export interface UserType {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  phoneNumber: string;
  role: string;
  updatedAt: string;
}
