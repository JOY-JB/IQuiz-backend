import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createPerformer = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPerformer(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully.',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully.',
    data: result,
  });
});

const getAllPerformer = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await userService.getAllPerformer(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Performer fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await userService.getAllAdmin(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const userController = {
  createPerformer,
  createAdmin,
  getAllPerformer,
  getAllAdmin,
};
