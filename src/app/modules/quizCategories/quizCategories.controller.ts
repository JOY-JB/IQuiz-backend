import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { quizCategoriesFilterableFields } from './quizCategories.constant';
import { quizCategoryService } from './quizCategories.service';

const getAllQuizCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, quizCategoriesFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await quizCategoryService.getAllQuizCategories(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz category fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const createQuizCategories = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;

  const result = await quizCategoryService.createQuizCategories({
    ...req.body,
    userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz Category created successfully!',
    data: result,
  });
});

const getQuizCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await quizCategoryService.getQuizCategoriesById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz Category fetched successfully',
    data: result,
  });
});

const updateQuizCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await quizCategoryService.updateQuizCategoriesById(
      id,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Quiz Category updated successfully',
      data: result,
    });
  }
);

const deleteQuizCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await quizCategoryService.deleteQuizCategoriesById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Quiz Category deleted successfully',
      data: result,
    });
  }
);

export const quizCategoryController = {
  getAllQuizCategories,
  createQuizCategories,
  getQuizCategoryById,
  updateQuizCategoryById,
  deleteQuizCategoryById,
};
