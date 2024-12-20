import { Roles } from '@prisma/client';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Roles;
  created_at: Date;
}

export interface UserWithPassword {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Roles;
  created_at: Date;
  password: string;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export const selectUser = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
  role: true,
  created_at: true,
};

export const selectUserWithPassword = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
  role: true,
  created_at: true,
  password: true,
};
