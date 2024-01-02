import { User, UserRole } from '@prisma/client';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { utils } from '../../../shared/utils';
import { IUserResponse } from './user.interface';

const createPerformer = async (data: User) => {
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another mail'
    );
  }

  data.role = 'PERFORMER';
  data.password = await utils.hashedPassword(data.password);

  const result = prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const accessToken = jwtHelpers.createToken(
    { userId: (await result).id, role: 'PERFORMER' },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const createAdmin = async (data: User): Promise<IUserResponse> => {
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This Email is Already Registered! Please choose another mail'
    );
  }

  data.role = 'ADMIN';
  data.password = await utils.hashedPassword(data.password);

  const result = prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return result;
};

const getAllPerformer = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<User>[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: {
      role: UserRole.PERFORMER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      quizzes: true,
      quizAttempts: true,
    },
  });

  const total = await prisma.user.count({
    where: {
      role: UserRole.PERFORMER,
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllAdmin = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<User>[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: {
      role: UserRole.ADMIN,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const total = await prisma.user.count({
    where: {
      role: UserRole.ADMIN,
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getAllUsers = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<User>[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const total = await prisma.user.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const userService = {
  createPerformer,
  createAdmin,
  getAllPerformer,
  getAllAdmin,
  getAllUsers,
};
