import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { questionService } from './questions.service';

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await questionService.getAllQuestions(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Questions fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAllQuestionsForAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);

    const result = await questionService.getAllQuestionsForAdmin(options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Questions fetched successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.createQuestion(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question created successfully!',
    data: result,
  });
});

const getQuestionByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await questionService.getQuestionByCategory(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Question fetched successfully',
      data: result,
    });
  }
);

const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await questionService.getQuestionById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question fetched successfully',
    data: result,
  });
});

const updateQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await questionService.updateQuestionById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question updated successfully',
    data: result,
  });
});

const deleteQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await questionService.deleteQuestionById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question deleted successfully',
    data: result,
  });
});

export const questionController = {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  getQuestionByCategory,
  updateQuestionById,
  deleteQuestionById,
  getAllQuestionsForAdmin,
};
