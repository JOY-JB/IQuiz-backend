import { UserRole } from '@prisma/client';

export type IUserResponse = {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  accessToken?: string;
};

export type IUpdateUserProfile = {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
};

export type IUserFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
};

export const userSearchableFields: string[] = ['name', 'role'];

export const userFilterableFields: string[] = ['name', 'email'];
